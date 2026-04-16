import type { Metadata } from 'next';
import { SEO } from '@/lib/seo';

export const metadata: Metadata = SEO({
  title: 'Supply Chain Management',
  description:
    'Clarusto supply chain management services improve planning, transportation, and warehousing for reliable global delivery.',
  url: '/supply-chain-management',
  image: '/clarusto-logo-dark.png',
});

export default function SupplyChainManagementLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
