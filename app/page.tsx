'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { EnhancedHero } from '@/components/enhanced-hero';
import { EnhancedServices } from '@/components/enhanced-services';
import { AboutSection } from '@/components/about-section';
import { PromiseSection } from '@/components/promise-section';
import { StatsSection } from '@/components/stats-section';
import { ServicePartners } from '@/components/service-partners';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { BLOG_POSTS, type BlogPost } from '@/lib/blogs';
import Link from 'next/link';
import Image from 'next/image';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import { Truck, Globe, Shield, Package, Clock, BadgeCheck, ArrowRight } from 'lucide-react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

    :root {
      --ink:       #080B10;
      --ink-2:     #0E1420;
      --ink-3:     #161D2E;
      --ink-4:     #1E2840;
      --cream:     #F0EBE1;
      --cream-dim: rgba(240,235,225,0.55);
      --gold:      #F5B800;
      --gold-dim:  rgba(245,184,0,0.15);
      --gold-wire: rgba(245,184,0,0.2);
      --wire:      rgba(255,255,255,0.07);
      --wire-h:    rgba(255,255,255,0.14);
      --rule:      rgba(240,235,225,0.1);
    }

    .hp-root { background: var(--ink); color: var(--cream); font-family: 'DM Sans', sans-serif; }
    .hp-reveal { opacity: 0; transform: translateY(36px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
    .hp-reveal[data-visible="true"] { opacity: 1; transform: none; }
    .hp-kicker {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: var(--gold);
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 1.25rem;
    }
    .hp-kicker::before { content: ''; display: block; width: 28px; height: 1px; background: var(--gold); }
    .hp-display { font-family: 'Bebas Neue', sans-serif; line-height: 0.95; letter-spacing: 0.02em; color: var(--cream); }
    .hp-display em { font-style: normal; color: var(--gold); }
    .hp-body { font-size: 15px; color: var(--cream-dim); line-height: 1.75; font-weight: 300; }
    .hp-section-rule {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      padding-bottom: 1.25rem;
      margin-bottom: 3rem;
      border-bottom: 1px solid var(--rule);
    }

    .hp-showcase { background: var(--ink-2); padding: 6rem 0; position: relative; overflow: hidden; }
    .hp-showcase::before {
      content: 'CAPABILITIES';
      position: absolute;
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(80px, 14vw, 180px);
      letter-spacing: 0.08em;
      color: rgba(245,184,0,0.04);
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      pointer-events: none;
    }
    .hp-showcase-inner { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
    .hp-showcase-header { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; margin-bottom: 3.5rem; }
    .hp-showcase-title { font-size: clamp(40px, 5vw, 68px); max-width: 540px; }
    .hp-showcase-sub { font-size: 16px; color: var(--cream-dim); line-height: 1.75; font-weight: 300; }

    .hp-bento { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 220px); gap: 3px; }
    .hp-bento-item { position: relative; overflow: hidden; background: var(--ink-3); }
    .hp-bento-item:first-child { grid-column: span 2; grid-row: span 2; }
    .hp-bento-item img { object-fit: cover; transition: transform 0.7s ease, opacity 0.4s; opacity: 0.75; }
    .hp-bento-item:hover img { transform: scale(1.06); opacity: 0.9; }
    .hp-bento-item::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,11,16,0.8) 0%, transparent 60%); }
    .hp-bento-label {
      position: absolute; bottom: 1.25rem; left: 1.25rem; z-index: 2;
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--gold);
      background: rgba(245,184,0,0.1);
      border: 1px solid var(--gold-wire);
      padding: 4px 10px;
    }

    .hp-partners { background: var(--ink-2); padding: 5.5rem 0; overflow: hidden; border-top: 1px solid var(--rule); }
    .hp-partners-inner { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
    .hp-partners-header { text-align: center; margin-bottom: 3.5rem; }
    .hp-partners-title { font-size: clamp(36px, 5vw, 64px); }
    .hp-partner-track { display: flex; min-width: max-content; gap: 3px; }
    .hp-partner-row { overflow: hidden; position: relative; margin-bottom: 3px; }
    .hp-partner-row::before, .hp-partner-row::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      width: 120px;
      z-index: 2;
      pointer-events: none;
    }
    .hp-partner-row::before { left: 0; background: linear-gradient(to right, var(--ink-2), transparent); }
    .hp-partner-row::after { right: 0; background: linear-gradient(to left, var(--ink-2), transparent); }
    .hp-partner-card {
      width: 160px;
      height: 80px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.96);
      border: 1px solid rgba(245, 184, 0, 0.35);
      padding: 0 1rem;
      transition: border-color 0.3s, background 0.3s;
    }
    .hp-partner-card:hover { border-color: var(--gold); background: #ffffff; }
    .hp-partner-card img { filter: none; opacity: 1; mix-blend-mode: normal; }
    @keyframes hp-marquee-l { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes hp-marquee-r { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
    .hp-marquee-l { animation: hp-marquee-l 45s linear infinite; }
    .hp-marquee-r { animation: hp-marquee-r 55s linear infinite; }

    .hp-expertise { background: var(--ink-2); padding: 6rem 0; border-top: 3px solid var(--gold); position: relative; overflow: hidden; }
    .hp-expertise-inner { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
    .hp-expertise-header { margin-bottom: 4rem; }
    .hp-expertise-title { font-size: clamp(44px, 6vw, 76px); }
    .hp-exp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; }
    .hp-exp-block {
      padding: 2.5rem;
      border-right: 1px solid var(--rule);
      position: relative;
      transition: background 0.3s;
    }
    .hp-exp-block:last-child { border-right: none; }
    .hp-exp-block:hover { background: var(--ink-3); }
    .hp-exp-block::before {
      content: '';
      position: absolute;
      top: 2.5rem; left: 0;
      width: 3px; height: 52px;
      background: var(--gold);
      transform: scaleY(0);
      transform-origin: top;
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .hp-exp-block:hover::before { transform: scaleY(1); }
    .hp-exp-number {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(56px, 7vw, 84px);
      line-height: 1;
      color: var(--gold);
      letter-spacing: 0.02em;
    }
    .hp-exp-bar-wrap { margin: 1rem 0 1.5rem; height: 2px; background: var(--rule); width: 160px; }
    .hp-exp-bar { height: 100%; background: var(--gold); transform-origin: left; transition: transform 0.8s cubic-bezier(0.22,1,0.36,1); }
    .hp-exp-label {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      font-weight: 700;
      color: var(--cream);
      margin-bottom: 1rem;
      line-height: 1.3;
    }
    .hp-exp-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px; height: 40px;
      background: var(--gold-dim);
      border: 1px solid var(--gold-wire);
      margin-bottom: 1.25rem;
      color: var(--gold);
    }
    .hp-exp-feature {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13px;
      color: var(--cream-dim);
      margin-bottom: 0.6rem;
      font-weight: 300;
    }
    .hp-exp-feature::before { content: '—'; color: var(--gold); font-size: 12px; flex-shrink: 0; margin-top: 1px; }

    .hp-blog { background: var(--ink); padding: 6rem 0; border-top: 1px solid var(--rule); }
    .hp-blog-inner { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
    .hp-blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
    .hp-blog-card {
      background: var(--ink-2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      transition: background 0.3s;
    }
    .hp-blog-card::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 2px;
      background: var(--gold);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .hp-blog-card:hover { background: var(--ink-3); }
    .hp-blog-card:hover::after { transform: scaleX(1); }
    .hp-blog-img { position: relative; height: 220px; overflow: hidden; background: var(--ink-3); }
    .hp-blog-img img { object-fit: cover; transition: transform 0.6s ease; }
    .hp-blog-card:hover .hp-blog-img img { transform: scale(1.06); }
    .hp-blog-body { padding: 1.5rem; display: flex; flex-direction: column; flex: 1; gap: 0.75rem; }
    .hp-blog-cat {
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--gold);
      background: var(--gold-dim);
      border: 1px solid var(--gold-wire);
      display: inline-block;
      padding: 3px 8px;
    }
    .hp-blog-title {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--cream);
      line-height: 1.3;
      letter-spacing: -0.01em;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .hp-blog-excerpt { font-size: 13px; color: var(--cream-dim); line-height: 1.65; font-weight: 300; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .hp-blog-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid var(--rule);
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      color: var(--cream-dim);
      letter-spacing: 0.06em;
    }
    .hp-blog-read {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--gold);
      font-family: 'DM Mono', monospace;
      font-size: 10px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      text-decoration: none;
      transition: gap 0.2s;
    }
    .hp-blog-read:hover { gap: 10px; }
    .hp-view-all {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-top: 2.5rem;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      text-decoration: none;
      border-bottom: 1px solid var(--gold-wire);
      padding-bottom: 4px;
      transition: gap 0.2s, border-color 0.2s;
    }
    .hp-view-all:hover { gap: 16px; border-color: var(--gold); }

    .hp-cta { background: var(--gold); padding: 7rem 0; position: relative; overflow: hidden; }
    .hp-cta::before {
      content: 'START NOW';
      position: absolute;
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(100px, 18vw, 240px);
      letter-spacing: 0.08em;
      color: rgba(0,0,0,0.06);
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
      pointer-events: none;
    }
    .hp-cta-inner { max-width: 1280px; margin: 0 auto; padding: 0 2rem; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 4rem; position: relative; z-index: 1; }
    .hp-cta-title { font-size: clamp(44px, 6vw, 80px); color: var(--ink); }
    .hp-cta-sub { font-size: 16px; color: rgba(8,11,16,0.65); line-height: 1.7; font-weight: 300; margin-top: 1rem; max-width: 500px; }
    .hp-cta-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 1.1rem 2.5rem;
      background: var(--ink);
      color: var(--gold);
      font-family: 'DM Mono', monospace;
      font-size: 12px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      text-decoration: none;
      transition: background 0.2s, transform 0.2s;
      flex-shrink: 0;
    }
    .hp-cta-btn:hover { background: var(--ink-3); transform: translateY(-2px); }
    .hp-cta-svg { opacity: 0.15; }

    .hp-trust { background: var(--ink-2); padding: 6rem 0; border-top: 1px solid var(--rule); }
    .hp-trust-inner { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
    .hp-trust-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
    .hp-trust-title { font-size: clamp(40px, 5vw, 64px); margin-bottom: 1.5rem; }
    .hp-trust-mosaic { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 220px 180px; gap: 3px; }
    .hp-trust-mosaic > div:first-child { grid-row: span 2; }
    .hp-mosaic-item { position: relative; overflow: hidden; background: var(--ink-3); }
    .hp-mosaic-item img { object-fit: cover; transition: transform 0.6s ease; opacity: 0.8; }
    .hp-mosaic-item:hover img { transform: scale(1.05); opacity: 1; }

    .hp-trust-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; margin-top: 4rem; position: relative; }
    .hp-trust-cards::before {
      content: '';
      position: absolute;
      left: 0; right: 0; top: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent);
      opacity: 0.4;
    }
    .hp-trust-card {
      background: var(--ink);
      padding: 2rem;
      position: relative;
      transition: background 0.3s;
      border-top: 2px solid transparent;
    }
    .hp-trust-card::before {
      content: '';
      position: absolute;
      top: -2px; left: 0; right: 0;
      height: 2px;
      background: var(--gold);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    .hp-trust-card:hover { background: var(--ink-3); }
    .hp-trust-card:hover::before { transform: scaleX(1); }
    .hp-trust-badge {
      font-family: 'DM Mono', monospace;
      font-size: 9px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 1.25rem;
      display: block;
    }
    .hp-trust-icon { color: var(--gold); margin-bottom: 1rem; }
    .hp-trust-card-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--cream); margin-bottom: 0.5rem; }
    .hp-trust-card-body { font-size: 13px; color: var(--cream-dim); line-height: 1.65; font-weight: 300; }

    @media (max-width: 1024px) {
      .hp-showcase-header { grid-template-columns: 1fr; gap: 1.5rem; }
      .hp-bento { grid-template-columns: 1fr 1fr; grid-template-rows: 200px 200px 200px; }
      .hp-bento-item:first-child { grid-column: span 2; grid-row: span 1; }
      .hp-exp-grid { grid-template-columns: 1fr; gap: 0; }
      .hp-exp-block { border-right: none; border-bottom: 1px solid var(--rule); }
      .hp-blog-grid { grid-template-columns: 1fr; }
      .hp-cta-inner { grid-template-columns: 1fr; }
      .hp-trust-layout { grid-template-columns: 1fr; gap: 3rem; }
      .hp-trust-cards { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .hp-bento { grid-template-columns: 1fr; }
      .hp-bento-item:first-child { grid-column: span 1; }
      .hp-trust-mosaic { grid-template-columns: 1fr; grid-template-rows: 200px 160px 160px; }
      .hp-trust-mosaic > div:first-child { grid-row: span 1; }
    }
  `}</style>
);

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation(0.08);
  return (
    <div ref={ref} data-visible={isVisible ? 'true' : 'false'} className={`hp-reveal ${className}`}>
      {children}
    </div>
  );
}

function parseStatTarget(raw: string): { end: number; suffix: string } {
  const s = raw.trim();
  if (s.includes('%')) return { end: parseFloat(s) || 0, suffix: '%' };
  if (/k/i.test(s)) return { end: (parseFloat(s) || 0) * 1000, suffix: s.includes('+') ? 'k+' : 'k' };
  return { end: parseFloat(s.replace(/[+,]/g, '')) || 0, suffix: s.includes('+') ? '+' : '' };
}

function formatStatDisplay(value: number, suffix: string, template: string): string {
  if (template.includes('%')) return `${Math.round(value)}%`;
  if (/k/i.test(template)) {
    const k = value >= 1000 ? value / 1000 : value;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k${suffix.includes('+') ? '+' : ''}`;
  }
  return `${Math.round(value).toLocaleString('en-US')}${suffix}`;
}

function ExpertiseStatBlock({ stat, index, active }: { stat: { number: string; label: string; features: string[] }; index: number; active: boolean }) {
  const { end, suffix } = parseStatTarget(stat.number);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(end * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active, end]);

  const progress = active ? Math.min(100, (display / (end || 1)) * 100) : 0;
  const shown = active ? formatStatDisplay(display, suffix, stat.number) : stat.number;
  const Icon = index === 0 ? Package : index === 1 ? Clock : BadgeCheck;

  return (
    <div className="hp-exp-block">
      <div className="hp-exp-icon"><Icon size={20} /></div>
      <div className="hp-exp-number">{shown}<span className="sr-only">{stat.number}</span></div>
      <div className="hp-exp-bar-wrap">
        <div className="hp-exp-bar" style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <div className="hp-exp-label">{stat.label}</div>
      {stat.features.map((f) => (
        <div key={f} className="hp-exp-feature">{f}</div>
      ))}
    </div>
  );
}

export default function Home() {
  const { ref: trustSectionRef, isVisible: isTrustSectionVisible } = useScrollAnimation(0.1);
  const expertiseRef = useRef<HTMLElement>(null);
  const [expertiseActive, setExpertiseActive] = useState(false);
  const [featuredArticles, setFeaturedArticles] = useState<BlogPost[]>(() =>
    [...BLOG_POSTS].sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 3)
  );

  useEffect(() => {
    const el = expertiseRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setExpertiseActive(true);
        obs.disconnect();
      }
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/blogs?limit=3')
      .then((r) => (r.ok ? r.json() : null))
      .then((posts) => {
        if (active && Array.isArray(posts) && posts.length > 0) {
          setFeaturedArticles(posts);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const partners = [
    { name: 'Saudi Aramco', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Saudi_Aramco_logo.svg/500px-Saudi_Aramco_logo.svg.png' },
    { name: 'Samsung', logo: 'https://www.dafont.com/forum/attach/orig/2/1/218859.jpg', scale: 1.15 },
    { name: 'ISCO (A Siemens Company)', logo: 'https://yjrconstrade.com/img/client2/21.jpg' },
    { name: 'GWC', logo: 'https://www.gwclogistics.com/wp-content/uploads/2023/12/Newlogo.svg', scale: 1.2 },
    { name: 'SABIC', logo: 'https://www.sabic.com/en/Images/SABIC-LOGO_tcm1010-14323.svg' },
    { name: 'Al Khodari (AK)', logo: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/022025/al_abdulkarim.jpg?xH0DS85LZL.kKI.odp3Os1V0z1dC8Q9g&itok=EPEHN-rS' },
    { name: 'Nas Air', logo: 'https://d2pi0n2fm836iz.cloudfront.net/484917/050420231358506453ba1a47511.png', scale: 1.15 },
    { name: 'Petro RABIGH', logo: 'https://plantsolutionscoltd.com/assets/img/brand/3.jpg' },
    { name: 'Panalpina', logo: 'https://logodix.com/logo/1331186.jpg', scale: 1.2 },
    { name: 'Centrepoint', logo: 'https://lmg.a.bigcontent.io/v1/static/website_images_logos_centrepoint_ae_en_logo-centrepoint?fmt=auto', scale: 1.15 },
    { name: 'GAC', logo: 'https://images.crunchbase.com/image/upload/c_pad,h_160,w_160,f_auto,b_white,q_auto:eco,dpr_2/v1505901601/gspwefyprvlrrnwk1rnz.png', scale: 1.3 },
    { name: 'MMG', logo: 'https://madhyamamonline.com/h-upload/2025/03/25/2540199-6d8ca5b3-17ac-4045-b917-dbff87cb0e2f.webp' },
    { name: 'Schlumberger', logo: 'https://alchetron.com/cdn/schlumberger-deb57bbc-35fc-4ea3-839f-d98d9483a37-resize-750.gif', scale: 1.2 },
    { name: 'ABB', logo: 'https://images.crunchbase.com/image/upload/c_pad,h_160,w_160,f_auto,b_white,q_auto:eco,dpr_2/f1wabimeqycjodyovdt6', scale: 1.3 },
    { name: "Ma'aden", logo: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/072024/maaden.jpg?EbMm2gvNQB6Ub6S7INhZ1TTNWR5WFAPH&itok=yZWsuAyF' },
  ];

  const marqueeRow = [...partners, ...partners];
  const marqueeRowB = [...[...partners].reverse(), ...[...partners].reverse()];

  const expertise = [
    { number: '2,000+', label: 'Integrated Supply Chain Expertise', features: ['Customized supply chain management', 'Freight forwarding solutions', 'Warehousing & distribution'] },
    { number: '98%', label: 'Timely Delivery to Destination', features: ['Skilled logistics team', 'Safe goods handling', 'On-time pickup and delivery'] },
    { number: '1k', label: 'Specialized Handling & Compliance', features: ['Transportation management', 'Customs brokerage', 'Heavy goods handling'] },
  ];

  const showcase = [
    { src: '/landing/air-freight.png', label: 'Air Freight' },
    { src: '/landing/sea-freight.png', label: 'Sea Freight' },
    { src: '/landing/land-transport.png', label: 'Land Transport' },
  ];

  const trustCards = [
    { badge: 'Scale · Speed · Choice', title: 'Flexible Fleet', body: 'From small parcels to bulk cargo, we adapt with the right transport mode.', Icon: Truck },
    { badge: 'Reach · Routes · Regions', title: 'Wider Coverage', body: 'Reach more destinations with dependable regional and cross-border operations.', Icon: Globe },
    { badge: 'Safety · Standards · Trust', title: 'Trusted Delivery', body: 'Operational standards and secure handling keep your business reputation strong.', Icon: Shield },
  ];

  return (
    <main className="hp-root">
      <GlobalStyles />
      <Navbar />
      <EnhancedHero />

      <section className="hp-showcase">
        <div className="hp-showcase-inner">
          <div className="hp-showcase-header">
            <Reveal>
              <div className="hp-kicker">Capabilities</div>
              <h2 className="hp-display hp-showcase-title">
                THE MOST<br />IMPORTANT THINGS<br /><em>WE CAN SHOW YOU</em>
              </h2>
            </Reveal>
            <Reveal>
              <p className="hp-body" style={{ fontSize: 16, maxWidth: 480 }}>
                We move logistics forward with speed, safety, and complete visibility. From pickup to delivery,
                we create dependable transportation workflows that help your business grow.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="hp-bento">
              {showcase.map((item, idx) => (
                <div key={item.src} className="hp-bento-item">
                  <Image src={item.src} alt={item.label} fill sizes="(max-width: 1024px) 100vw, 66vw" priority={idx === 0} loading={idx === 0 ? undefined : 'lazy'} />
                  <div className="hp-bento-label">{item.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <EnhancedServices />
      <AboutSection />
      <PromiseSection />
      <StatsSection />
      <ServicePartners />

      <section className="hp-partners">
        <div className="hp-partners-inner">
          <Reveal className="hp-partners-header">
            <div className="hp-kicker" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Partners</div>
            <h2 className="hp-display hp-partners-title" data-scramble-heading="Trusted by Industry Leaders">
              TRUSTED BY<br /><em>INDUSTRY LEADERS</em>
            </h2>
            <p className="hp-body" style={{ marginTop: '1rem', maxWidth: 500, margin: '1rem auto 0' }}>
              Proud to work with industry leaders and innovative companies across various sectors.
            </p>
          </Reveal>

          <div className="hp-partner-row" style={{ marginBottom: 3 }}>
            <div className="hp-partner-track hp-marquee-l">
              {marqueeRow.map((p, i) => (
                <div key={`${p.name}-a-${i}`} className="hp-partner-card">
                  <div style={{ position: 'relative', width: 112, height: 40, transform: `scale(${p.scale ?? 1})` }}>
                    <Image src={p.logo} alt={p.name} fill style={{ objectFit: 'contain' }} sizes="100px" loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hp-partner-row">
            <div className="hp-partner-track hp-marquee-r">
              {marqueeRowB.map((p, i) => (
                <div key={`${p.name}-b-${i}`} className="hp-partner-card">
                  <div style={{ position: 'relative', width: 112, height: 40, transform: `scale(${p.scale ?? 1})` }}>
                    <Image src={p.logo} alt={p.name} fill style={{ objectFit: 'contain' }} sizes="100px" loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={expertiseRef} className="hp-expertise">
        <div className="hp-expertise-inner">
          <Reveal className="hp-expertise-header">
            <div className="hp-kicker">Expertise</div>
            <h2 className="hp-display hp-expertise-title">
              EXPERTISE IN OUR<br /><em>TRANSPORTATION SERVICES</em>
            </h2>
            <p className="hp-body" style={{ marginTop: '1rem', maxWidth: 520 }}>
              Measurable outcomes across network, delivery performance, and compliance-led execution.
            </p>
          </Reveal>
          <div className="hp-exp-grid">
            {expertise.map((stat, idx) => (
              <ExpertiseStatBlock key={stat.label} stat={stat} index={idx} active={expertiseActive} />
            ))}
          </div>
        </div>
      </section>

      <section className="hp-blog" id="blogs">
        <div className="hp-blog-inner">
          <Reveal>
            <div className="hp-section-rule">
              <div>
                <div className="hp-kicker">Insights</div>
                <h2 className="hp-display" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                  LATEST ARTICLES<br /><em>FROM OUR COMPANY</em>
                </h2>
              </div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.15em', color: 'var(--cream-dim)', textTransform: 'uppercase' }}>
                {featuredArticles.length} Articles
              </span>
            </div>
          </Reveal>

          <div className="hp-blog-grid">
            {featuredArticles.map((article) => (
              <Reveal key={article.id}>
                <article className="hp-blog-card">
                  <Link href={`/blog/${article.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                    <div className="hp-blog-img">
                      <Image src={article.image} alt={article.title} fill sizes="(max-width: 1024px) 100vw, 33vw" loading="lazy" />
                    </div>
                  </Link>
                  <div className="hp-blog-body">
                    <div><span className="hp-blog-cat">{article.category}</span></div>
                    <Link href={`/blog/${article.slug}`} style={{ textDecoration: 'none' }}>
                      <div className="hp-blog-title">{article.title}</div>
                    </Link>
                    <p className="hp-blog-excerpt">{article.excerpt}</p>
                    <div className="hp-blog-meta">
                      <span>{article.date}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{article.readTime}</span>
                      <Link href={`/blog/${article.slug}`} className="hp-blog-read">
                        Read <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link href="/blog" className="hp-view-all">
              View All Articles <ArrowRight size={13} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="hp-cta">
        <div className="hp-cta-inner">
          <div style={{ position: 'absolute', inset: 0, opacity: 0.14, pointerEvents: 'none' }}>
            <Image
              src="/landing/supply-chain-network.png"
              alt="Supply chain network"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
          <Reveal>
            <div className="hp-kicker" style={{ color: 'rgba(8,11,16,0.5)' }}>
              Next Step
            </div>
            <h2 className="hp-display hp-cta-title">
              READY TO TRANSFORM<br />YOUR LOGISTICS?
            </h2>
            <p className="hp-cta-sub">
              Let&apos;s work together to create efficient, reliable solutions for your supply chain needs.
            </p>
            <Link href="/contact" className="hp-cta-btn" style={{ marginTop: '2.5rem', display: 'inline-flex' }}>
              Get Started Today <ArrowRight size={14} />
            </Link>
          </Reveal>
          <svg width="280" height="180" viewBox="0 0 280 180" className="hp-cta-svg" aria-hidden style={{ flexShrink: 0 }}>
            <circle cx="30" cy="90" r="6" fill="#080B10" />
            <circle cx="250" cy="90" r="6" fill="#080B10" />
            <path d="M36,90 C80,30 200,150 244,90" fill="none" stroke="#080B10" strokeWidth="2" strokeDasharray="8 10" />
            <circle cx="140" cy="56" r="4" fill="#080B10" opacity="0.5" />
          </svg>
        </div>
      </section>

      <section ref={trustSectionRef} className="hp-trust">
        <div className="hp-trust-inner">
          <div className="hp-trust-layout">
            <Reveal>
              <div className="hp-kicker">Trust</div>
              <h2 className="hp-display hp-trust-title">
                EVERY SHIPMENT<br />CARRIES MORE<br /><em>THAN CARGO</em>
              </h2>
              <p className="hp-body" style={{ marginBottom: '1.25rem' }}>
                Every package we deliver holds more than just goods - it carries someone&apos;s trust and hope.
                Behind each shipment is the belief that we&apos;ll be there when it matters most.
              </p>
              <p className="hp-body">
                We&apos;re not just moving products; we&apos;re fulfilling promises, connecting lives, and making moments happen.
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--cream)', marginTop: '2rem', lineHeight: 1.4 }}>
                Your Trusted Logistics Partner -<br />Delivering Reliability Every Mile
              </p>
            </Reveal>

            <div
              data-visible={isTrustSectionVisible ? 'true' : 'false'}
              className="hp-reveal hp-trust-mosaic"
            >
              {[
                { src: '/landing/customs-clearance.png', alt: 'Customs clearance operations' },
                { src: '/landing/warehousing-distribution.png', alt: 'Warehouse distribution operations' },
                { src: '/landing/supply-chain-analytics.png', alt: 'Supply chain analytics operations' },
              ].map((img) => (
                <div key={img.src} className="hp-mosaic-item">
                  <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 100vw, 25vw" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          <div className="hp-trust-cards">
            {trustCards.map((card, idx) => (
              <Reveal key={card.title}>
                <div className="hp-trust-card" style={{ '--home-stagger': `${idx * 100}ms` } as CSSProperties}>
                  <span className="hp-trust-badge">{card.badge}</span>
                  <div className="hp-trust-icon"><card.Icon size={26} /></div>
                  <div className="hp-trust-card-title">{card.title}</div>
                  <p className="hp-trust-card-body">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
