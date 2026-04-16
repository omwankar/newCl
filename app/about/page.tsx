'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { HistoryTimeline } from '@/components/history-timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TIMELINE_EVENTS, MISSION, VISION } from '@/lib/constants';
import { Award, Users, Globe, Leaf } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
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

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        title="About Clarusto Logistics"
        subtitle="Est. 1992 · Trusted Worldwide"
        description="From a joint venture in Eastern Province to a globally recognised freight leader - over 30 years of moving cargo, building trust, and delivering reliability across 5 continents."
        ctaText="Get a Quote"
        ctaHref="/contact"
        backgroundImage="/about-hero.jpg"
        variant="compact"
      />

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Reveal animation="animate-slideInLeft" className="bg-white rounded-2xl p-8 border-t-4 border-amber-400 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center text-[#0F1923] font-bold text-lg">M</div>
                <h3 className="text-2xl font-bold text-[#0F1923]">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-base leading-loose">
                {MISSION}
              </p>
            </Reveal>

            <Reveal animation="animate-slideInRight" className="bg-[#0F1923] rounded-2xl p-8 border-t-4 border-amber-400 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center text-[#0F1923] font-bold text-lg">V</div>
                <h3 className="text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-white/80 text-base leading-loose">
                {VISION}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-14 bg-[#0F1923] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, number: '30+', label: 'Years of Excellence', sub: 'Est. 1992 in Saudi Arabia' },
              { icon: Users, number: '2,000+', label: 'Projects Delivered', sub: 'Across industries worldwide' },
              { icon: Globe, number: '5', label: 'Continents Covered', sub: 'Global reach, local expertise' },
              { icon: Leaf, number: '6', label: 'Certifications', sub: 'IATA · ISO 9001 · BIFA · FORS · RHA · DVSA' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.label}
                  className="text-center p-6 rounded-xl border border-white/10 hover:border-amber-400/50 transition-colors"
                  animation="animate-fadeInUp"
                >
                  <div className="w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#0F1923]" />
                  </div>
                  <div className="text-3xl font-bold text-amber-400 mb-1">{item.number}</div>
                  <h3 className="text-base font-semibold mb-1">{item.label}</h3>
                  <p className="text-xs text-white/50">{item.sub}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <HistoryTimeline events={TIMELINE_EVENTS} />

      <section className="py-16 md:py-20 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1923] mb-3">Why Choose Clarusto?</h2>
            <p className="text-gray-500 text-lg">Over 30 years of trust, expertise & global reach</p>
            <div className="h-1 w-16 bg-amber-400 mx-auto mt-4"></div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Standard of Excellence', desc: 'Delivering world-class logistics with unmatched quality across every shipment.' },
              { title: 'Cost Effective', desc: 'Optimised supply chain services that reduce your operational costs without compromising quality.' },
              { title: 'Solid Teamwork', desc: 'A skilled, dedicated team working seamlessly to move your cargo safely and on time.' },
              { title: 'Commitment to Work', desc: 'Reliable, on-time delivery backed by unwavering dedication to every client.' },
              { title: 'Easily Customisable', desc: 'Flexible logistics solutions tailored precisely to your business requirements.' },
              { title: 'Global Network', desc: 'Offices in Saudi Arabia, UK, Dubai, Germany, and India - with agents worldwide.' },
            ].map((item, i) => (
              <Reveal key={i} className="bg-white rounded-xl p-6 border-l-4 border-amber-400 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-lg font-bold text-[#0F1923] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Our Core Values
            </h2>
            <div className="h-1 w-16 bg-amber-400 mx-auto mt-3 mb-12"></div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Reliability',
                description: 'Consistently delivering on our promises, ensuring your shipments arrive safely and on time.',
              },
              {
                title: 'Innovation',
                description: 'Leveraging cutting-edge technology to optimize logistics and improve customer experience.',
              },
              {
                title: 'Integrity',
                description: 'Maintaining the highest ethical standards in all business relationships and operations.',
              },
              {
                title: 'Customer Focus',
                description: 'Putting our clients&apos; needs first with personalized solutions and 24/7 support.',
              },
              {
                title: 'Sustainability',
                description: 'Committed to environmentally responsible logistics and green transportation solutions.',
              },
              {
                title: 'Excellence',
                description: 'Striving for continuous improvement in all aspects of our operations and service delivery.',
              },
            ].map((value, index) => (
              <Reveal key={index}>
              <Card className="border-t-2 border-transparent hover:border-amber-400 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-[#0F1923]">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0F1923] text-white">
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-3">Our Certifications</h2>
          <p className="text-white/60 mb-10">Globally recognised standards that back our commitment to quality</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['IATA Member', 'ISO 9001 Certified', 'BIFA Member', 'FORS Accredited', 'RHA Member', 'DVSA Earned Recognition'].map((cert) => (
              <div key={cert} className="px-5 py-3 rounded-full border border-amber-400/40 text-amber-400 text-sm font-semibold hover:bg-amber-400 hover:text-[#0F1923] transition-all duration-300 cursor-default">
                {cert}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="py-16 bg-[#F8F6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0F1923] mb-2">Our Global Offices</h2>
            <div className="h-1 w-16 bg-amber-400 mx-auto"></div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { region: 'Headquarters', city: 'Dammam, Saudi Arabia', detail: 'Alshifa Office #02, Building 8179, Dammam' },
              { region: 'United Kingdom', city: 'Glasgow, Scotland', detail: 'Suite 1/4, Park Lane House, 47 Broad Street, G40 2QW' },
              { region: 'Dubai', city: 'Dubai, UAE', detail: 'Clarusto Logistics, P.O. Box 232939, Dubai' },
              { region: 'Germany', city: 'Magdeburg, Germany', detail: 'Regus - Hasselbachplatz, Breiter Weg 232A, 39104' },
              { region: 'India', city: 'Kerala, India', detail: 'MMC/644E5, 1st Floor, Imperial Plaza, Velloorkunnam, Muvattupuzha' },
              { region: 'Bahrain', city: 'Bahrain', detail: 'Regional operations hub serving the Gulf' },
            ].map((office) => (
              <Reveal key={office.region} className="bg-white rounded-xl p-6 border-t-2 border-amber-400 shadow-sm">
                <div className="text-xs font-semibold text-amber-500 uppercase tracking-widest mb-2">{office.region}</div>
                <h3 className="text-base font-bold text-[#0F1923] mb-1">{office.city}</h3>
                <p className="text-sm text-gray-500">{office.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
