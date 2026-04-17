'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'Air Freight', href: '/services#air-freight' },
      { name: 'Sea Freight', href: '/services#sea-freight' },
      { name: 'Land Transport', href: '/services#land-transport' },
      { name: 'Warehousing & Distribution', href: '/services#warehousing' },
      { name: 'Supply Chain Management', href: '/supply-chain-management' },
      { name: 'Customs Clearance', href: '/services#customs-clearance' },
    ],
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Blogs & Insights', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-[#0F1923]/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/clarusto-logo-light.png"
              alt="Clarusto Logistics"
              width={164}
              height={45}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-white hover:text-amber-500 transition-colors flex items-center gap-1"
                >
                  {item.name}
                  {'submenu' in item && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Submenu */}
                {'submenu' in item && item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-secondary-foreground first:rounded-t-lg last:rounded-b-lg transition-colors"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/blog#blog-search"
              aria-label="Search blog posts"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-white/20 text-white hover:border-amber-400 hover:text-amber-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </Link>
            <Button
              asChild
              className="bg-amber-400 hover:bg-amber-500 text-[#0F1923]"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            {navigation.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() =>
                    setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                  }
                  className="w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:text-amber-500 transition-colors flex items-center justify-between"
                >
                  {item.name}
                  {'submenu' in item && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openSubmenu === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {'submenu' in item &&
                  item.submenu &&
                  openSubmenu === item.name && (
                    <div className="bg-muted">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-6 py-2 text-sm text-foreground hover:text-amber-500 transition-colors"
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            ))}
            <div className="px-3 py-2 pt-4 border-t border-border">
              <Button
                asChild
                className="w-full bg-amber-400 hover:bg-amber-500 text-[#0F1923]"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
