import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaPinterestP,
} from 'react-icons/fa6';
import { OFFICES, PRIMARY_CONTACT_PHONE_DISPLAY, PRIMARY_CONTACT_PHONE_HREF } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-[#0F1923] text-white">
      <div className="app-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Image
                src="/clarusto-logo-light.png"
                alt="Clarusto Logistics"
                width={210}
                height={58}
                className="h-12 w-auto max-w-[210px]"
              />
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Your trusted global logistics partner for seamless deliveries and comprehensive shipping solutions.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/company/clarusto-logistics" className="hover:text-amber-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="h-5 w-5" />
              </Link>
              <Link href="https://www.facebook.com/Clarustologistics" className="hover:text-amber-500 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/clarustologistics" className="hover:text-amber-500 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/ClarLogistics" className="hover:text-amber-500 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <FaXTwitter className="h-5 w-5" />
              </Link>
              <Link href="https://in.pinterest.com/clarustologistics/clarusto-logistics/" className="hover:text-amber-500 transition-colors" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                <FaPinterestP className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/air-freight" className="hover:text-amber-500 transition-colors">
                  Air Freight
                </Link>
              </li>
              <li>
                <Link href="/services/sea-freight" className="hover:text-amber-500 transition-colors">
                  Sea Freight
                </Link>
              </li>
              <li>
                <Link href="/services/land-transport" className="hover:text-amber-500 transition-colors">
                  Land Transport
                </Link>
              </li>
              <li>
                <Link href="/services/warehousing" className="hover:text-amber-500 transition-colors">
                  Warehousing
                </Link>
              </li>
              <li>
                <Link href="/services/supply-chain" className="hover:text-amber-500 transition-colors">
                  Supply Chain
                </Link>
              </li>
              <li>
                <Link href="/services/customs-clearance" className="hover:text-amber-500 transition-colors">
                  Customs Clearance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href={PRIMARY_CONTACT_PHONE_HREF} className="underline-offset-2 hover:underline">
                  {PRIMARY_CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>info@clarustologistics.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Global Operations</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Offices */}
        <div className="border-t border-primary-foreground border-opacity-20 pt-8 mb-8">
          <h4 className="font-semibold mb-6">Global Offices</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-sm">
            {OFFICES.map((office) => (
              <div key={office.id}>
                <h5 className="font-semibold text-amber-500 mb-1">
                  {office.flag ? `${office.flag} ` : ''}{office.city}
                </h5>
                <p className="opacity-90">{office.country}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground border-opacity-20 pt-8 text-center text-sm opacity-75">
          <p>
            &copy; 2025 Clarusto Logistics. All rights reserved. |{' '}
            <Link href="#" className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </Link>{' '}
            | Privacy Policy{' '}
            <Link href="#" className="hover:text-amber-500 transition-colors">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
