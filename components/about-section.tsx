'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import Image from 'next/image';

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="app-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`relative ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <Image 
              src="/landing/warehousing-distribution.png" 
              alt="Warehouse" 
              width={1280} 
              height={720} 
              className="rounded-2xl shadow-2xl w-full"
            />
            <Image 
              src="/landing/sea-freight.png" 
              alt="Sea freight vessel" 
              width={1280} 
              height={720} 
              className="absolute -bottom-8 -right-8 w-2/3 rounded-2xl shadow-2xl border-4 border-background hidden lg:block"
            />
          </div>
          <div className={isVisible ? 'animate-slide-up delay-200' : 'opacity-0'}>
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">About Us</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-3 mb-6">
              Transportation Services We{' '}
              <span className="text-gradient">Provide</span>
            </h2>
            <p className="text-muted-foreground leading-loose mb-4">
              We provide comprehensive transportation services designed to meet the diverse needs of our customers. From heavy haul and oversized cargo to time-sensitive freight, we ensure safe, efficient delivery.
            </p>
            <p className="text-muted-foreground leading-loose mb-8">
              Our team handles all customs clearance and documentation to eliminate delays. We offer warehouse and distribution services to support end-to-end logistics.
            </p>
            <div className="flex gap-8">
              {[{ num: '222M+', label: 'Tons Delivered' }, { num: '100+', label: 'Global Partners' }, { num: '24/7', label: 'Support' }].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold tracking-tight text-amber-500">{s.num}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
