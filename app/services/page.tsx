import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ServicesGrid } from '@/components/services-grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVICES, INDUSTRIES } from '@/lib/constants';
import * as Icons from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    if (!IconComponent) return null;
    return <IconComponent className="w-8 h-8 text-accent" />;
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        title="Our Services"
        subtitle="Complete Logistics Solutions"
        description="From air freight to warehousing, we offer comprehensive logistics services tailored to your needs"
        ctaText="Get a Quote"
        ctaHref="/contact"
        backgroundImage="/services-hero.jpg"
        variant="compact"
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Our Service Portfolio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive logistics solutions designed to meet every aspect of your supply chain
            </p>
          </div>

          <ServicesGrid services={SERVICES} variant="list" />
          <div className="mt-10 rounded-xl border border-border bg-card p-6 text-center">
            <h3 className="text-2xl font-bold text-foreground">Need dedicated supply chain support?</h3>
            <p className="mt-2 text-muted-foreground">
              Explore our specialized service page for planning, inventory flow, and multimodal coordination.
            </p>
            <Link href="/services/supply-chain" className="mt-4 inline-block font-semibold text-amber-500 hover:text-amber-600">
              View Supply Chain Management
            </Link>
          </div>
        </div>
      </section>

      {/* Infrastructure & Capabilities */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Infrastructure & Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art facilities and technology supporting global operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Advanced Tracking',
                description: 'Real-time GPS tracking and digital visibility for all shipments worldwide',
              },
              {
                title: 'Secure Warehouses',
                description: 'Climate-controlled, secure facilities across all major regions',
              },
              {
                title: 'Fleet Management',
                description: 'Modern fleet of trucks, ships, and aircraft for optimal logistics',
              },
              {
                title: 'Customs Expertise',
                description: 'Expert customs brokers handling complex international documentation',
              },
              {
                title: 'IT Infrastructure',
                description: 'Robust systems ensuring seamless integration and data security',
              },
              {
                title: 'Green Solutions',
                description: 'Eco-friendly packaging and carbon-neutral shipping options',
              },
            ].map((capability, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{capability.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              Industries We Serve
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized expertise across diverse sectors and industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {INDUSTRIES.map((industry) => (
              <Card key={industry.id} className="hover:shadow-lg transition-shadow text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                    {getIcon(industry.icon)}
                  </div>
                  <h3 className="font-semibold text-foreground">{industry.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
