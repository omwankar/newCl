import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { HeroSection } from '@/components/hero-section';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Clock } from 'lucide-react';
import { PRIMARY_CONTACT_PHONE_DISPLAY, PRIMARY_CONTACT_PHONE_HREF } from '@/lib/constants';
import { OfficeLocationsSection } from '@/components/office-locations-section';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactPage() {
  const offices = [
    {
      id: 1,
      flag: '🇬🇧',
      city: 'United Kingdom',
      country: 'Glasgow',
      address: 'Suite 1/4, Park Lane House, 47 Broad Street, Glasgow, G40 2QW',
      phone: PRIMARY_CONTACT_PHONE_DISPLAY,
      email: 'info@clarustologistics.com',
      lat: 55.8609,
      lng: -4.2514,
    },
    {
      id: 2,
      flag: '🇸🇦',
      city: 'Saudi Arabia (Headquarters)',
      country: 'Dammam',
      address: 'Alshifa office #02, Building 8179, Dammam, Saudi Arabia',
      phone: '',
      email: 'info@clarustologistics.com',
      lat: 26.4207,
      lng: 50.0888,
    },
    {
      id: 3,
      flag: '🇩🇪',
      city: 'Germany',
      country: 'Magdeburg',
      address: 'Clarusto GHmP, Regus - Hasselbachplatz Breiter Weg 232A, Magdeburg, 39104',
      phone: '',
      email: '',
      lat: 52.1205,
      lng: 11.6276,
    },
    {
      id: 4,
      flag: '🇮🇳',
      city: 'India',
      country: 'Kerala',
      address: 'MMC/644E5, 1st Floor, Imperial Plaza, Velloorkunnam, Muvattupuzha, Kerala 686673',
      phone: '',
      email: '',
      lat: 9.9834,
      lng: 76.5786,
    },
    {
      id: 5,
      flag: '🇦🇪',
      city: 'Dubai',
      country: 'U.A.E',
      address: 'Clarusto Logistics, P.O BOX 232939, Dubai, U.A.E',
      phone: '',
      email: '',
      lat: 25.2048,
      lng: 55.2708,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        title="Get in Touch"
        subtitle="Contact Us"
        description="Have questions? Our team of logistics experts is ready to help"
        ctaText=""
        backgroundImage="/contact-hero.jpg"
        variant="compact"
      />

      {/* Contact Section */}
      <section className="mobile-section-y bg-background md:py-24">
        <div className="app-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 text-balance">
                  Send us a Message
                </h2>
                <p className="text-muted-foreground text-lg">
                  Share your shipment requirements, destination lanes, and expected timelines. Our team will respond with a practical logistics plan.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card className="bg-white ring-1 ring-border hover:ring-accent/40 transition-all">
                <CardHeader>
                  <CardTitle className="tracking-tight">Quick Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a
                        href={PRIMARY_CONTACT_PHONE_HREF}
                        className="text-muted-foreground text-sm underline-offset-2 hover:underline"
                      >
                        {PRIMARY_CONTACT_PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a
                        href="mailto:info@clarustologistics.com"
                        className="text-muted-foreground text-sm underline-offset-2 hover:underline"
                      >
                        info@clarustologistics.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Hours</p>
                      <p className="text-muted-foreground text-sm">24/7 Support Available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-white ring-1 ring-border hover:ring-accent/40 transition-all">
                <CardHeader>
                  <CardTitle className="text-lg tracking-tight">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We typically respond to inquiries within 2 business hours on working days, and provide escalation support for urgent freight cases.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="mobile-section-y bg-secondary/10 md:py-24">
        <div className="app-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 text-balance">
              Global Offices
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Office network and contact details based on Clarusto&apos;s latest company profile.
            </p>
          </div>

          <OfficeLocationsSection offices={offices} />
        </div>
      </section>

      <section className="mobile-section-y bg-background md:py-24">
        <div className="app-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 text-balance">
              Clarusto in Action
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Snapshot visuals from the Clarusto projects portfolio.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {['/projects/project-30.png', '/projects/project-31.png', '/projects/project-32.png', '/projects/project-33.png'].map(
              (image, idx) => (
                <div key={image} className="relative h-52 rounded-xl overflow-hidden ring-1 ring-border group">
                  <Image
                    src={image}
                    alt={`Project contact showcase ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="mobile-section-y bg-background md:py-24">
        <div className="app-container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 text-balance">
              Need More Information?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Visit our projects and services pages to review capability scope, sectors served, and operational strengths.
            </p>
            <div className="flex flex-col items-stretch justify-center gap-3 text-sm font-medium sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
              <Link
                href="/services"
                className="inline-flex min-h-12 items-center justify-center rounded-md px-4 py-2 text-amber-500 hover:text-amber-600 active:text-amber-700 sm:inline"
              >
                Explore Services
              </Link>
              <Link
                href="/services/supply-chain"
                className="inline-flex min-h-12 items-center justify-center rounded-md px-4 py-2 text-amber-500 hover:text-amber-600 active:text-amber-700 sm:inline"
              >
                Supply Chain Management
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-center rounded-md px-4 py-2 text-amber-500 hover:text-amber-600 active:text-amber-700 sm:inline"
              >
                Learn About Clarusto
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
