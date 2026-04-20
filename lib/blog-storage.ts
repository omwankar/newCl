import fs from 'node:fs';
import path from 'node:path';
import type { BlogPost } from './blogs';

const BLOG_DATA_PATH = path.join(process.cwd(), 'lib', 'blog-data.json');

function ensureBlogDataFile() {
  const dir = path.dirname(BLOG_DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(BLOG_DATA_PATH)) {
    fs.writeFileSync(BLOG_DATA_PATH, '[]\n', 'utf8');
  }
}

export function readBlogData(): BlogPost[] {
  try {
    ensureBlogDataFile();
    const raw = fs.readFileSync(BLOG_DATA_PATH, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

export function writeBlogDataSafely(blogs: BlogPost[]) {
  ensureBlogDataFile();
  const tempPath = `${BLOG_DATA_PATH}.tmp`;
  const payload = `${JSON.stringify(blogs, null, 2)}\n`;
  fs.writeFileSync(tempPath, payload, 'utf8');
  fs.renameSync(tempPath, BLOG_DATA_PATH);
}

export function getBlogDataPath() {
  return BLOG_DATA_PATH;
}
