'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/services/air-freight', label: 'Air Freight' },
  { href: '/services/sea-freight', label: 'Sea Freight' },
  { href: '/services/land-transport', label: 'Land Transport' },
  { href: '/services/warehousing', label: 'Warehousing & Distribution' },
  { href: '/services/freight-forwarding', label: 'Freight Forwarding' },
  { href: '/services/transportation-management', label: 'Transportation Management' },
  { href: '/services/supply-chain', label: 'Supply Chain Management' },
  { href: '/services/last-mile-delivery', label: 'Last Mile Delivery' },
  { href: '/services/ecommerce-logistics', label: 'E-Commerce Logistics' },
  { href: '/services/reverse-logistics', label: 'Reverse Logistics' },
  { href: '/services/heavy-goods-handling', label: 'Heavy Goods Handling' },
  { href: '/services/customs-brokerage', label: 'Customs Brokerage' },
  { href: '/services', label: 'All Services' },
] as const;

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-11 cursor-pointer touch-manipulation items-center px-1 py-2 text-sm font-medium text-[#f0f0f0]/90 transition-colors hover:text-[#f5a623] active:text-[#f5a623]"
    >
      <span className="relative z-10">{label}</span>
      {active ? (
        <span className="pointer-events-none absolute bottom-1 left-0 h-[2px] w-full bg-[#f5a623]" aria-hidden />
      ) : (
        <span
          className="pointer-events-none absolute bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#f5a623] transition-transform duration-300 ease-out group-hover:scale-x-100 group-active:scale-x-75"
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
    if (!open) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      data-app-nav
      className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/95 max-md:backdrop-blur-none md:backdrop-blur-md"
    >
      <div className="app-container flex h-14 max-h-14 items-center justify-between gap-3 md:h-16 md:max-h-none">
        <Link
          href="/"
          className="sd-heading min-h-11 shrink-0 touch-manipulation text-lg tracking-wide text-[#f0f0f0] sm:text-xl md:text-2xl"
          onClick={() => setOpen(false)}
        >
          Clarusto<span className="text-[#f5a623]">.</span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-5" aria-label="Main">
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
          className="sd-heading hidden min-h-11 cursor-pointer touch-manipulation items-center rounded-sm bg-[#f5a623] px-4 py-2 text-sm tracking-wide text-[#0a0a0a] transition-opacity hover:opacity-90 active:opacity-100 lg:inline-flex"
        >
          Get a Quote
        </Link>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 cursor-pointer touch-manipulation items-center justify-center rounded-md border border-white/15 p-2 text-[#f0f0f0] hover:bg-white/5 active:bg-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="sd-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-pointer bg-black/50 touch-manipulation lg:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            id="sd-mobile-nav"
            className="fixed left-0 right-0 top-14 z-40 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain touch-scroll border-t border-white/10 bg-[#0a0a0a] pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="flex flex-col px-2 py-2">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="min-h-12 cursor-pointer px-3 py-3 text-base text-[#f0f0f0] active:bg-[#161616]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="sd-heading mx-2 mt-2 flex min-h-12 cursor-pointer items-center justify-center rounded-sm bg-[#f5a623] px-3 py-3 text-center text-[#0a0a0a]"
                onClick={() => setOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
