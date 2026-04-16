import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { OrganizationJsonLd } from '@/components/organization-json-ld'
import { SEO } from '@/lib/seo'
import './globals.css'

const _geist = Geist({ subsets: ["latin"], display: 'swap' });
const _geistMono = Geist_Mono({ subsets: ["latin"], display: 'swap' });

// Example homepage usage of reusable SEO function.
export const metadata: Metadata = {
  ...SEO({
    title: 'Home',
    description:
      'Clarusto Logistics delivers reliable global transportation, freight forwarding, and integrated supply chain services.',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <OrganizationJsonLd />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
