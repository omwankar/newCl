'use client';

import { motion, useSpring, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type CursorVariant = 'default' | 'card' | 'nav';

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const springX = useSpring(cursorPos.x, { stiffness: 150, damping: 15 });
  const springY = useSpring(cursorPos.y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(pointer: coarse)');
    const sync = () => setIsCoarse(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener('change', sync);
    return () => mediaQuery.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (isCoarse || prefersReducedMotion) return;

    const move = (e: MouseEvent) => {
      setVisible(true);
      setCursorPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-cursor="card"]')) {
        setVariant('card');
        return;
      }
      if (target.closest('[data-cursor="nav"]')) {
        setVariant('nav');
        return;
      }
      setVariant('default');
    };

    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, [isCoarse, prefersReducedMotion]);

  const ringVariants = useMemo(() => {
    if (variant === 'card') {
      return { width: 80, height: 80, scaleX: 1, scaleY: 1 };
    }
    if (variant === 'nav') {
      return { width: 40, height: 40, scaleX: 2, scaleY: 0.5 };
    }
    return { width: 40, height: 40, scaleX: 1, scaleY: 1 };
  }, [variant]);

  if (isCoarse || prefersReducedMotion) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] h-2 w-2 rounded-full bg-white mix-blend-difference"
        animate={{ x: cursorPos.x - 4, y: cursorPos.y - 4, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.04, ease: 'linear' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[119] flex items-center justify-center rounded-full border border-white/90 text-[10px] font-semibold uppercase tracking-wide text-white mix-blend-difference"
        style={{ x: springX, y: springY }}
        animate={{
          x: cursorPos.x - ringVariants.width / 2,
          y: cursorPos.y - ringVariants.height / 2,
          opacity: visible ? 1 : 0,
          width: ringVariants.width,
          height: ringVariants.height,
          scaleX: ringVariants.scaleX,
          scaleY: ringVariants.scaleY,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      >
        {variant === 'card' ? 'Read →' : ''}
      </motion.div>
    </>
  );
}
