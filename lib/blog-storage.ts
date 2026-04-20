import fs from 'node:fs';
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { list, put } from '@vercel/blob';
import type { BlogPost } from './blogs';

const BLOG_DATA_PATH = path.join(process.cwd(), 'lib', 'blog-data.json');
const BLOB_FILENAME = 'blog-data.json';
const BLOB_PREFIX = 'blog-data/';

function shouldUseBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function isVercelRuntime() {
  return process.env.VERCEL === '1';
}

function ensureBlogDataFile() {
  const dir = path.dirname(BLOG_DATA_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(BLOG_DATA_PATH)) {
    fs.writeFileSync(BLOG_DATA_PATH, '[]\n', 'utf8');
  }
}

async function readFromBlobStorage(): Promise<BlogPost[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 10 });
    if (blobs.length === 0) return [];
    const latest = [...blobs].sort(
      (a, b) => +new Date(b.uploadedAt) - +new Date(a.uploadedAt)
    )[0];
    if (!latest?.url) return [];
    const response = await fetch(latest.url, { cache: 'no-store' });
    if (!response.ok) return [];
    const parsed = (await response.json()) as unknown;
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

export async function readBlogData(): Promise<BlogPost[]> {
  if (shouldUseBlobStorage()) {
    return readFromBlobStorage();
  }
  try {
    ensureBlogDataFile();
    const raw = await readFile(BLOG_DATA_PATH, 'utf8');
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as BlogPost[]) : [];
  } catch {
    return [];
  }
}

async function writeToBlobStorage(blogs: BlogPost[]) {
  const payload = JSON.stringify(blogs, null, 2);
  await put(`${BLOB_PREFIX}${Date.now()}-${BLOB_FILENAME}`, payload, {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  });
}

export async function writeBlogDataSafely(blogs: BlogPost[]) {
  if (shouldUseBlobStorage()) {
    await writeToBlobStorage(blogs);
    return;
  }
  if (isVercelRuntime()) {
    throw new Error(
      'Missing BLOB_READ_WRITE_TOKEN in Vercel environment. Blog writes require Vercel Blob in production.'
    );
  }
  ensureBlogDataFile();
  const tempPath = `${BLOG_DATA_PATH}.tmp`;
  const payload = `${JSON.stringify(blogs, null, 2)}\n`;
  await mkdir(path.dirname(BLOG_DATA_PATH), { recursive: true });
  await writeFile(tempPath, payload, 'utf8');
  await rename(tempPath, BLOG_DATA_PATH);
}

export function getBlogDataPath() {
  return BLOG_DATA_PATH;
}
