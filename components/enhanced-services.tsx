'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DollarSign, Warehouse, MapPin, Shield, CreditCard } from 'lucide-react';

const services = [
  { title: 'Transparent Pricing', icon: DollarSign, description: 'Our pricing is clear, straightforward, and designed with no hidden costs. What you see is what you get.' },
  { title: 'Warehouse Storage', icon: Warehouse, description: 'Secure and efficient warehouse storage solutions keep your goods organized and accessible.' },
  { title: 'Real Time Tracking', icon: MapPin, description: 'Monitor your shipment every step of the way with complete transparency.' },
  { title: 'Security for Cargo', icon: Shield, description: 'Your cargo is our priority. We ensure every shipment is secure and delivered safely.' },
  { title: 'Easy Payment Method', icon: CreditCard, description: 'Smooth and hassle-free transactions. Simple, fast, and reliable every time.' },
];

export function EnhancedServices() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-3">
            Unusual Things We Do for{' '}
            <span className="text-gradient">Work Efficiency</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative p-8 rounded-2xl bg-card border border-border hover:border-amber-400 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-amber-400 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-amber-500 transition-all duration-300">
                  <Icon className="w-6 h-6 text-primary group-hover:text-amber-500 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-loose">{service.description}</p>
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
