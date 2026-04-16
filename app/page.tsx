'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { EnhancedHero } from '@/components/enhanced-hero';
import { EnhancedServices } from '@/components/enhanced-services';
import { AboutSection } from '@/components/about-section';
import { PromiseSection } from '@/components/promise-section';
import { StatsSection } from '@/components/stats-section';
import { ServicePartners } from '@/components/service-partners';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

function Reveal({
  children,
  animation = 'animate-fadeInUp',
  className = '',
}: {
  children: ReactNode;
  animation?: string;
  className?: string;
}) {
  const { ref, isVisible } = useScrollAnimation(0.12);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${
        isVisible ? animation : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
}

export default function Home() {
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

  const articles = [
    { date: 'Sep. 02/2025', title: 'Transforming Warehouse Management with Paperless Systems', description: "In today's fast-paced logistics environment, efficiency and accuracy ...", image: '/blog-warehouse.jpg' },
    { date: 'Sep. 02/2025', title: 'Agility in Modern Supply Chains: The Key to Competitive Advantage', description: "In today's fast-paced business environment, supply chains are more co...", image: '/blog-supply-chain.jpg' },
    { date: 'Sep. 02/2025', title: 'Tailoring E-commerce Logistics for Small Businesses', description: "In today's competitive marketplace, small businesses must adopt effective...", image: '/blog-ecommerce.jpg' },
  ];

  const expertise = [
    { number: '2,000+', label: 'Integrated Supply Chain Expertise', features: ['Customized supply chain management', 'Freight forwarding solutions', 'Warehousing & distribution'] },
    { number: '98%', label: 'Timely delivery to destination', features: ['Skilled logistics team', 'Safe goods handling', 'On-time pickup and delivery'] },
    { number: '1k', label: 'Specialized Handling & Compliance', features: ['Transportation management', 'Customs brokerage', 'Heavy goods handling'] },
  ];

  return (
    <main>
      <Navbar />

      <EnhancedHero />

      <section className="relative py-12 md:py-16 bg-[#0F1923] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Reveal animation="animate-slideInLeft">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                THE MOST IMPORTANT THINGS WHICH WE CAN SHOW YOU
              </h2>
            </Reveal>
            <Reveal animation="animate-slideInRight">
              <p className="text-lg text-white/85 leading-loose">
                We move logistics forward with speed, safety, and complete visibility. From pickup to delivery,
                we create dependable transportation workflows that help your business grow.
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {[
              'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg',
              'https://images.pexels.com/photos/4481327/pexels-photo-4481327.jpeg',
              'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg',
            ].map((img, idx) => (
              <Reveal key={img} className="relative aspect-[4/3] overflow-hidden rounded-sm group" animation="animate-fadeInUp">
                <Image
                  src={img}
                  alt="Logistics showcase"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ transitionDelay: `${idx * 40}ms` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
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

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Our Trusted Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re proud to work with industry leaders and innovative companies across various sectors
            </p>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {partners.map((partner) => (
              <Reveal
                key={partner.name}
                className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 border-b-2 border-transparent hover:shadow-xl hover:-translate-y-2 hover:border-amber-400 transition-all duration-300 flex items-center justify-center min-h-[120px] group"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative h-12 w-28 transition-transform duration-300 group-hover:scale-105">
                    <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                  </div>
                  <p className="text-sm font-semibold text-foreground text-center group-hover:text-amber-500 transition-colors duration-300">
                    {partner.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0F1923] text-primary-foreground border-t-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16 text-center">Expertise in Our Transportation Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {expertise.map((stat, idx) => (
              <div key={stat.label} className="animate-scaleUp border-l-2 border-amber-400/30 pl-6" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-5xl font-bold text-amber-400 mb-4">{stat.number}</div>
                <h3 className="text-xl font-bold tracking-tight mb-6">{stat.label}</h3>
                <ul className="space-y-3">
                  {stat.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm opacity-90">
                      <span className="text-amber-400 font-bold mt-0.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background" id="blogs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">See Latest Articles From Our Company</h2>
            <div className="h-1 w-20 bg-amber-400 mb-12"></div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <Reveal
                key={article.title}
                className="bg-white ring-1 ring-border rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:ring-accent/40 transition-all duration-300 group"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    style={{ transitionDelay: `${idx * 30}ms` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-amber-500 font-semibold mb-3 border-b border-amber-400 pb-3">{article.date}</p>
                  <h3 className="text-lg font-bold tracking-tight text-foreground mb-3">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{article.description}</p>
                  <Link href="#" className="text-amber-500 hover:text-amber-600 font-semibold text-sm inline-flex items-center gap-1 group/link">
                    <span>Read More</span>
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-amber-400 text-[#0F1923]">
        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ready to Transform Your Logistics?</h2>
          <p className="text-lg mb-8 opacity-90">
            Let&apos;s work together to create efficient, reliable solutions for your supply chain needs.
          </p>
          <Button asChild size="lg" className="bg-[#0F1923] hover:bg-[#1C2B3A] text-white font-semibold hover:scale-105 transition-transform duration-300">
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </Reveal>
      </section>

      <section className="py-12 md:py-16 bg-gradient-to-b from-background to-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-center">
            <Reveal animation="animate-slideInLeft">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-foreground leading-tight">
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

            <Reveal animation="animate-slideInRight" className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 h-56 sm:h-64 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://images.pexels.com/photos/6169056/pexels-photo-6169056.jpeg"
                  alt="Logistics planning team"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://images.pexels.com/photos/4483609/pexels-photo-4483609.jpeg"
                  alt="Warehouse operations"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative h-40 sm:h-48 rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg"
                  alt="Transport truck"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mt-12">
            <div className="rounded-2xl border border-border border-t-2 border-amber-400 bg-card p-6 animate-fadeInUp transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-md">
              <span style={{ fontSize: '24px' }} className="mb-3 inline-block">🚚</span>
              <h3 className="text-lg font-semibold text-foreground">Flexible Fleet</h3>
              <p className="mt-2 text-muted-foreground">From small parcels to bulk cargo, we adapt with the right transport mode.</p>
            </div>
            <div className="rounded-2xl border border-border border-t-2 border-amber-400 bg-card p-6 animate-fadeInUp delay-100 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-md">
              <span style={{ fontSize: '24px' }} className="mb-3 inline-block">🌍</span>
              <h3 className="text-lg font-semibold text-foreground">Wider Coverage</h3>
              <p className="mt-2 text-muted-foreground">Reach more destinations with dependable regional and cross-border operations.</p>
            </div>
            <div className="rounded-2xl border border-border border-t-2 border-amber-400 bg-card p-6 animate-fadeInUp delay-200 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-md">
              <span style={{ fontSize: '24px' }} className="mb-3 inline-block">🔒</span>
              <h3 className="text-lg font-semibold text-foreground">Trusted Delivery</h3>
              <p className="mt-2 text-muted-foreground">Operational standards and secure handling keep your business reputation strong.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
