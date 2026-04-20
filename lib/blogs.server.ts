import 'server-only';
import type { BlogPost } from './blogs';
import { BLOG_POSTS } from './blogs';
import { readBlogData } from './blog-storage';

function getPostTimestamp(date: string): number {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getAllBlogs(): BlogPost[] {
  const uploaded = readBlogData();
  if (uploaded.length === 0) return BLOG_POSTS;

  const bySlug = new Map<string, BlogPost>();
  for (const post of BLOG_POSTS) {
    bySlug.set(post.slug, post);
  }
  for (const post of uploaded) {
    if (!post?.slug) continue;
    bySlug.set(post.slug, post);
  }
  return Array.from(bySlug.values());
}

export function getBlogBySlug(slug: string) {
  return getAllBlogs().find((post) => post.slug === slug);
}

export function getBlogsNewestFirst() {
  return [...getAllBlogs()].sort(
    (a, b) => getPostTimestamp(b.date) - getPostTimestamp(a.date)
  );
}
