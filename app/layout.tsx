import type { Metadata, Viewport } from 'next'
import { Poppins, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { OrganizationJsonLd } from '@/components/organization-json-ld'
import { FloatingCallButton } from '@/components/floating-call-button'
import { SEO } from '@/lib/seo'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-brand',
  display: 'swap',
});

const _geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono-ui',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F6F1' },
    { media: '(prefers-color-scheme: dark)', color: '#0F1923' },
  ],
  colorScheme: 'light dark',
}

// Example homepage usage of reusable SEO function.
export const metadata: Metadata = {
  ...SEO({
    title: 'Global Freight & Supply Chain Services',
    description:
      'Clarusto Logistics delivers reliable global transportation, freight forwarding, customs brokerage, and integrated supply chain services tailored for every shipment.',
    url: '/',
    image: '/clarusto-logo-dark.png',
  }),
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Clarusto Logistics',
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth overflow-x-clip ${poppins.variable} ${_geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground min-h-[100dvh] overflow-x-clip text-base leading-relaxed md:leading-normal" suppressHydrationWarning>
        <Script
          id="plausible-analytics"
          strategy="afterInteractive"
          data-domain="clarustologistics.com"
          src="https://plausible.io/js/script.js"
        />
        <OrganizationJsonLd />
        {children}
        <FloatingCallButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
