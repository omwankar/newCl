import { absoluteUrl, siteConfig } from '@/lib/seo';

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.domain,
        logo: absoluteUrl('/clarusto-logo-dark.png'),
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: siteConfig.phone,
            contactType: 'customer service',
            email: siteConfig.email,
            areaServed: 'Worldwide',
            availableLanguage: ['English'],
          },
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.address.streetAddress,
          addressLocality: siteConfig.address.addressLocality,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.addressCountry,
        },
        sameAs: siteConfig.socialLinks,
      },
      {
        '@type': 'LocalBusiness',
        name: 'Clarusto Logistics',
        url: siteConfig.domain,
        telephone: '+44330094690',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'GB',
        },
        sameAs: [
          'https://facebook.com/Clarustologistics',
          'https://x.com/ClarLogistics',
          'https://instagram.com/clarustologistics',
          'https://linkedin.com/company/clarusto-logistics',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be rendered as a string in a script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
