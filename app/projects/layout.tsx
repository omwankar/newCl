import type { Metadata } from 'next';
import { SEO } from '@/lib/seo';

export const metadata: Metadata = SEO({
  title: 'Projects',
  description:
    'Review Clarusto Logistics case studies and project highlights across manufacturing, energy, retail, and healthcare sectors.',
  url: '/projects',
  image: '/clarusto-logo-dark.png',
});

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
