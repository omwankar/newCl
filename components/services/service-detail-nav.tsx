'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
const NAV_LINKS = [
  { href: '/', label: 'Home', short: 'Home' },
  { href: '/services/air-freight', label: 'Air Freight', short: 'Air' },
  { href: '/services/sea-freight', label: 'Sea Freight', short: 'Sea' },
  { href: '/services/land-transport', label: 'Land Transport', short: 'Land' },
  { href: '/services/warehousing', label: 'Warehousing', short: 'WH' },
  { href: '/services/supply-chain', label: 'Supply Chain', short: 'SCM' },
  { href: '/services/customs-clearance', label: 'Customs', short: 'Customs' },
  { href: '/services', label: 'All Services', short: 'All' },
] as const;

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="group relative px-1 py-2 text-sm font-medium text-[#f0f0f0]/90 transition-colors hover:text-[#f5a623]"
    >
      <span className="relative z-10">{label}</span>
      {active ? (
        <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-[#f5a623]" aria-hidden />
      ) : (
        <span
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#f5a623] transition-transform duration-300 ease-out group-hover:scale-x-100"
          aria-hidden
        />
      )}
    </Link>
  );
}

export function ServiceDetailNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="sd-heading shrink-0 text-xl tracking-wide text-[#f0f0f0] sm:text-2xl">
          Clarusto<span className="text-[#f5a623]">.</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-6" aria-label="Main">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={
                item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href ||
                    (item.href !== '/services' && pathname?.startsWith(item.href))
              }
            />
          ))}
        </nav>

        <Link
          href="/contact"
          className="sd-heading hidden rounded-sm bg-[#f5a623] px-4 py-2 text-sm tracking-wide text-[#0a0a0a] transition-opacity hover:opacity-90 lg:inline-flex"
        >
          Get a Quote
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-white/15 p-2 text-[#f0f0f0] lg:hidden"
          aria-expanded={open}
          aria-controls="sd-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {open && (
        <div
          id="sd-mobile-nav"
          className="border-t border-white/10 bg-[#0a0a0a] px-4 py-4 lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-base text-[#f0f0f0] hover:bg-[#161616] hover:text-[#f5a623]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="sd-heading mt-2 rounded-sm bg-[#f5a623] px-3 py-3 text-center text-[#0a0a0a]"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
