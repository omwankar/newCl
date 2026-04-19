'use client';

interface Partner {
  id: string;
  name: string;
  category: string;
}

const partners: Partner[] = [
  { id: '1', name: 'SAUDI ARAMCO', category: 'Energy' },
  { id: '2', name: 'SAMSUNG', category: 'Electronics' },
  { id: '3', name: 'ISCO (A SIEMENS COMPANY)', category: 'Industrial' },
  { id: '4', name: 'GWC', category: 'Manufacturing' },
  { id: '5', name: 'SABIC', category: 'Chemicals' },
  { id: '6', name: 'AL KHODARI (AK)', category: 'Construction' },
  { id: '7', name: 'CENTREPOINT', category: 'Retail' },
  { id: '8', name: 'GAC', category: 'Shipping' },
  { id: '9', name: 'MOHAMMED AL-MOJIL GROUP', category: 'Distribution' },
];

export function PartnersSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="app-container">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We&apos;re proud to work with industry leaders and innovative companies across various sectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="group relative bg-card p-8 rounded-lg border border-border hover:border-accent transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fadeInUp flex flex-col items-center justify-center min-h-32"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300"></div>
              
              <div className="relative z-10 text-center">
                <p className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {partner.name}
                </p>
                <p className="text-sm text-muted-foreground mt-2">{partner.category}</p>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
