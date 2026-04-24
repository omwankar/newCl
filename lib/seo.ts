import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Clarusto Logistics',
  domain: 'https://clarustologistics.com',
  defaultTitle: 'Clarusto Logistics | Global Freight & Supply Chain Services',
  description:
    'Clarusto Logistics provides global freight forwarding, transportation services, customs support, and end-to-end supply chain management.',
  ogImage: '/clarusto-logo-dark.png',
  phone: '+44-3300946908',
  email: 'info@clarustologistics.com',
  address: {
    streetAddress: 'Suite 1/4, Park Lane House, 47 Broad Street',
    addressLocality: 'Glasgow',
    postalCode: 'G40 2QW',
    addressCountry: 'GB',
  },
  socialLinks: [
    'https://www.linkedin.com/company/clarusto-logistics',
    'https://www.facebook.com/Clarustologistics',
    'https://www.instagram.com/clarustologistics',
    'https://x.com/ClarLogistics',
    'https://in.pinterest.com/clarustologistics/clarusto-logistics/',
  ],
};

type SeoInput = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, siteConfig.domain).toString();
}

// Reusable SEO function requested by user prompt.
export function SEO({
  title,
  description,
  image = siteConfig.ogImage,
  url = '/',
  noIndex = false,
}: SeoInput): Metadata {
  const seoTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle;
  const seoDescription = description ?? siteConfig.description;
  const canonicalUrl = absoluteUrl(url);
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}

export const seoRoutes = [
  '/',
  '/about',
  '/services',
  '/contact',
  '/projects',
  '/blog',
  '/supply-chain-management',
];
