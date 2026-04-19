import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function ProjectsPage() {
  const caseStudies = [
    {
      id: 1,
      title: 'Heavy Industry Route Stabilization',
      category: 'Manufacturing & Heavy Industry',
      description:
        'Planned and executed multimodal deliveries for high-weight industrial consignments with documented customs support and controlled handover windows.',
      result: 'Lower transit variation across complex lanes',
      image: '/projects/project-21.png',
    },
    {
      id: 2,
      title: 'Oil & Gas Mission-Critical Movements',
      category: 'Oil & Gas',
      description:
        'Delivered time-bound energy-sector cargo with strict checkpoint compliance, route planning, and real-time operational visibility.',
      result: 'Improved schedule reliability for critical loads',
      image: '/projects/project-22.png',
    },
    {
      id: 3,
      title: 'Retail & E-commerce Fulfillment Upgrade',
      category: 'Retail & E-commerce',
      description:
        'Connected warehousing, cross-border freight, and regional distribution to support scalable order volumes for retail growth.',
      result: 'Faster dispatch and tighter fulfillment consistency',
      image: '/projects/project-23.png',
    },
    {
      id: 4,
      title: 'FMCG Distribution Network Alignment',
      category: 'FMCG',
      description:
        'Built a repeatable replenishment flow across regional hubs with frequent shipment cycles and service-level tracking.',
      result: 'Reduced stockout risk across delivery regions',
      image: '/projects/project-24.png',
    },
    {
      id: 5,
      title: 'Automotive Components Corridor',
      category: 'Automotive',
      description:
        'Coordinated road, sea, and warehouse interfaces for recurring component movements with predictable ETA performance.',
      result: 'Higher delivery precision for production timelines',
      image: '/projects/project-25.png',
    },
    {
      id: 6,
      title: 'Pharma & Healthcare Handling Program',
      category: 'Pharmaceuticals & Healthcare',
      description:
        'Executed controlled handling workflows and compliant documentation for sensitive healthcare and regulated shipments.',
      result: 'Stronger compliance confidence and shipment traceability',
      image: '/projects/project-26.png',
    },
  ];

  const projectGallery = Array.from({ length: 12 }, (_, i) => `/projects/project-${String(27 + i).padStart(2, '0')}.png`);

  const industries = [
    'Manufacturing & Heavy Industry',
    'FMCG (Fast-Moving Consumer Goods)',
    'Agriculture & Food Supply',
    'Oil & Gas',
    'Retail & E-commerce',
    'Automotive',
    'Pharmaceuticals & Healthcare',
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        title="Our Success Stories"
        subtitle="Case Studies"
        description="Real-world examples of how we&apos;ve transformed logistics for leading businesses"
        ctaText=""
        backgroundImage="/projects-hero.jpg"
        variant="compact"
      />

      {/* Case Studies Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="app-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 text-balance">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our logistics project showcase from Clarusto&apos;s field operations, infrastructure capability, and cross-border execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <Card
                key={study.id}
                className="bg-white ring-1 ring-border hover:ring-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="px-3 py-1 bg-amber-400 text-[#0F1923] rounded-full text-xs font-semibold">
                      {study.category}
                    </span>
                  </div>
                  <CardTitle className="tracking-tight">{study.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground leading-loose mb-4">{study.description}</p>
                  <div className="bg-secondary/20 border border-secondary rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Key Result</p>
                    <p className="font-bold text-amber-500">{study.result}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="app-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 text-amber-400">2000+</div>
              <p className="text-sm md:text-base opacity-90">Successful Projects</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 text-amber-400">98%</div>
              <p className="text-sm md:text-base opacity-90">Customer Satisfaction</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 text-amber-400">30+</div>
              <p className="text-sm md:text-base opacity-90">Years of Logistics Trust</p>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold mb-2 text-amber-400">100+</div>
              <p className="text-sm md:text-base opacity-90">Global Partners</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="app-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 text-balance">
              Project Image Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selected visuals sourced from the Clarusto portfolio deck.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projectGallery.map((image, idx) => (
              <div key={image} className="relative h-64 rounded-xl overflow-hidden ring-1 ring-border group">
                <Image
                  src={image}
                  alt={`Clarusto project visual ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="app-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 text-balance">
              Industries We Serve
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sector coverage based on the company profile and project scope.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Card
                key={industry}
                className="bg-white ring-1 ring-border hover:ring-accent/40 hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <p className="font-semibold text-foreground text-lg">{industry}</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Specialized logistics solutions for {industry.toLowerCase()}.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="app-container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6 text-balance">
            Ready for Your Success Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you optimize your logistics and supply chain.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-amber-400 hover:bg-amber-500 text-[#0F1923]"
          >
            <Link href="/contact" className="flex items-center gap-2">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
}
