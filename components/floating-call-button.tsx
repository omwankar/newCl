'use client';

import { Phone } from 'lucide-react';
import { PRIMARY_CONTACT_PHONE_DISPLAY, PRIMARY_CONTACT_PHONE_HREF } from '@/lib/constants';

export function FloatingCallButton() {
  return (
    <a
      href={PRIMARY_CONTACT_PHONE_HREF}
      aria-label={`Call ${PRIMARY_CONTACT_PHONE_DISPLAY}`}
      title={`Call ${PRIMARY_CONTACT_PHONE_DISPLAY}`}
      className="fixed bottom-20 right-6 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-[#0F1923] shadow-lg transition-transform hover:scale-105 hover:bg-amber-500 md:bottom-6"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
