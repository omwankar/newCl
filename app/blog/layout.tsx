import type { Metadata } from 'next';
import { SEO } from '@/lib/seo';

export const metadata: Metadata = SEO({
  title:
    'Logistics Blog | Freight, Shipping & Supply Chain Insights | Clarusto Logistics',
  description:
    'Expert insights on freight forwarding, warehousing, air cargo, ocean shipping, and supply chain optimization. Stay updated with the latest logistics industry news.',
  url: '/blog',
  image: '/clarusto-logo-dark.png',
  locale: 'en-GB',
  keywords: [
    'logistics blog',
    'freight shipping',
    'supply chain',
    'warehousing',
    'air cargo',
    'ocean freight',
    'customs',
    'last mile delivery',
  ],
});

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
