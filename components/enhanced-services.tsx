'use client';

import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { DollarSign, Warehouse, MapPin, Shield, CreditCard, Headset } from 'lucide-react';

const services = [
  { title: 'Transparent Pricing', icon: DollarSign, description: 'Our pricing is clear, straightforward, and designed with no hidden costs. What you see is what you get.' },
  { title: 'Warehouse Storage', icon: Warehouse, description: 'Secure and efficient warehouse storage solutions keep your goods organized and accessible.' },
  { title: 'Real Time Tracking', icon: MapPin, description: 'Monitor your shipment every step of the way with complete transparency.' },
  { title: 'Security for Cargo', icon: Shield, description: 'Your cargo is our priority. We ensure every shipment is secure and delivered safely.' },
  { title: 'Easy Payment Method', icon: CreditCard, description: 'Smooth and hassle-free transactions. Simple, fast, and reliable every time.' },
  { title: '24/7 Support', icon: Headset, description: 'Our support team is available around the clock to assist you with any queries or concerns.' },
];

export function EnhancedServices() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="app-container">
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
                className={`group relative rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-400">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">{service.title}</h3>
                <p className="leading-8 text-gray-500">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
