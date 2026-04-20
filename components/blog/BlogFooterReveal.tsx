'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function BlogFooterReveal({ children }: { children: React.ReactNode }) {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined' || !footerRef.current) return;
      gsap.fromTo(
        footerRef.current,
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
          },
        }
      );
    },
    { scope: footerRef }
  );

  return <div ref={footerRef}>{children}</div>;
}
