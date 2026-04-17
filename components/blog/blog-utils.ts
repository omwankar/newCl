import type { BlogPost } from '@/lib/blogs';

export type BlogSection = {
  id: string;
  label: string;
  paragraphs: string[];
};

const SECTION_LABELS = [
  'Introduction',
  'Key Insights',
  'Deep Dive',
  'Final Thoughts',
  'Takeaways',
];

export function buildBlogSections(content: string[]): BlogSection[] {
  const sections: BlogSection[] = [];
  let cursor = 0;
  let chunkToggle = 0;

  while (cursor < content.length) {
    const chunkSize = chunkToggle % 2 === 0 ? 2 : 3;
    const slice = content.slice(cursor, cursor + chunkSize);
    if (slice.length === 0) break;

    const index = sections.length;
    sections.push({
      id: `blog-section-${index}`,
      label: SECTION_LABELS[index] ?? `Section ${index + 1}`,
      paragraphs: slice,
    });

    cursor += chunkSize;
    chunkToggle += 1;
  }

  return sections;
}

export function getPullQuote(content: string[]): string {
  const source =
    content[3] ??
    'Resilience is no longer optional. Logistics leaders that adapt faster will outperform in uncertain markets.';
  const sentences = source.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length === 0) return source;

  return sentences.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  );
}

export function getAuthorInitials(post: BlogPost): string {
  const parts = post.author.name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'CL';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
