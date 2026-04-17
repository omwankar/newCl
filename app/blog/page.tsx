import Script from 'next/script';
import { Barlow_Condensed, DM_Sans } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BlogPageClient } from './blog-page-client';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function BlogPage() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Clarusto Logistics Blog',
    url: 'https://www.clarustologistics.com/blog',
    description: 'Insights on freight, shipping, and supply chain',
    publisher: {
      '@type': 'Organization',
      name: 'Clarusto Logistics',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.clarustologistics.com/logo.png',
      },
    },
  };

  return (
    <>
      <Navbar />
      <BlogPageClient
        displayFontClass={barlowCondensed.className}
        bodyFontClass={dmSans.className}
      />
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Footer />
    </>
  );
}
