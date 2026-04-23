import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { ServiceDetailFooter } from '@/components/services/service-detail-footer';

export default function ServiceDetailSegmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="sd-root min-h-screen bg-[#0a0a0a] text-[#f0f0f0]">
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
}
