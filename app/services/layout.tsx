import type { Metadata } from 'next';
import { SEO } from '@/lib/seo';

export const metadata: Metadata = SEO({
  title: 'Services',
  description:
    'Explore Clarusto Logistics services including freight forwarding, warehousing, customs handling, and supply chain management.',
  url: '/services',
  image: '/clarusto-logo-dark.png',
});

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
