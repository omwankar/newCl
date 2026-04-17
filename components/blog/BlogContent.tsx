'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buildBlogSections, getPullQuote } from './blog-utils';
import { BlogAuthorCard } from './BlogAuthorCard';
import type { BlogPost } from '@/lib/blogs';

type BlogContentProps = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

export function BlogContent({ post, relatedPosts }: BlogContentProps) {
  const sections = useMemo(() => buildBlogSections(post.content), [post.content]);
  const pullQuote = useMemo(() => getPullQuote(post.content), [post.content]);

  const isSubheading = (paragraph: string) => {
    const text = paragraph.trim();
    if (text.length === 0 || text.length > 90) return false;
    if (text.startsWith('Source:') || text.startsWith('http')) return false;
    if (/^\d+\.\s/.test(text)) return false;
    if (/^[A-Za-z0-9&(),:\/\-\s?]+$/.test(text) && !text.endsWith('.')) return true;
    return false;
  };

  return (
    <div>
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={section.id} id={section.id} className="scroll-mt-28">
            {sectionIndex % 2 === 0 && (
              <p className="mb-3 text-xs uppercase tracking-[0.16em] font-semibold text-[#FF5C00]">
                {section.label}
              </p>
            )}

            <div className="bg-white rounded-2xl border border-border p-8 space-y-5">
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                isSubheading(paragraph) ? (
                  <h3
                    key={`${section.id}-${paragraphIndex}`}
                    className="text-xl md:text-2xl font-bold text-[#0A1628] pt-1 border-l-4 border-[#FF5C00] pl-4"
                  >
                    {paragraph}
                  </h3>
                ) : (
                  <p
                    key={`${section.id}-${paragraphIndex}`}
                    className={
                      paragraphIndex === 0
                        ? 'text-lg text-foreground leading-loose'
                        : 'text-base md:text-lg text-foreground/90 leading-loose'
                    }
                  >
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            {sectionIndex === 1 && (
              <blockquote className="mt-6 border-l-4 border-[#FF5C00] bg-[#FFF2EA] rounded-r-xl p-6 italic text-foreground/90 text-lg leading-relaxed">
                "{pullQuote}"
              </blockquote>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white rounded-2xl border border-border p-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="h-10 px-4 rounded-full border border-border text-sm font-semibold hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors"
        >
          Share
        </button>
        <button
          type="button"
          className="h-10 px-4 rounded-full border border-border text-sm font-semibold hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors"
        >
          Save to Reading List
        </button>
        <button
          type="button"
          className="h-10 px-4 rounded-full border border-border text-sm font-semibold hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors"
        >
          Copy Link
        </button>
      </div>

      <div className="mt-6">
        <BlogAuthorCard post={post} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className="rounded-full bg-white border border-border px-3 py-1 text-xs font-semibold text-[#0A1628] hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <h2 className="text-2xl font-bold text-[#0A1628]">You might also like</h2>

        <div className="mt-6 grid gap-4">
          {relatedPosts.slice(0, 2).map((related) => (
            <article
              key={related.slug}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <Link
                href={`/blog/${related.slug}`}
                className="grid sm:grid-cols-[9rem_1fr] items-stretch"
              >
                <div className="relative h-36 sm:h-full sm:w-36">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">{related.date}</p>
                  <h3 className="mt-1 font-semibold text-[#0A1628] line-clamp-2">
                    {related.title}
                  </h3>
                  <span className="mt-2 inline-flex rounded-full bg-[#FF5C00]/15 text-[#FF5C00] px-2.5 py-1 text-[11px] font-semibold">
                    {related.category}
                  </span>
                  <p className="mt-3 text-sm font-semibold text-[#FF5C00]">
                    Read article →
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
