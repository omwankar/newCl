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
import { getBlogsNewestFirst } from '@/lib/blogs';
import Link from 'next/link';
import Image from 'next/image';
import { type CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { Truck, Globe, Shield, Package, Clock, BadgeCheck } from 'lucide-react';

function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation(0.08);

  return (
    <div ref={ref} data-visible={isVisible ? 'true' : 'false'} className={`home-reveal ${className}`}>
      {children}
    </div>
  );
}

function parseStatTarget(raw: string): { end: number; suffix: string; decimals: number } {
  const s = raw.trim();
  if (s.includes('%')) {
    const n = parseFloat(s.replace('%', ''));
    return { end: Number.isFinite(n) ? n : 0, suffix: '%', decimals: 0 };
  }
  if (/k$/i.test(s)) {
    const n = parseFloat(s.replace(/k\+?$/i, ''));
    return { end: Number.isFinite(n) ? n * 1000 : 0, suffix: s.includes('+') ? 'k+' : 'k', decimals: 0 };
  }
  const cleaned = s.replace(/[+,]/g, '');
  const n = parseFloat(cleaned);
  return { end: Number.isFinite(n) ? n : 0, suffix: s.includes('+') ? '+' : '', decimals: 0 };
}

function formatStatDisplay(value: number, suffix: string, template: string): string {
  if (template.includes('%')) return `${Math.round(value)}%`;
  if (/k/i.test(template)) {
    const k = value >= 1000 ? value / 1000 : value;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}k${suffix.includes('+') ? '+' : ''}`;
  }
  return `${Math.round(value).toLocaleString('en-US')}${suffix}`;
}

function ExpertiseStatBlock({
  stat,
  index,
  active,
}: {
  stat: { number: string; label: string; features: string[] };
  index: number;
  active: boolean;
}) {
  const { end, suffix } = parseStatTarget(stat.number);
  const [display, setDisplay] = useState(0);
  const template = stat.number;

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
  const shown = active ? formatStatDisplay(display, suffix, template) : stat.number;

  const Icon = index === 0 ? Package : index === 1 ? Clock : BadgeCheck;

  return (
    <div className="relative border-l-2 border-amber-400/30 pl-6 md:pl-8">
      <div className="pointer-events-none absolute -left-2 top-0 h-32 w-32 rounded-full bg-amber-400 opacity-10 motion-reduce:opacity-0" />
      <div className="relative flex items-start gap-4">
        <div className="mt-1 rounded-lg bg-amber-400/15 p-2 text-amber-400">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div className="flex-1 min-w-0">
          <div className="relative text-5xl font-bold text-amber-400 tabular-nums">
            {shown}
            <span className="sr-only">{stat.number}</span>
          </div>
          <div className="mt-3 h-1 w-full max-w-[200px] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-amber-400 motion-reduce:transition-none transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <h3 className="mt-5 text-xl font-bold tracking-tight">{stat.label}</h3>
          <ul className="mt-4 space-y-3">
            {stat.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm opacity-90">
                <span className="text-amber-400 font-bold mt-0.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { ref: trustSectionRef, isVisible: isTrustSectionVisible } = useScrollAnimation(0.1);
  const expertiseRef = useRef<HTMLElement>(null);
  const [expertiseActive, setExpertiseActive] = useState(false);

  useEffect(() => {
    const el = expertiseRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setExpertiseActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const partners = [
    { name: 'Saudi Aramco', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a7/Saudi_Aramco_logo.svg/500px-Saudi_Aramco_logo.svg.png' },
    { name: 'Samsung', logo: 'https://www.dafont.com/forum/attach/orig/2/1/218859.jpg' },
    { name: 'ISCO (A Siemens Company)', logo: 'https://yjrconstrade.com/img/client2/21.jpg' },
    { name: 'GWC', logo: 'https://www.gwclogistics.com/wp-content/uploads/2023/12/Newlogo.svg' },
    { name: 'SABIC', logo: 'https://www.sabic.com/en/Images/SABIC-LOGO_tcm1010-14323.svg' },
    { name: 'Al Khodari (AK)', logo: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-original-577x577/s3/022025/al_abdulkarim.jpg?xH0DS85LZL.kKI.odp3Os1V0z1dC8Q9g&itok=EPEHN-rS' },
    { name: 'Nas Air / Nas Aviation', logo: 'https://d2pi0n2fm836iz.cloudfront.net/484917/050420231358506453ba1a47511.png' },
    { name: 'Petro RABIGH', logo: 'https://plantsolutionscoltd.com/assets/img/brand/3.jpg' },
    { name: 'Panalpina', logo: 'https://logodix.com/logo/1331186.jpg' },
    { name: 'Centrepoint', logo: 'https://lmg.a.bigcontent.io/v1/static/website_images_logos_centrepoint_ae_en_logo-centrepoint?fmt=auto' },
    { name: 'GAC', logo: 'https://images.crunchbase.com/image/upload/c_pad,h_160,w_160,f_auto,b_white,q_auto:eco,dpr_2/v1505901601/gspwefyprvlrrnwk1rnz.png' },
    { name: 'Mohammed Al-Mojil Group (MMG)', logo: 'https://madhyamamonline.com/h-upload/2025/03/25/2540199-6d8ca5b3-17ac-4045-b917-dbff87cb0e2f.webp' },
    { name: 'Schlumberger', logo: 'https://alchetron.com/cdn/schlumberger-deb57bbc-35fc-4ea3-839f-d98d9483a37-resize-750.gif' },
    { name: 'MEXX Retail', logo: 'https://api-prod.aiwa.ae//Content/Company/Logo/28092016112436088_mexxlogojpg.jpg' },
    { name: 'ABB', logo: 'https://images.crunchbase.com/image/upload/c_pad,h_160,w_160,f_auto,b_white,q_auto:eco,dpr_2/f1wabimeqycjodyovdt6' },
    { name: "Ma'aden (Saudi Arabian Mining Company)", logo: 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/072024/maaden.jpg?EbMm2gvNQB6Ub6S7INhZ1TTNWR5WFAPH&itok=yZWsuAyF' },
  ];

  const featuredArticles = getBlogsNewestFirst().slice(0, 3);

  const expertise = [
    { number: '2,000+', label: 'Integrated Supply Chain Expertise', features: ['Customized supply chain management', 'Freight forwarding solutions', 'Warehousing & distribution'] },
    { number: '98%', label: 'Timely delivery to destination', features: ['Skilled logistics team', 'Safe goods handling', 'On-time pickup and delivery'] },
    { number: '1k', label: 'Specialized Handling & Compliance', features: ['Transportation management', 'Customs brokerage', 'Heavy goods handling'] },
  ];

  const marqueeRow = [...partners, ...partners];
  const marqueeRowReverse = [...partners].reverse();
  const marqueeRowB = [...marqueeRowReverse, ...marqueeRowReverse];

  const showcase = [
    { src: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg', label: 'Air Freight', span: 'lg:col-span-2 lg:row-span-2 min-h-[280px] lg:min-h-[420px]' },
    { src: 'https://images.pexels.com/photos/4481327/pexels-photo-4481327.jpeg', label: 'Warehousing', span: 'min-h-[200px]' },
    { src: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg', label: 'Last Mile', span: 'min-h-[200px]' },
  ];

  return (
    <main>
      <Navbar />

      <EnhancedHero />

      {/* SHOWCASE — Bento */}
      <section className="relative py-12 md:py-16 bg-[#0F1923] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">Capabilities</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                THE MOST IMPORTANT THINGS WHICH WE CAN SHOW YOU
              </h2>
            </Reveal>
            <Reveal>
              <p className="text-lg text-white/85 leading-loose">
                We move logistics forward with speed, safety, and complete visibility. From pickup to delivery,
                we create dependable transportation workflows that help your business grow.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:gap-5">
            {showcase.map((item, idx) => (
              <Reveal
                key={item.src}
                className={`group relative overflow-hidden rounded-2xl ring-1 ring-white/10 ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  priority={idx === 0}
                  loading={idx === 0 ? undefined : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent motion-reduce:from-black/60" />
                <div className="absolute left-4 top-4 rounded-full bg-amber-400/90 px-3 py-1 text-xs font-bold text-[#0F1923]">
                  {item.label}
                </div>
                <div className="pointer-events-none absolute inset-0 border-l-4 border-transparent transition-colors duration-300 group-hover:border-amber-400 motion-reduce:group-hover:border-transparent" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EnhancedServices />
      <AboutSection />
      <PromiseSection />
      <StatsSection />
      <ServicePartners />

      {/* PARTNERS — marquee */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">Partners</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-foreground">Trusted by Industry Leaders</h2>
            <div className="mx-auto mt-3 h-0.5 w-24 bg-amber-400" />
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re proud to work with industry leaders and innovative companies across various sectors
            </p>
          </Reveal>

          <div className="space-y-4">
            <div
              className="relative flex min-h-[116px] overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
              style={{ contain: 'strict' }}
            >
              <div
                className="home-marquee-l flex min-w-max gap-6 motion-safe:[animation:home-marquee-l_45s_linear_infinite] motion-reduce:animate-none"
                style={{ transform: 'translateZ(0)' }}
              >
                {marqueeRow.map((partner, i) => (
                  <div
                    key={`${partner.name}-a-${i}`}
                    className="flex h-[100px] w-[150px] shrink-0 items-center justify-center rounded-xl border border-border bg-white px-4 shadow-sm"
                  >
                    <div className="relative h-10 w-28">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        sizes="150px"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="relative flex min-h-[116px] overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
              style={{ contain: 'strict' }}
            >
              <div
                className="home-marquee-r flex min-w-max gap-6 motion-safe:[animation:home-marquee-r_50s_linear_infinite] motion-reduce:animate-none"
                style={{ transform: 'translateZ(0)' }}
              >
                {marqueeRowB.map((partner, i) => (
                  <div
                    key={`${partner.name}-b-${i}`}
                    className="flex h-[100px] w-[150px] shrink-0 items-center justify-center rounded-xl border border-border bg-white px-4 shadow-sm"
                  >
                    <div className="relative h-10 w-28">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        sizes="150px"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTISE — CountUp */}
      <section
        ref={expertiseRef}
        className="py-16 md:py-24 bg-[#0F1923] text-primary-foreground border-t-4 border-amber-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">Expertise</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-center mt-2">
              Expertise in Our Transportation Services
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-white/75">
              Measurable outcomes across network, delivery performance, and compliance-led execution.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {expertise.map((stat, idx) => (
              <Reveal key={stat.label}>
                <ExpertiseStatBlock stat={stat} index={idx} active={expertiseActive} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="py-16 md:py-24 bg-background" id="blogs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">Insights</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-foreground mt-2">
              See Latest Articles From Our Company
            </h2>
            <div className="h-1 w-20 bg-amber-400 mb-8 md:mb-12" />
          </Reveal>
          <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
            {featuredArticles.map((article) => (
              <Reveal
                key={article.id}
                className="min-w-[min(100%,320px)] shrink-0 snap-center md:min-w-0"
              >
                <article className="bg-white ring-1 ring-border rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:ring-amber-400/40 transition-all duration-300 group h-full flex flex-col">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 85vw, 33vw"
                      className="object-cover motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-out group-hover:scale-[1.08] motion-reduce:group-hover:scale-100"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-500" />
                    <span className="absolute left-3 top-3 rounded-full bg-amber-400/95 px-2.5 py-1 text-[11px] font-bold text-[#0F1923]">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-amber-600 font-semibold mb-3 border-b border-amber-400 pb-3">
                      {article.date} · {article.readTime}
                    </p>
                    <h3 className="text-lg font-bold tracking-tight text-foreground mb-3">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{article.excerpt}</p>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-amber-500 hover:text-amber-600 font-semibold text-sm inline-flex items-center gap-1 group/link"
                    >
                      <span>Read More</span>
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-600 font-semibold">
              View All Blogs
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — split navy */}
      <section className="relative border-t-4 border-amber-400 bg-[#0F1923] py-16 md:py-20 text-white overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 translate-x-1/4 rounded-full bg-amber-400 opacity-10 motion-reduce:opacity-0" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/90">Next step</p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Ready to Transform Your Logistics?</h2>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Let&apos;s work together to create efficient, reliable solutions for your supply chain needs.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-amber-400 px-8 text-sm font-semibold text-[#0F1923] shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl motion-reduce:hover:scale-100"
            >
              Get Started Today
            </Link>
          </Reveal>
          <Reveal className="hidden lg:flex justify-center">
            <svg width="320" height="200" viewBox="0 0 320 200" className="text-amber-400/80" aria-hidden>
              <circle cx="40" cy="100" r="6" fill="currentColor" />
              <circle cx="280" cy="100" r="6" fill="currentColor" />
              <path
                d="M46,100 C100,40 220,160 274,100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 10"
                className="home-dash-anim motion-safe:[animation:home-dash_4s_linear_infinite]"
                style={{ strokeDashoffset: 100 }}
              />
            </svg>
          </Reveal>
        </div>
      </section>

      {/* TRUST — masonry + timeline cards */}
      <section
        ref={trustSectionRef}
        className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/40 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">Trust</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight mb-6 text-foreground leading-tight">
                Every Shipment Carries More Than Cargo
              </h2>
              <p className="text-lg text-muted-foreground mb-5 leading-loose">
                Every package we deliver holds more than just goods; it carries someone&apos;s trust and hope.
                Behind each shipment is the belief that we&apos;ll be there when it matters most.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-loose">
                We&apos;re not just moving products; we&apos;re fulfilling promises, connecting lives, and making moments happen.
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Your Trusted Logistics Partner - Delivering Reliability Every Mile
              </h3>
            </Reveal>

            <div
              data-visible={isTrustSectionVisible ? 'true' : 'false'}
              className="home-reveal-trust-grid grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2 lg:grid-rows-2"
            >
              <div className="relative min-h-[260px] rounded-2xl overflow-hidden shadow-lg group lg:row-span-2 lg:min-h-[420px]">
                <Image
                  src="https://images.pexels.com/photos/6169056/pexels-photo-6169056.jpeg"
                  alt="Logistics planning team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  loading="lazy"
                />
              </div>
              <div className="relative min-h-[160px] sm:min-h-[200px] rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://images.pexels.com/photos/4483609/pexels-photo-4483609.jpeg"
                  alt="Warehouse operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  loading="lazy"
                />
              </div>
              <div className="relative min-h-[160px] sm:min-h-[200px] rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg"
                  alt="Transport truck"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="relative mt-14 md:mt-16">
            <div
              className="pointer-events-none absolute left-4 right-4 top-8 hidden h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0 md:block motion-reduce:hidden"
              aria-hidden
            />
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {[
                {
                  badge: 'Scale · Speed · Choice',
                  title: 'Flexible Fleet',
                  body: 'From small parcels to bulk cargo, we adapt with the right transport mode.',
                  Icon: Truck,
                },
                {
                  badge: 'Reach · Routes · Regions',
                  title: 'Wider Coverage',
                  body: 'Reach more destinations with dependable regional and cross-border operations.',
                  Icon: Globe,
                },
                {
                  badge: 'Safety · Standards · Trust',
                  title: 'Trusted Delivery',
                  body: 'Operational standards and secure handling keep your business reputation strong.',
                  Icon: Shield,
                },
              ].map((card, idx) => (
                <div
                  key={card.title}
                  data-visible={isTrustSectionVisible ? 'true' : 'false'}
                  className="home-reveal-trust-card relative rounded-2xl border border-border bg-card p-6 pl-5 motion-reduce:transition-none hover:bg-white hover:shadow-md before:pointer-events-none before:absolute before:inset-y-3 before:left-0 before:w-1 before:rounded-full before:bg-amber-400 before:opacity-0 before:transition-opacity hover:before:opacity-100 motion-reduce:hover:before:opacity-0"
                  style={{ '--home-stagger': `${idx * 100}ms` } as CSSProperties}
                >
                  <p className="text-[11px] font-bold uppercase tracking-wide text-amber-500">{card.badge}</p>
                  <card.Icon className="mt-3 h-8 w-8 text-amber-500" aria-hidden />
                  <h3 className="mt-3 text-lg font-semibold text-foreground">{card.title}</h3>
                  <p className="mt-2 text-muted-foreground">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
