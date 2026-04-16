'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Heart } from 'lucide-react';

export function PromiseSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Heart className={`w-12 h-12 text-amber-500 mx-auto mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} />
        <h2 className={`text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 ${isVisible ? 'animate-slide-up delay-100' : 'opacity-0'}`}>
          Every Shipment Carries More Than{' '}
          <span className="text-gradient">Cargo</span>
        </h2>
        <p className={`text-muted-foreground text-lg leading-loose mb-4 ${isVisible ? 'animate-slide-up delay-200' : 'opacity-0'}`}>
          Every package we deliver holds more than just goods; it carries someone's trust and hope. Behind each shipment is the belief that we'll be there when it matters most.
        </p>
        <p className={`text-muted-foreground text-lg leading-loose mb-8 ${isVisible ? 'animate-slide-up delay-300' : 'opacity-0'}`}>
          We're not just moving products; we're fulfilling promises, connecting lives, and making moments happen.
        </p>
        <div className={`inline-block px-6 py-3 rounded-full bg-amber-400 text-[#0F1923] font-medium ${isVisible ? 'animate-slide-up delay-400 animate-pulse-glow' : 'opacity-0'}`}>
          Your Trusted Logistics Partner – Delivering Reliability Every Mile
        </div>
      </div>
    </section>
  );
}
