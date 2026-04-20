'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import type { BlogPost } from '@/lib/blogs';
import { ResponsiveBlogImage } from '@/components/blog/ResponsiveBlogImage';

type BlogSidebarProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

export function BlogSidebar({ post, relatedPosts }: BlogSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-24 h-fit space-y-5">
      <div className="bg-white rounded-2xl border border-border p-5">
        <h3 className="text-lg font-bold text-[#0A1628] mb-4">More Articles</h3>
        <div className="space-y-4">
          {relatedPosts.map((related) => (
            <Link key={related.slug} href={`/blog/${related.slug}`} className="group flex gap-3">
              <div className="relative h-12 w-16 rounded-md overflow-hidden shrink-0">
                <ResponsiveBlogImage
                  src={related.image}
                  alt={related.title}
                  mode="cover"
                  sizes="64px"
                  className="transition-transform group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{related.date}</p>
                <p className="text-sm font-semibold text-[#0A1628] line-clamp-2 group-hover:text-[#FF5C00] transition-colors">
                  {related.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[#FF5C00] p-5 text-white">
        <BookOpen className="w-5 h-5 opacity-90" />
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/70">
          Explore all posts
        </p>
        <h4 className="mt-2 text-xl font-bold">Browse Full Blog Library</h4>
        <div className="mt-5 flex items-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center h-9 px-4 rounded-full border border-white text-sm font-semibold hover:bg-white hover:text-[#FF5C00] transition-colors"
          >
            View All
          </Link>
          <Link
            href="/blog"
            className="text-sm font-semibold inline-flex items-center gap-1 hover:underline"
          >
            Open Library
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
