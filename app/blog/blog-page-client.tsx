'use client';

import { type MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useReducedMotion } from 'framer-motion';
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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import type { BlogPost } from '@/lib/blogs';
import { ResponsiveBlogImage } from '@/components/blog/ResponsiveBlogImage';
import { CustomCursor } from '@/components/blog/CustomCursor';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type BlogPageClientProps = {
  displayFontClass: string;
  bodyFontClass: string;
  initialPosts: BlogPost[];
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
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&';

function useCountUp(end: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(end * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, duration, end]);

  return count;
}

export function BlogPageClient({
  displayFontClass,
  bodyFontClass,
  initialPosts,
}: BlogPageClientProps) {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const horizontalSectionRef = useRef<HTMLElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const horizontalProgressRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const sortedPosts = useMemo(() => initialPosts, [initialPosts]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('All Posts');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const shipmentsCount = useCountUp(10000, statsVisible, 1800);
  const articlesCount = useCountUp(sortedPosts.length || 500, statsVisible, 1800);
  const onTimeCount = useCountUp(98, statsVisible, 1800);

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

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-scramble-heading]')
    );
    if (nodes.length === 0) return;
    const seen = new WeakSet<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          if (seen.has(target)) continue;
          const finalText = target.dataset.scrambleHeading ?? target.innerText;
          seen.add(target);
          let iteration = 0;
          const interval = window.setInterval(() => {
            target.innerText = finalText
              .split('')
              .map((letter, i) => {
                if (letter === ' ') return ' ';
                if (i < iteration) return finalText[i];
                return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
              })
              .join('');
            if (iteration >= finalText.length) {
              window.clearInterval(interval);
              target.innerText = finalText;
            }
            iteration += 1 / 3;
          }, 40);
          observer.unobserve(target);
        }
      },
      { threshold: 0.35 }
    );
    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = document.getElementById('blog-stats-strip');
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (
        prefersReducedMotion ||
        typeof window === 'undefined' ||
        !horizontalSectionRef.current ||
        !horizontalTrackRef.current
      ) {
        return;
      }
      const trigger = gsap.to(horizontalTrackRef.current, {
        x: () =>
          -(
            horizontalTrackRef.current!.scrollWidth - window.innerWidth
          ) + 'px',
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + horizontalTrackRef.current!.scrollWidth,
          onUpdate: (self) => {
            if (!horizontalProgressRef.current) return;
            horizontalProgressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      return () => trigger.kill();
    },
    { scope: rootRef, dependencies: [prefersReducedMotion] }
  );

  const featuredPost =
    featuredCandidates[featuredIndex % Math.max(featuredCandidates.length, 1)];

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < filteredPosts.length;
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

  const handleCardMouseMove = (
    event: MouseEvent<HTMLElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.15;
    animate(
      event.currentTarget,
      { x, y },
      { type: 'spring', stiffness: 200, damping: 20 }
    );
    const imageNode = event.currentTarget.querySelector<HTMLElement>('[data-card-image]');
    if (imageNode) {
      const pointerY = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(imageNode, {
        yPercent: pointerY * -8,
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  const handleCardMouseLeave = (event: MouseEvent<HTMLElement>) => {
    animate(
      event.currentTarget,
      { x: 0, y: 0 },
      { type: 'spring', stiffness: 200, damping: 20 }
    );
    const imageNode = event.currentTarget.querySelector<HTMLElement>('[data-card-image]');
    if (imageNode) {
      gsap.to(imageNode, {
        yPercent: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  return (
    <motion.main
      ref={rootRef}
      className={`blog-premium-page min-h-screen bg-[#F5F5F0] text-[#1A1A2E] ${bodyFontClass}`}
      id="blog-search"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <CustomCursor />
      <section className="bg-[#0A1628] text-white">
        <motion.div
          className="app-container relative overflow-hidden pt-14 pb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-0 top-8 text-[180px] font-bold leading-none text-white/[0.04] md:text-[260px]"
            animate={prefersReducedMotion ? undefined : { y: [0, -20, 0] }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            2026
          </motion.div>
          {!prefersReducedMotion && (
            <div className="pointer-events-none absolute inset-0 -z-[1]">
              <motion.div
                className="absolute left-[-10%] top-[-20%] h-56 w-56 rounded-full bg-[#FF5C00] opacity-30 blur-3xl"
                animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute right-[-8%] top-[10%] h-72 w-72 rounded-full bg-[#2E7DFF] opacity-25 blur-3xl"
                animate={{ x: [0, -100, 60, 0], y: [0, 80, -30, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-[-20%] left-[20%] h-64 w-64 rounded-full bg-[#FAC12E] opacity-30 blur-3xl"
                animate={{ x: [0, 60, -80, 0], y: [0, -40, 70, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute bottom-[-10%] right-[12%] h-48 w-48 rounded-full bg-[#8B5CF6] opacity-30 blur-3xl"
                animate={{ x: [0, -50, 90, 0], y: [0, 60, -50, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          )}
          <p className="uppercase tracking-[0.18em] text-xs text-orange-300 font-semibold">
            Freight Intelligence Journal
          </p>
          <h1
            className={`${displayFontClass} mt-4 text-4xl sm:text-5xl lg:text-6xl leading-[0.95] tracking-tight`}
            data-scramble-heading="Insights That Move Your Business Forward"
          >
            {heroTitleWords.map((word, index) => (
              <span key={`${word}-${index}`} className="mr-3 inline-block overflow-hidden">
                <motion.span
                  initial={{ y: '110%', rotate: 3, opacity: 0 }}
                  animate={{ y: '0%', rotate: 0, opacity: 1 }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-6 max-w-3xl text-base text-white/80 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            Expert insights on freight forwarding, warehousing, air cargo, ocean
            shipping, and supply chain optimization.
          </motion.p>

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
                enterKeyHint="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles, categories, or tags..."
                className="min-h-12 h-12 w-full touch-manipulation rounded-full border border-white/20 bg-white/10 pl-11 pr-4 text-base placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#FF5C00]"
              />
            </label>
            <button
              type="button"
              onClick={resetFilters}
              className="min-h-12 h-12 touch-manipulation rounded-full border border-white/20 px-6 text-sm font-semibold hover:border-[#FF5C00] hover:text-[#FF5C00] active:border-[#FF5C00] active:text-[#FF5C00] transition-colors"
              aria-label="Reset all filters"
            >
              Reset Filters
            </button>
          </div>
        </motion.div>
      </section>

      <section className="sticky top-14 z-30 border-y border-slate-200 bg-[#F5F5F0]/95 max-md:backdrop-blur-none md:backdrop-blur">
        <div className="app-container py-3">
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
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="activeTag"
                        className="absolute inset-0 rounded-full bg-[#FF5C00]/20"
                        transition={{
                          type: 'spring',
                          stiffness: 320,
                          damping: 28,
                        }}
                      />
                    )}
                  </AnimatePresence>
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
        <div className="app-container">
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block overflow-hidden rounded-3xl ring-1 ring-slate-200"
            aria-label={`Read featured post: ${featuredPost.title}`}
          >
            <div className="relative h-[380px] sm:h-[480px] overflow-hidden bg-[#0A1628]">
              <motion.div
                className="h-full"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveBlogImage
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  priority
                  mode="contain"
                  sizes="100vw"
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
                  data-scramble-heading={featuredPost.title}
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

      <section className="border-y border-slate-200 bg-white/50 py-3">
        <div className="app-container overflow-hidden">
          <div className="blog-marquee-inner flex min-w-max items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            {Array.from({ length: 2 }).map((_, idx) => (
              <span key={`marquee-a-${idx}`}>
                Freight Insights • Supply Chain • Shipping News • Logistics •
                Industry Trends •
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        id="blog-stats-strip"
        className="border-b border-slate-200 bg-[#0F1923] py-4 text-white"
      >
        <motion.div
          className="app-container flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-[0.12em] md:gap-8"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -60 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span>{shipmentsCount.toLocaleString()}+ Shipments Tracked</span>
          <span className="text-white/40">•</span>
          <span>{articlesCount}+ Articles</span>
          <span className="text-white/40">•</span>
          <span>{onTimeCount}% On-Time</span>
        </motion.div>
      </section>

      <section ref={horizontalSectionRef} className="relative bg-[#0A1628] py-10 text-white">
        <div className="app-container mb-6">
          <h2
            className={`${displayFontClass} text-3xl uppercase tracking-tight md:text-4xl`}
            data-scramble-heading="Featured Posts"
          >
            Featured Posts
          </h2>
        </div>
        <div ref={horizontalTrackRef} className="flex min-w-max gap-5 px-4 md:px-8">
          {featuredCandidates.slice(0, Math.min(6, featuredCandidates.length)).map((post) => (
            <article
              key={`featured-horizontal-${post.id}`}
              className="w-[420px] shrink-0 overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm"
            >
              <div className="relative h-[520px]">
                <ResponsiveBlogImage src={post.image} alt={post.title} mode="cover" sizes="420px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-orange-300">{post.category}</p>
                  <h3 className={`${displayFontClass} mt-2 text-3xl leading-tight`} data-scramble-heading={post.title}>
                    {post.title}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="app-container mt-6">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
            <div
              ref={horizontalProgressRef}
              className="h-full origin-left scale-x-0 rounded-full bg-[#FF5C00]"
            />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="app-container grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_330px] gap-10">
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
                        initial={
                          prefersReducedMotion
                            ? false
                            : { opacity: 0, y: 80, rotateX: 15, scale: 0.95 }
                        }
                        whileInView={
                          prefersReducedMotion
                            ? undefined
                            : { opacity: 1, y: 0, rotateX: 0, scale: 1 }
                        }
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.12,
                          ease: [0.21, 1.02, 0.73, 1],
                        }}
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        className="group rounded-2xl bg-white ring-1 ring-slate-200 overflow-hidden flex flex-col"
                        data-cursor="card"
                        style={{
                          transition: 'transform 0.2s ease',
                          willChange: 'transform, opacity',
                          transformPerspective: 1000,
                        }}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block relative h-[220px] md:aspect-[16/9] md:h-auto"
                        >
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.4 }}
                            className="h-full w-full"
                            data-card-image
                          >
                            <ResponsiveBlogImage
                              src={post.image}
                              alt={post.title}
                              mode="cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          </motion.div>
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
              <h3 className="font-bold text-lg mb-3" data-scramble-heading="Search">Search</h3>
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
              <h3 className="font-bold text-lg mb-4" data-scramble-heading="Popular Posts">Popular Posts</h3>
              <div className="space-y-4">
                {popularPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="h-14 w-[70px] shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <ResponsiveBlogImage
                        src={post.image}
                        alt={post.title}
                        mode="cover"
                        sizes="70px"
                      />
                    </div>
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
              <h3 className="font-bold text-lg mb-4" data-scramble-heading="Categories">Categories</h3>
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
              <h3 className="font-bold text-lg mb-4" data-scramble-heading="Tag Cloud">Tag Cloud</h3>
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
    </motion.main>
  );
}
