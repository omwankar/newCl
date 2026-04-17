import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title:
    'Logistics Blog | Freight, Shipping & Supply Chain Insights | Clarusto Logistics',
  description:
    'Expert insights on freight forwarding, warehousing, air cargo, ocean shipping, and supply chain optimization. Stay updated with the latest logistics industry news.',
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
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
  openGraph: {
    type: 'website',
    title: 'Logistics Blog | Freight & Supply Chain Insights',
    description:
      'Expert insights on freight forwarding, shipping, and logistics.',
    images: [absoluteUrl('/clarusto-logo-dark.png')],
    url: absoluteUrl('/blog'),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logistics Blog | Freight & Supply Chain Insights',
    description:
      'Expert logistics tips, industry news, and shipping guides.',
    images: [absoluteUrl('/clarusto-logo-dark.png')],
  },
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
