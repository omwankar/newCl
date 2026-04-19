import Link from 'next/link';

const FOOTER_SERVICES = [
  { href: '/services/air-freight', label: 'Air Freight' },
  { href: '/services/sea-freight', label: 'Sea Freight' },
  { href: '/services/land-transport', label: 'Land Transport' },
  { href: '/services/warehousing', label: 'Warehousing' },
  { href: '/services/supply-chain', label: 'Supply Chain' },
  { href: '/services/customs-clearance', label: 'Customs' },
] as const;

export function ServiceDetailFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] py-14 text-[#a0a0a0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="sd-heading text-2xl tracking-wide text-[#f0f0f0]">
              Clarusto Logistics
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Global freight forwarding, warehousing, and supply chain execution with a single accountable team.
            </p>
          </div>
          <div>
            <p className="sd-heading text-sm tracking-widest text-[#f5a623]">Services</p>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="hover:text-[#f5a623]">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="sd-heading text-sm tracking-widest text-[#f5a623]">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-[#f5a623]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#f5a623]">
                  All services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#f5a623]">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#f5a623]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="sd-heading text-sm tracking-widest text-[#f5a623]">Get started</p>
            <p className="mt-4 text-sm leading-relaxed">
              Request a quote for lane analysis, lead times, and integrated handling.
            </p>
            <Link
              href="/contact"
              className="sd-heading mt-4 inline-block rounded-sm border border-[#f5a623] px-4 py-2 text-sm tracking-wide text-[#f5a623] hover:bg-[#f5a623] hover:text-[#0a0a0a]"
            >
              Contact us
            </Link>
          </div>
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-[#a0a0a0]">
          © {new Date().getFullYear()} Clarusto Logistics. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
