'use client';

import { Button } from '@/components/ui/button';
import { MapPin, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function EnhancedHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image 
        src="/hero-logistics.jpg" 
        alt="Global logistics port" 
        fill
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />
      <div className="absolute inset-0 hero-overlay" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-amber-400/20 animate-float" 
            style={{
              width: `${20 + i * 15}px`, 
              height: `${20 + i * 15}px`,
              left: `${10 + i * 20}%`, 
              top: `${20 + i * 12}%`,
              animationDelay: `${i * 0.8}s`
            }} 
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-500 text-sm font-medium mb-6 animate-slide-up backdrop-blur-sm border border-amber-400/30">
            Global Logistics Solutions
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-slide-up delay-100 text-white">
            Transportation{' '}
            <span className="text-gradient">Around the World</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-slide-up delay-200 max-w-xl text-white/80">
            Seamless Global Deliveries, Trusted Every Mile. Connecting Continents, Delivering Excellence.
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-up delay-300">
            <Button asChild size="lg" className="bg-amber-400 hover:bg-amber-500 text-[#0F1923] text-base px-8 shadow-lg">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base px-8 backdrop-blur-sm">
              <Link href="/services">Our Services</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 mt-8 animate-slide-up delay-400 text-white/70">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span className="text-sm">Suite 1/4, Park Lane House, Glasgow</span>
          </div>
        </div>
      </div>

      <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <ArrowDown className="w-6 h-6 text-white/60" />
      </a>
    </section>
  );
}
