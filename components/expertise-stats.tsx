'use client';

import { useEffect, useState } from 'react';

interface Stat {
  number: string;
  label: string;
  description: string;
  details: string[];
}

const stats: Stat[] = [
  {
    number: '2,000+',
    label: 'Integrated Supply Chain Expertise',
    description: 'We streamline your entire logistics journey with expert warehousing, and tailored distribution strategies.',
    details: [
      'Warehousing & distribution',
      'Freight forwarding solutions',
      'Customized supply chain management'
    ]
  },
  {
    number: '98%',
    label: 'Timely Delivery to Destination',
    description: 'We deliver safely to every destination on time. Your shipments always arrive as promised, without delay.',
    details: [
      'On-time pickup and delivery',
      'Safe goods handling',
      'Skilled logistics team'
    ]
  },
  {
    number: '1k',
    label: 'Specialized Handling & Compliance',
    description: 'Your cargo is in safe hands—from bulky goods to customs clearance, we handle it with care and precision.',
    details: [
      'Heavy goods handling',
      'Customs brokerage',
      'Transportation management'
    ]
  }
];

export function ExpertiseStats() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="app-container">
        <div className="mb-12 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Expertise in Our Transportation Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="animate-scaleUp p-8 rounded-lg border border-white border-opacity-10 hover:border-accent hover:border-opacity-100 transition-all duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="mb-6">
                <h3 className="text-5xl md:text-6xl font-bold text-accent mb-4">
                  {stat.number}
                </h3>
                <p className="text-lg font-semibold text-primary-foreground">
                  {stat.label}
                </p>
              </div>

              <p className="text-primary-foreground text-opacity-90 mb-6 leading-relaxed">
                {stat.description}
              </p>

              <ul className="space-y-3">
                {stat.details.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-primary-foreground text-opacity-80">{detail}</span>
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
