import { Bebas_Neue, DM_Sans } from 'next/font/google';
import { ServiceDetailNav } from '@/components/services/service-detail-nav';
import { ServiceDetailFooter } from '@/components/services/service-detail-footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-service-body',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-service-heading',
  display: 'swap',
});

export default function ServiceDetailSegmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`sd-root ${dmSans.variable} ${bebasNeue.variable} min-h-screen bg-[#0a0a0a] text-[#f0f0f0]`}
    >
      <ServiceDetailNav />
      {children}
      <ServiceDetailFooter />
    </div>
  );
}
