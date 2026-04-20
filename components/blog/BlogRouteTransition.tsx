'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function BlogRouteTransition({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        <motion.div
          className="pointer-events-none fixed inset-0 z-[110] flex items-center justify-center bg-[#FF5C00] text-lg font-bold text-[#0F1923]"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          exit={{ x: '0%' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          Clarusto
        </motion.div>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
