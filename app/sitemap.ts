import type { MetadataRoute } from 'next';
import { absoluteUrl, seoRoutes } from '@/lib/seo';
import { SERVICE_DETAIL_SLUGS } from '@/lib/service-detail-pages';
import { getAllBlogs } from '@/lib/blogs.server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const serviceRoutes = SERVICE_DETAIL_SLUGS.map((slug) => `/services/${slug}`);
  const blogs = await getAllBlogs();
  const blogRoutes = blogs.map((post) => `/blog/${post.slug}`);

  const routes = Array.from(new Set([...seoRoutes, ...serviceRoutes, ...blogRoutes]));

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency:
      route === '/' || route === '/blog' || route.startsWith('/blog/')
        ? 'weekly'
        : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
