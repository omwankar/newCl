'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'Air Freight', href: '/services/air-freight' },
      { name: 'Sea Freight', href: '/services/sea-freight' },
      { name: 'Land Transport', href: '/services/land-transport' },
      { name: 'Warehousing & Distribution', href: '/services/warehousing' },
      { name: 'Supply Chain Management', href: '/services/supply-chain' },
      { name: 'Customs Clearance', href: '/services/customs-clearance' },
    ],
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Blogs & Insights', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      data-app-nav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? 'rgba(15, 25, 35, 0.75)' : 'rgba(15, 25, 35, 0.95)',
        borderBottomColor: isScrolled ? 'rgba(229, 231, 235, 0.25)' : 'rgba(229, 231, 235, 0.08)',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`sticky top-0 z-50 border-b shadow-sm transition-all duration-300 ease-in-out ${
        isScrolled ? 'backdrop-blur-md' : 'max-md:backdrop-blur-none md:backdrop-blur-sm'
      }`}
    >
      <div
        className={`app-container flex items-center justify-between transition-all duration-300 ease-in-out ${
          isScrolled ? 'h-12 max-h-12 min-h-12 md:h-14' : 'h-14 max-h-14 min-h-14 md:h-16'
        }`}
      >
        <Link
          href="/"
          className="flex min-h-11 min-w-0 shrink-0 touch-manipulation items-center gap-2 py-1"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/clarusto-logo-light.png"
            alt="Clarusto Logistics"
            width={220}
            height={60}
            className="h-10 w-auto max-w-[min(220px,58vw)] md:h-11"
            priority
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                href={item.href}
                data-cursor="nav"
                className="flex min-h-11 cursor-pointer touch-manipulation items-center gap-1 px-3 py-2 text-sm font-medium text-white transition-colors hover:text-amber-500 active:text-amber-400"
              >
                {item.name}
                {'submenu' in item && <ChevronDown className="h-4 w-4" />}
              </Link>

              {'submenu' in item && item.submenu && (
                <div className="invisible absolute left-0 mt-0 w-48 rounded-lg border border-border bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.name}
                      href={subitem.href}
                      data-cursor="nav"
                      className="block min-h-12 cursor-pointer px-4 py-3 text-sm text-foreground first:rounded-t-lg last:rounded-b-lg transition-colors hover:bg-secondary hover:text-secondary-foreground active:bg-secondary/90"
                    >
                      {subitem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/blog#blog-search"
            data-cursor="nav"
            aria-label="Search blog posts"
            className="inline-flex h-11 min-h-11 w-11 min-w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-amber-400 hover:text-amber-400 active:border-amber-500"
          >
            <Search className="h-4 w-4" />
          </Link>
          <Button asChild className="bg-amber-400 hover:bg-amber-500 text-[#0F1923]">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="inline-flex min-h-11 min-w-11 cursor-pointer touch-manipulation items-center justify-center rounded-lg border border-white/10 p-2 text-white hover:bg-white/10 active:bg-white/15 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-panel"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-pointer bg-black/50 touch-manipulation lg:hidden"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-nav-panel"
            className="fixed left-0 right-0 top-14 z-40 max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain touch-scroll border-t border-white/10 bg-[#0F1923] pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden"
          >
            <div className="flex flex-col px-2 py-2">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-white/10 last:border-b-0">
                  {'submenu' in item && item.submenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                        }
                        className="flex min-h-12 w-full touch-manipulation items-center justify-between px-3 py-3 text-left text-base font-medium text-[#f0f0f0]"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            openSubmenu === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openSubmenu === item.name && (
                        <div className="border-t border-white/5 bg-black/20">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className="block min-h-12 cursor-pointer px-5 py-3 text-sm text-[#f0f0f0] active:bg-white/10"
                              onClick={() => setIsOpen(false)}
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex min-h-12 cursor-pointer items-center px-3 py-3 text-base font-medium text-[#f0f0f0] active:bg-white/10"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-3 px-2 pb-2">
                <Button
                  asChild
                  className="h-12 w-full bg-amber-400 text-base text-[#0F1923] hover:bg-amber-500"
                >
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Get a Quote
                  </Link>
                </Button>
                <Link
                  href="/blog#blog-search"
                  className="mt-2 flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border border-white/20 text-sm text-[#f0f0f0]"
                  onClick={() => setIsOpen(false)}
                >
                  <Search className="h-4 w-4" />
                  Search blog
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.nav>
  );
}
