import Link from 'next/link';
import { Fragment } from 'react';

/**
 * Renders plain text with optional [label](/path) markdown links.
 */
export function InlineRichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) {
          const label = m[1];
          const href = m[2];
          if (href.startsWith('/')) {
            return (
              <Link
                key={i}
                href={href}
                className="font-semibold text-amber-600 hover:underline"
              >
                {label}
              </Link>
            );
          }
          return (
            <a
              key={i}
              href={href}
              className="font-semibold text-amber-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
