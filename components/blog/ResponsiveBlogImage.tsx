'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

type ResponsiveBlogImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  mode?: 'cover' | 'contain';
  className?: string;
  sizes?: string;
};

const FALLBACK_IMAGE = '/blog-freight-forwarding-2026.png';

export function ResponsiveBlogImage({
  src,
  alt,
  priority = false,
  mode = 'cover',
  className = '',
  sizes,
}: ResponsiveBlogImageProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = failed ? FALLBACK_IMAGE : src || FALLBACK_IMAGE;
  const resolvedSizes = sizes ?? '100vw';
  const objectModeClass = mode === 'contain' ? 'object-contain' : 'object-cover';
  const blurDataURL = useMemo(
    () =>
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDQwIDI0Ij48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=',
    []
  );

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`.trim()}>
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={resolvedSizes}
        className={objectModeClass}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
