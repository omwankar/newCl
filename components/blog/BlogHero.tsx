import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock3, User } from 'lucide-react';
import type { BlogPost } from '@/lib/blogs';

type BlogHeroProps = {
  post: BlogPost;
};

export function BlogHero({ post }: BlogHeroProps) {
  return (
    <section className="bg-[#0A1628] text-white pt-10 md:pt-14">
      <div className="app-container max-w-6xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>

        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-[#FF5C00]/20 border border-[#FF5C00]/40 px-3 py-1 text-xs font-semibold text-[#FFB286]">
            {post.category}
          </span>

          <h1 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-balance">
            {post.title}
          </h1>

          <p className="mt-5 text-lg text-white/80 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/75">
            <div className="inline-flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Clock3 className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="app-container max-w-6xl mt-10 -mb-20 md:-mb-24 relative z-10">
        <div className="relative h-[420px] md:h-[500px] rounded-t-2xl overflow-hidden border border-white/10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
