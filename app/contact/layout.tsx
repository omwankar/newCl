import type { Metadata } from 'next';
import { SEO } from '@/lib/seo';

export const metadata: Metadata = SEO({
  title: 'Contact',
  description:
    'Contact Clarusto Logistics for global shipping, freight support, and custom logistics planning with our operations team.',
  url: '/contact',
  image: '/clarusto-logo-dark.png',
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
