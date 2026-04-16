import type { Metadata } from 'next';
import { SEO } from '@/lib/seo';

export const metadata: Metadata = SEO({
  title: 'About',
  description:
    'Learn about Clarusto Logistics, our history, global offices, and long-standing commitment to trusted logistics operations.',
  url: '/about',
  image: '/clarusto-logo-dark.png',
});

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
