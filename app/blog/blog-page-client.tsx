'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUp,
  Search,
  TrendingUp,
  Package,
  Plane,
  Ship,
  Link2,
  Newspaper,
  Lightbulb,
  Leaf,
  Globe,
} from 'lucide-react';
import { BLOG_POSTS, getBlogsNewestFirst } from '@/lib/blogs';

type BlogPageClientProps = {
  displayFontClass: string;
  bodyFontClass: string;
};

const CATEGORY_ITEMS = [
  { label: 'All Posts', icon: Globe, emoji: '🌍' },
  { label: 'Freight & Shipping', icon: TrendingUp, emoji: '🚚' },
  { label: 'Warehousing', icon: Package, emoji: '📦' },
  { label: 'Air Cargo', icon: Plane, emoji: '✈️' },
  { label: 'Ocean Freight', icon: Ship, emoji: '🚢' },
  { label: 'Supply Chain', icon: Link2, emoji: '🔗' },
  { label: 'Industry News', icon: Newspaper, emoji: '📊' },
  { label: 'Tips & Guides', icon: Lightbulb, emoji: '💡' },
  { label: 'Sustainability', icon: Leaf, emoji: '🌱' },
  { label: 'Supply Chain & Logistics Insights', icon: Newspaper, emoji: '📦' },
] as const;

const categoryColors: Record<string, string> = {
  'Freight & Shipping': 'bg-orange-100 text-orange-700',
  Warehousing: 'bg-blue-100 text-blue-700',
  'Air Cargo': 'bg-violet-100 text-violet-700',
  'Ocean Freight': 'bg-cyan-100 text-cyan-700',
  'Supply Chain': 'bg-indigo-100 text-indigo-700',
  'Industry News': 'bg-emerald-100 text-emerald-700',
  'Tips & Guides': 'bg-amber-100 text-amber-700',
  Sustainability: 'bg-green-100 text-green-700',
  'Supply Chain & Logistics Insights': 'bg-slate-100 text-slate-700',
};

const heroTitleWords = 'Insights That Move Your Business Forward'.split(' ');
const PAGE_SIZE = 6;

export function BlogPageClient({
  displayFontClass,
  bodyFontClass,
}: BlogPageClientProps) {
  const sortedPosts = useMemo(() => getBlogsNewestFirst(), []);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('All Posts');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, activeTag, query]);

  useEffect(() => {
    setFeaturedIndex(0);
  }, [activeCategory, activeTag, query]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of sortedPosts) {
      for (const tag of post.tags) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return counts;
  }, [sortedPosts]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return sortedPosts.filter((post) => {
      const categoryMatch =
        activeCategory === 'All Posts' || post.category === activeCategory;
      const tagMatch = !activeTag || post.tags.includes(activeTag);
      const searchMatch =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.tags.join(' ').toLowerCase().includes(normalizedQuery) ||
        post.category.toLowerCase().includes(normalizedQuery);

      return categoryMatch && tagMatch && searchMatch;
    });
  }, [activeCategory, activeTag, query, sortedPosts]);

  const featuredCandidates = useMemo(() => {
    const candidates = filteredPosts.length > 0 ? filteredPosts : sortedPosts;
    const featured = candidates.find((post) => post.featured);
    if (!featured) return candidates;
    return [featured, ...candidates.filter((post) => post.id !== featured.id)];
  }, [filteredPosts, sortedPosts]);

  useEffect(() => {
    if (featuredCandidates.length <= 1) return;
    const interval = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredCandidates.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [featuredCandidates]);

  const featuredPost =
    featuredCandidates[featuredIndex % Math.max(featuredCandidates.length, 1)];

  const remainingPosts = useMemo(
    () =>
      filteredPosts.filter((post) =>
        featuredPost ? post.id !== featuredPost.id : true
      ),
    [featuredPost, filteredPosts]
  );

  const visiblePosts = remainingPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < remainingPosts.length;
  const popularPosts = sortedPosts.slice(0, 4);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Posts': sortedPosts.length };
    for (const category of CATEGORY_ITEMS) {
      if (category.label === 'All Posts') continue;
      counts[category.label] = sortedPosts.filter(
        (post) => post.category === category.label
      ).length;
    }
    return counts;
  }, [sortedPosts]);

  const resetFilters = () => {
    setActiveCategory('All Posts');
    setActiveTag(null);
    setQuery('');
  };

  return (
    <main
      className={`min-h-screen bg-[#F5F5F0] text-[#1A1A2E] ${bodyFontClass}`}
      id="blog-search"
    >
      <section className="bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <p className="uppercase tracking-[0.18em] text-xs text-orange-300 font-semibold">
            Freight Intelligence Journal
          </p>
          <h1
            className={`${displayFontClass} mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight`}
          >
            {heroTitleWords.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="mt-6 text-base sm:text-lg text-white/80 max-w-3xl">
            Expert insights on freight forwarding, warehousing, air cargo, ocean
            shipping, and supply chain optimization.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]">
            <label className="relative block">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/55"
                size={18}
                aria-hidden="true"
              />
              <input
                aria-label="Search blog posts"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles, categories, or tags..."
                className="h-12 w-full rounded-full border border-white/20 bg-white/10 pl-11 pr-4 text-sm placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]"
              />
            </label>
            <button
              type="button"
              onClick={resetFilters}
              className="h-12 rounded-full border border-white/20 px-6 text-sm font-semibold hover:border-[#FF5C00] hover:text-[#FF5C00] transition-colors"
              aria-label="Reset all filters"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-y border-slate-200 bg-[#F5F5F0]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATEGORY_ITEMS.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.label;
              return (
                <button
                  key={category.label}
                  type="button"
                  onClick={() => setActiveCategory(category.label)}
                  className={`relative h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#0A1628]'
                      : 'text-slate-600 hover:text-[#0A1628]'
                  }`}
                  aria-label={`Filter by ${category.label}`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-category-pill"
                      className="absolute inset-0 rounded-full bg-[#FF5C00]/20"
                      transition={{
                        type: 'spring',
                        stiffness: 320,
                        damping: 28,
                      }}
                    />
                  )}
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <span aria-hidden="true">{category.emoji}</span>
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block overflow-hidden rounded-3xl ring-1 ring-slate-200"
            aria-label={`Read featured post: ${featuredPost.title}`}
          >
            <div className="relative h-[380px] sm:h-[480px] overflow-hidden">
              <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }}>
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    categoryColors[featuredPost.category] ??
                    'bg-orange-100 text-orange-700'
                  }`}
                >
                  {featuredPost.category}
                </span>
                <h2
                  className={`${displayFontClass} mt-4 text-3xl sm:text-4xl md:text-5xl text-white leading-[0.95] max-w-4xl`}
                >
                  {featuredPost.title}
                </h2>
                <p className="mt-3 text-white/80 max-w-2xl line-clamp-2">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-3 text-sm text-white/75">
                  <Image
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    width={36}
                    height={36}
                    className="rounded-full ring-2 ring-white/20"
                  />
                  <span>{featuredPost.author.name}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-10">
          <section aria-label="Blog posts" className="space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden"
                  >
                    <div className="h-44 bg-slate-200/70 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 w-20 bg-slate-200/70 rounded animate-pulse" />
                      <div className="h-5 w-full bg-slate-200/70 rounded animate-pulse" />
                      <div className="h-5 w-5/6 bg-slate-200/70 rounded animate-pulse" />
                      <div className="h-4 w-full bg-slate-200/70 rounded animate-pulse" />
                      <div className="h-4 w-3/4 bg-slate-200/70 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {visiblePosts.length === 0 ? (
                  <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-slate-200">
                    <p className="text-lg font-semibold">No posts found</p>
                    <p className="text-sm text-slate-500 mt-2">
                      Try a different category, tag, or search term.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {visiblePosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 22 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, delay: index * 0.1 }}
                        whileHover={{
                          y: -6,
                          boxShadow:
                            '0 20px 40px rgba(10, 22, 40, 0.12), 0 6px 16px rgba(10, 22, 40, 0.08)',
                        }}
                        className="group rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden flex flex-col"
                      >
                        <Link href={`/blog/${post.slug}`} className="block relative h-44">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </Link>

                        <div className="p-5 flex flex-col gap-3 h-full">
                          <span
                            className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                              categoryColors[post.category] ??
                              'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {post.category}
                          </span>

                          <h3 className="text-lg font-bold leading-tight line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-sm text-slate-600 line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center gap-3 mt-1">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              width={28}
                              height={28}
                              className="rounded-full"
                            />
                            <div className="text-xs text-slate-500">
                              <p className="font-semibold text-slate-700">
                                {post.author.name}
                              </p>
                              <p>
                                {post.date} • {post.readTime}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => setActiveTag(tag)}
                                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                                  activeTag === tag
                                    ? 'bg-[#FF5C00] text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                                aria-label={`Filter by tag ${tag}`}
                              >
                                {tag}
                              </button>
                            ))}
                          </div>

                          <div className="mt-auto pt-2">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5C00]"
                            >
                              Read More
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}

                {hasMorePosts && (
                  <div className="pt-6 text-center">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-[#0A1628] px-6 text-sm font-semibold text-[#0A1628] hover:bg-[#0A1628] hover:text-white transition-colors"
                      aria-label="Load more posts"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          <aside className="space-y-6" aria-label="Blog sidebar">
            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <h3 className="font-bold text-lg mb-3">Search</h3>
              <label className="relative block">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  aria-label="Sidebar search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-11 w-full rounded-full border border-slate-200 bg-white pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#FF5C00]"
                  placeholder="Search here..."
                />
              </label>
            </div>

            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <h3 className="font-bold text-lg mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={70}
                      height={56}
                      className="rounded-md object-cover h-14 w-[70px]"
                    />
                    <div>
                      <p className="text-sm font-semibold line-clamp-2 group-hover:text-[#FF5C00] transition-colors">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{post.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {CATEGORY_ITEMS.map((category) => (
                  <button
                    key={category.label}
                    type="button"
                    onClick={() => setActiveCategory(category.label)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeCategory === category.label
                        ? 'bg-orange-50 text-[#FF5C00]'
                        : 'hover:bg-slate-50'
                    }`}
                    aria-label={`Switch to ${category.label}`}
                  >
                    <span>{category.label}</span>
                    <span className="font-semibold text-slate-500">
                      {categoryCounts[category.label] ?? 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
              <h3 className="font-bold text-lg mb-4">Tag Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(tagCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([tag, count]) => {
                    const weightSize =
                      count >= 4
                        ? 'text-base'
                        : count >= 3
                        ? 'text-sm'
                        : 'text-xs';
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setActiveTag((previous) =>
                            previous === tag ? null : tag
                          )
                        }
                        className={`rounded-full px-3 py-1.5 font-semibold transition-colors ${weightSize} ${
                          activeTag === tag
                            ? 'bg-[#FF5C00] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        aria-label={`Filter posts by tag ${tag}`}
                      >
                        {tag}
                      </button>
                    );
                  })}
              </div>
            </div>

          </aside>
        </div>
      </section>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-[#0A1628] text-white shadow-lg hover:bg-[#13233a] transition-colors"
          >
            <ArrowUp className="mx-auto h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
