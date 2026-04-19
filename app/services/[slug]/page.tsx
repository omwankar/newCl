import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  SERVICE_DETAIL_PAGES,
  SERVICE_DETAIL_SLUGS,
  isServiceDetailSlug,
} from '@/lib/service-detail-pages';
import { ServiceDetailView } from '@/components/services/service-detail-view';
import { SEO } from '@/lib/seo';

export function generateStaticParams() {
  return SERVICE_DETAIL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isServiceDetailSlug(slug)) {
    return { title: 'Service' };
  }
  const page = SERVICE_DETAIL_PAGES[slug];
  return SEO({
    title: page.title,
    description: page.metaDescription,
    url: `/services/${slug}`,
    image: '/clarusto-logo-dark.png',
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isServiceDetailSlug(slug)) {
    notFound();
  }

  const page = SERVICE_DETAIL_PAGES[slug];
  return <ServiceDetailView page={page} />;
}
