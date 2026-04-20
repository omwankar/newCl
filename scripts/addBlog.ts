import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { addBlogFromPDF, generateBlogPost } from '../lib/blog-generator';
import type { BlogPost } from '../lib/blogs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOGS_FILE = path.resolve(__dirname, '../lib/blogs.ts');

type CliArgs = {
  title?: string;
  content?: string;
  category?: string;
  image?: string;
  pdf?: string;
};

function parseArgs(argv: string[]): CliArgs {
  const parsed: CliArgs = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === '--title') parsed.title = next;
    if (arg === '--content') parsed.content = next;
    if (arg === '--category') parsed.category = next;
    if (arg === '--image') parsed.image = next;
    if (arg === '--pdf') parsed.pdf = next;
  }
  return parsed;
}

function getNextNumericId(source: string): string {
  const idMatches = [...source.matchAll(/id:\s*'(\d+)'/g)];
  const max = idMatches.reduce((acc, match) => {
    const n = Number(match[1]);
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);
  return String(max + 1);
}

function escapeSingle(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function formatBlogObject(post: BlogPost): string {
  const lines: string[] = [];
  lines.push('  {');
  lines.push(`    id: '${escapeSingle(post.id)}',`);
  lines.push(`    slug: '${escapeSingle(post.slug)}',`);
  lines.push(`    title: '${escapeSingle(post.title)}',`);
  lines.push(`    excerpt: '${escapeSingle(post.excerpt)}',`);
  lines.push('    content: [');
  for (const entry of post.content) {
    lines.push(`      '${escapeSingle(entry)}',`);
  }
  lines.push('    ],');
  lines.push(`    date: '${escapeSingle(post.date)}',`);
  lines.push(`    readTime: '${escapeSingle(post.readTime)}',`);
  lines.push(`    category: '${escapeSingle(post.category)}',`);
  lines.push(`    image: '${escapeSingle(post.image)}',`);
  lines.push('    author: {');
  lines.push(`      name: '${escapeSingle(post.author.name)}',`);
  lines.push(`      avatar: '${escapeSingle(post.author.avatar)}',`);
  lines.push('    },');
  lines.push(
    `    tags: [${post.tags.map((tag) => `'${escapeSingle(tag)}'`).join(', ')}],`
  );
  lines.push('  },');
  return lines.join('\n');
}

function appendPostToBlogsFile(source: string, post: BlogPost): string {
  const marker = 'export const BLOG_POSTS: BlogPost[] = [';
  const markerIdx = source.indexOf(marker);
  if (markerIdx < 0) throw new Error('BLOG_POSTS array not found.');

  const arrayStart = source.indexOf('[', markerIdx);
  const closingIdx = source.indexOf('\n];', arrayStart);
  if (arrayStart < 0 || closingIdx < 0) {
    throw new Error('Could not determine BLOG_POSTS array boundaries.');
  }

  const beforeClose = source.slice(0, closingIdx);
  const tail = source.slice(closingIdx);
  const separator = beforeClose.trimEnd().endsWith('[') ? '\n' : '\n\n';
  return `${beforeClose}${separator}${formatBlogObject(post)}${tail}`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const generated = args.pdf
    ? await addBlogFromPDF(path.resolve(process.cwd(), args.pdf))
    : generateBlogPost({
        title: args.title ?? 'New Blog from Automation Script',
        content:
          args.content ??
          'INTRODUCTION:\nThis blog post was generated with the addBlog script.\n\nHow automation helps:\nAutomating blog generation removes repetitive editing work and keeps formatting consistent across all articles.\n\nConclusion:\nYou can now add blogs from raw text or PDF exports in one command.',
        category: args.category,
        image: args.image,
      });

  const source = await readFile(BLOGS_FILE, 'utf8');
  const nextId = getNextNumericId(source);
  const post: BlogPost = { ...generated, id: nextId };
  const updated = appendPostToBlogsFile(source, post);
  await writeFile(BLOGS_FILE, updated, 'utf8');

  console.log(`Added blog "${post.title}" with id ${post.id} and slug "${post.slug}".`);
}

void main().catch((error: unknown) => {
  console.error('Failed to add blog:', error);
  process.exitCode = 1;
});
