import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { generateBlogPost } from '../lib/blog-generator';
import type { BlogPost } from '../lib/blogs';

const BLOG_DATA_JSON = path.resolve(process.cwd(), 'lib/blog-data.json');

type CliArgs = {
  file?: string;
  category?: string;
  image?: string;
  title?: string;
};

function parseArgs(argv: string[]): CliArgs {
  const parsed: CliArgs = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === '--file') parsed.file = next;
    if (arg === '--category') parsed.category = next;
    if (arg === '--image') parsed.image = next;
    if (arg === '--title') parsed.title = next;
  }
  return parsed;
}

function inferTitle(content: string, fallback: string): string {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const markdownHeading = lines.find((line) => /^#\s+/.test(line));
  if (markdownHeading) return markdownHeading.replace(/^#\s+/, '').trim();

  if (lines[0]) return lines[0].replace(/^#+\s*/, '').trim();
  return fallback;
}

function cleanContent(content: string): string {
  return content
    .replace(/^#\s+.*$/m, '')
    .replace(/\r\n/g, '\n')
    .trim();
}

async function readExistingBlogs(): Promise<BlogPost[]> {
  try {
    const raw = await readFile(BLOG_DATA_JSON, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.file) {
    throw new Error('Missing --file argument. Example: --file ./notes/new-blog.md');
  }

  const resolvedPath = path.resolve(process.cwd(), args.file);
  const ext = path.extname(resolvedPath).toLowerCase();
  if (ext !== '.txt' && ext !== '.md') {
    throw new Error('Unsupported file type. Only .txt and .md are allowed.');
  }

  const rawContent = await readFile(resolvedPath, 'utf8');
  const title = args.title ?? inferTitle(rawContent, path.basename(resolvedPath, ext));
  const content = cleanContent(rawContent);

  const post = generateBlogPost({
    title,
    content,
    category: args.category,
    image: args.image,
  });

  const existing = await readExistingBlogs();
  existing.push(post);
  await writeFile(BLOG_DATA_JSON, `${JSON.stringify(existing, null, 2)}\n`, 'utf8');

  console.log(
    `Added blog to blog-data.json: "${post.title}" (${post.slug}) from ${path.basename(
      resolvedPath
    )}`
  );
}

void main().catch((error: unknown) => {
  console.error('Failed to add blog from file:', error);
  process.exitCode = 1;
});
