'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Image from 'next/image';

const stats = [
  { number: '100+', label: 'Integrated Supply Chain Expertise', features: ['Customized supply chain management', 'Freight forwarding solutions', 'Warehousing & distribution'] },
  { number: '20%', label: 'Timely Delivery to Destination', features: ['Skilled logistics team', 'Safe goods handling', 'On-time pickup and delivery'] },
  { number: '1K+', label: 'Specialized Handling & Compliance', features: ['Transportation management', 'Customs brokerage', 'Heavy goods handling'] },
];

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      <Image 
        src="/trucks-highway.jpg" 
        alt="Trucks on highway" 
        fill
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 section-dark" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 text-white">
          Expertise in Our{' '}
          <span className="text-amber-500">Services</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center p-8 rounded-2xl backdrop-blur-md border transition-all duration-500 hover:-translate-y-1 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ 
                animationDelay: `${idx * 0.15}s`, 
                background: 'hsl(0 0% 100% / 0.05)', 
                borderColor: 'hsl(0 0% 100% / 0.1)' 
              }}
            >
              <div 
                className={`text-5xl font-bold tracking-tight text-amber-400 mb-2 ${isVisible ? 'animate-slide-up' : ''}`} 
                style={{ animationDelay: `${idx * 0.2 + 0.3}s` }}
              >
                {stat.number}
              </div>
              <h3 className="text-lg font-semibold mb-4 text-white">{stat.label}</h3>
              <ul className="space-y-2">
                {stat.features.map(f => (
                  <li key={f} className="text-sm flex items-center gap-2 justify-center text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
