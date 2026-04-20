import { readFile } from 'node:fs/promises';
import type { BlogPost } from './blogs';

const DEFAULT_AUTHOR: BlogPost['author'] = {
  name: 'Editorial Desk',
  avatar: 'https://i.pravatar.cc/120?img=60',
};

const DEFAULT_IMAGE = '/blog-freight-forwarding-2026.png';
const DEFAULT_CATEGORY = 'Tips & Guides';
const FALLBACK_TAGS = [
  '#Freight',
  '#Logistics',
  '#SupplyChain',
  '#Compliance', 
  '#Trade',
];

const PREDEFINED_TAG_KEYWORDS: Array<{ tag: string; keywords: string[] }> = [
  { tag: '#AI', keywords: ['ai', 'artificial intelligence', 'machine learning'] },
  { tag: '#Automation', keywords: ['automation', 'automated', 'workflow'] },
  { tag: '#DigitalTransformation', keywords: ['digital transformation', 'digitization', 'digital'] },
  { tag: '#Warehouse', keywords: ['warehouse', 'storage', 'inventory'] },
  { tag: '#Inventory', keywords: ['inventory', 'stock', 'replenishment'] },
  { tag: '#SupplyChain', keywords: ['supply chain', 'procurement', 'sourcing'] },
  { tag: '#Freight', keywords: ['freight', 'shipment', 'cargo'] },
  { tag: '#OceanFreight', keywords: ['ocean', 'vessel', 'container', 'port'] },
  { tag: '#AirCargo', keywords: ['air freight', 'air cargo', 'airline'] },
  { tag: '#Customs', keywords: ['customs', 'hs code', 'duty', 'tariff'] },
  { tag: '#Compliance', keywords: ['compliance', 'regulation', 'sanction'] },
  { tag: '#LastMile', keywords: ['last mile', 'delivery', 'courier'] },
  { tag: '#Tracking', keywords: ['tracking', 'visibility', 'real-time'] },
  { tag: '#Sustainability', keywords: ['sustainability', 'carbon', 'emissions'] },
  { tag: '#Ecommerce', keywords: ['e-commerce', 'ecommerce', 'online retail'] },
];

const CATEGORY_KEYWORDS: Array<{ category: string; keywords: string[] }> = [
  {
    category: 'Digital Transformation',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'automation', 'digital'],
  },
  {
    category: 'Inventory',
    keywords: ['warehouse', 'inventory', 'stock', 'replenishment', 'fulfillment'],
  },
  {
    category: 'Supply Chain',
    keywords: ['supply chain', 'procurement', 'sourcing', 'planning'],
  },
  {
    category: 'Freight & Shipping',
    keywords: ['freight', 'shipment', 'shipping', 'container', 'vessel', 'port'],
  },
  {
    category: 'Air Cargo',
    keywords: ['air freight', 'air cargo', 'airline'],
  },
  {
    category: 'Customs & Compliance',
    keywords: ['customs', 'tariff', 'duty', 'compliance', 'regulation'],
  },
  {
    category: 'Tips & Guides',
    keywords: ['guide', 'how to', 'steps', 'best practices', 'tips'],
  },
];

export type ExtractedFaq = {
  question: string;
  answer: string;
};

export type ExtractedStructuredMetadata = {
  title?: string;
  categories: string[];
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  body: string;
};

export type UploadUnderstanding = {
  isLikelyBlog: boolean;
  confidence: number;
  reasons: string[];
  detectedTitle?: string;
};

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
}

export function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

export function normalizeBlogText(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ \u00A0]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function extractTitleFromText(content: string, providedTitle?: string): string {
  if (providedTitle?.trim()) return providedTitle.trim();
  const candidate =
    normalizeBlogText(content)
      .split('\n')
      .map((line) => line.replace(/^#+\s*/, '').trim())
      .find((line) => {
        if (!line) return false;
        if (isDateLine(line)) return false;
        if (isSeoNoiseLine(line)) return false;
        if (isLikelyMetadataHeading(line)) return false;
        if (/^(overview|introduction)$/i.test(line)) return false;
        if (/^[\d\W_]+$/.test(line)) return false;
        return true;
      }) ?? '';
  return candidate || 'Untitled Blog';
}

function normalizeDecoratedLine(line: string): string {
  return line
    .replace(/^[✅🔹⚡👉📂🏷️•\-\s]+/u, '')
    .replace(/^\d+[\).\s-]+/, '')
    .trim();
}

function isDateLine(line: string): boolean {
  return /^(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\s+\d{1,2}\b/i.test(
    line.trim()
  );
}

function isSeoNoiseLine(line: string): boolean {
  const text = line.trim().toLowerCase();
  return (
    text.startsWith('seo strategy dashboard') ||
    text.startsWith('primary keyword:') ||
    text.startsWith('secondary keywords:') ||
    text.startsWith('seo title:') ||
    text.startsWith('meta description:') ||
    text.startsWith('slug:') ||
    text.startsWith('seo tags') ||
    text.startsWith('final article checklist') ||
    text.startsWith('internal link strategy') ||
    text.startsWith('before you hit "publish')
  );
}

function isLikelyMetadataHeading(line: string): boolean {
  const text = line.toLowerCase();
  return (
    text.includes('categories') ||
    text.includes('tags') ||
    text.includes('quick implementation') ||
    text.includes('for each post') ||
    text.includes('sources') ||
    text.includes('compliance references')
  );
}

function parseHeaderField(line: string, label: string): string | null {
  const regex = new RegExp(`^${label}\\s*:\\s*(.+)$`, 'i');
  const match = line.match(regex);
  return match ? match[1].trim() : null;
}

function isInstructionSheetLine(line: string): boolean {
  const text = line.trim().toLowerCase();
  return (
    text.includes('for each post in wordpress') ||
    text.includes('quick implementation') ||
    text.includes('final category + tag setup') ||
    text.includes('remove uncategorized') ||
    text.includes('right panel → categories') ||
    text.includes('click update')
  );
}

export function extractStructuredMetadata(content: string): ExtractedStructuredMetadata {
  const lines = normalizeBlogText(content).split('\n');
  const categories: string[] = [];
  const tags: string[] = [];
  const bodyLines: string[] = [];

  let title: string | undefined;
  let metaTitle: string | undefined;
  let metaDescription: string | undefined;
  let mode: 'body' | 'categories' | 'tags' = 'body';

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (isDateLine(line) || isSeoNoiseLine(line)) continue;

    const lower = line.toLowerCase();
    if (lower.includes('📂 categories') || /^categories\b/i.test(line)) {
      mode = 'categories';
      continue;
    }
    if (lower.includes('🏷️ tags') || /^tags\b/i.test(line)) {
      mode = 'tags';
      continue;
    }
    if (/^_{3,}$/.test(line)) {
      mode = 'body';
      continue;
    }

    const parsedMetaTitle = parseHeaderField(line, 'meta title');
    if (parsedMetaTitle) {
      metaTitle = parsedMetaTitle;
      continue;
    }
    const parsedMetaDescription = parseHeaderField(line, 'meta description');
    if (parsedMetaDescription) {
      metaDescription = parsedMetaDescription;
      continue;
    }
    const parsedCategory = parseHeaderField(line, 'category');
    if (parsedCategory) {
      categories.push(parsedCategory);
      continue;
    }
    const parsedTags = parseHeaderField(line, 'tags');
    if (parsedTags) {
      parsedTags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
        .forEach((tag) => tags.push(tag.startsWith('#') ? tag : `#${tag}`));
      continue;
    }
    const parsedImage = parseHeaderField(line, 'image');
    if (parsedImage) {
      continue;
    }

    if (!title) {
      const candidate = normalizeDecoratedLine(line);
      if (
        candidate &&
        !isLikelyMetadataHeading(candidate) &&
        candidate.length > 12 &&
        !/^for each post/i.test(candidate)
      ) {
        title = candidate;
        continue;
      }
    }

    if (mode === 'categories') {
      const category = normalizeDecoratedLine(line);
      if (category && !isLikelyMetadataHeading(category)) {
        categories.push(category);
      }
      continue;
    }

    if (mode === 'tags') {
      const tagValue = normalizeDecoratedLine(line)
        .replace(/^#+/, '')
        .trim();
      if (tagValue && !isLikelyMetadataHeading(tagValue)) {
        tags.push(tagValue.startsWith('#') ? tagValue : `#${tagValue}`);
      }
      continue;
    }

    bodyLines.push(line);
  }

  const dedupedCategories = Array.from(new Set(categories));
  const dedupedTags = Array.from(new Set(tags)).slice(0, 8);
  const body = normalizeBlogText(bodyLines.join('\n'));

  return {
    title,
    categories: dedupedCategories,
    tags: dedupedTags,
    metaTitle,
    metaDescription,
    body,
  };
}

export function understandUploadContent(
  rawContent: string,
  providedTitle?: string
): UploadUnderstanding {
  const normalized = normalizeBlogText(rawContent);
  const structured = extractStructuredMetadata(normalized);
  const body = structured.body || normalized;
  const title = extractTitleFromText(body, providedTitle ?? structured.title);
  const reasons: string[] = [];
  let confidence = 0;

  const wordCount = body.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 180) {
    confidence += 0.35;
    reasons.push('Content length looks like a full article.');
  } else if (wordCount >= 80) {
    confidence += 0.2;
    reasons.push('Content length is moderate for a short blog.');
  } else {
    reasons.push('Content looks too short for a complete blog post.');
  }

  if (title && title.length >= 12 && !isDateLine(title)) {
    confidence += 0.2;
    reasons.push('Found a valid blog title.');
  } else {
    reasons.push('Could not confidently detect a blog title.');
  }

  const sectionMatches = body.match(/^\d+[\).\s-]+\s*[A-Za-z].+$/gm) ?? [];
  if (sectionMatches.length >= 2 || /(^|\n)(introduction|conclusion)\s*:/i.test(body)) {
    confidence += 0.15;
    reasons.push('Found article-like section structure.');
  }

  const faqCount = extractFaqsFromText(body).length;
  if (faqCount >= 2) {
    confidence += 0.1;
    reasons.push('Detected FAQ style content.');
  }

  const instructionHits = normalized
    .split('\n')
    .filter((line) => isInstructionSheetLine(line)).length;
  if (instructionHits > 0) {
    confidence -= 0.4;
    reasons.push('Looks like setup/instruction text, not a single blog article.');
  }

  if (isSeoNoiseLine(normalized.toLowerCase())) {
    confidence -= 0.05;
  }

  confidence = Math.max(0, Math.min(1, confidence));
  return {
    isLikelyBlog: confidence >= 0.35,
    confidence,
    reasons,
    detectedTitle: title,
  };
}

export function extractFaqsFromText(content: string): ExtractedFaq[] {
  const lines = normalizeBlogText(content)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const faqs: ExtractedFaq[] = [];
  let currentQuestion = '';
  let answerLines: string[] = [];

  const flush = () => {
    if (!currentQuestion || answerLines.length === 0) return;
    faqs.push({
      question: currentQuestion,
      answer: answerLines.join(' ').trim(),
    });
    currentQuestion = '';
    answerLines = [];
  };

  for (const line of lines) {
    const numberedQuestionWithAnswer = line.match(
      /^\d+[\).\s-]+(.+?\?)\s+(.+)$/
    );
    if (numberedQuestionWithAnswer) {
      flush();
      faqs.push({
        question: numberedQuestionWithAnswer[1].trim(),
        answer: numberedQuestionWithAnswer[2].trim(),
      });
      continue;
    }

    const numberedQuestion = line.match(/^\d+[\).\s-]+(.+\?)$/);
    if (numberedQuestion) {
      flush();
      currentQuestion = numberedQuestion[1].trim();
      continue;
    }

    if (/^(q:|question:)\s*/i.test(line) && line.endsWith('?')) {
      flush();
      currentQuestion = line.replace(/^(q:|question:)\s*/i, '').trim();
      continue;
    }

    if (/^(a:|answer:)\s*/i.test(line)) {
      if (currentQuestion) {
        answerLines.push(line.replace(/^(a:|answer:)\s*/i, '').trim());
      }
      continue;
    }

    if (currentQuestion) {
      if (isSeoNoiseLine(line)) {
        flush();
        continue;
      }
      answerLines.push(line);
    }
  }

  flush();
  return faqs.slice(0, 8);
}

export function extractExcerpt(text: string): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  const words = cleaned.split(' ').filter(Boolean);
  const excerptWords = words.slice(0, 24);
  const excerpt = excerptWords.join(' ');
  return words.length > excerptWords.length ? `${excerpt}...` : excerpt;
}

function looksLikeHeading(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.endsWith(':')) return true;
  if (/^[A-Z0-9\s&\-/,()]{4,}$/.test(trimmed) && /[A-Z]/.test(trimmed)) {
    return true;
  }
  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount <= 8 && !/[.!?]$/.test(trimmed)) {
    return true;
  }
  return false;
}

export function splitIntoParagraphs(content: string): string[] {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const paragraphs: string[] = [];
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length === 0) return;
    paragraphs.push(buffer.join(' ').trim());
    buffer = [];
  };

  for (const line of lines) {
    if (looksLikeHeading(line)) {
      flush();
      paragraphs.push(line);
      continue;
    }
    buffer.push(line);
  }

  flush();
  return paragraphs;
}

function generateTags(title: string, content: string): string[] {
  const source = `${title} ${content}`.toLowerCase();
  const matchedPredefined = PREDEFINED_TAG_KEYWORDS.filter(({ keywords }) =>
    keywords.some((keyword) => source.includes(keyword))
  ).map(({ tag }) => tag);
  if (matchedPredefined.length >= 3) {
    return Array.from(new Set(matchedPredefined)).slice(0, 5);
  }

  const tokens = source.match(/[a-z]{4,}/g) ?? [];
  const stopWords = new Set([
    'that',
    'this',
    'with',
    'from',
    'have',
    'your',
    'into',
    'will',
    'their',
    'there',
    'about',
    'through',
    'which',
    'what',
    'when',
    'where',
    'while',
    'could',
    'should',
    'would',
    'more',
    'than',
    'they',
    'them',
    'were',
    'been',
    'also',
    'just',
  ]);

  const counts = new Map<string, number>();
  for (const token of tokens) {
    if (stopWords.has(token)) continue;
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  const picked = Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word]) => `#${word[0].toUpperCase()}${word.slice(1)}`);

  if (picked.length >= 3) return picked;
  return FALLBACK_TAGS.slice(0, Math.max(3, picked.length));
}

export function detectCategory(title: string, content: string): string {
  const source = `${title} ${content}`.toLowerCase();
  const scored = CATEGORY_KEYWORDS.map((rule) => {
    const score = rule.keywords.reduce(
      (acc, keyword) => acc + (source.includes(keyword) ? 1 : 0),
      0
    );
    return { category: rule.category, score };
  }).sort((a, b) => b.score - a.score);

  if (scored[0] && scored[0].score > 0) return scored[0].category;
  return DEFAULT_CATEGORY;
}

export function generateBlogPost(input: {
  title?: string;
  content: string;
  category?: string;
  image?: string;
  tags?: string[];
  faqs?: ExtractedFaq[];
}): BlogPost {
  const normalizedContent = normalizeBlogText(input.content);
  const structured = extractStructuredMetadata(normalizedContent);
  const resolvedTitle = extractTitleFromText(
    structured.body || normalizedContent,
    input.title ?? structured.title
  );
  const id = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const slug = generateSlug(resolvedTitle);
  const articleBody = structured.body || normalizedContent;
  const content = splitIntoParagraphs(articleBody);
  const excerpt = extractExcerpt(articleBody);
  const readTime = calculateReadTime(articleBody);
  const date = formatDate(new Date());
  const tags =
    (
      input.tags?.length
        ? input.tags
        : structured.tags.length > 0
        ? structured.tags
        : generateTags(resolvedTitle, articleBody)
    ).slice(0, 5);
  const faqs = input.faqs ?? extractFaqsFromText(articleBody);
  const faqBlock =
    faqs.length > 0
      ? `\n\nFAQs:\n${faqs
          .map((faq, index) => `${index + 1}. ${faq.question}\n${faq.answer}`)
          .join('\n\n')}`
      : '';
  const rawText = `${resolvedTitle}\n\n${articleBody}${faqBlock}`.trim();
  const resolvedMetaDescription =
    structured.metaDescription ?? extractExcerpt(articleBody).slice(0, 160);
  const resolvedMetaTitle = structured.metaTitle ?? `${resolvedTitle} | Clarusto Logistics`;

  return {
    id,
    slug,
    title: resolvedTitle,
    excerpt,
    content,
    rawText,
    metaTitle: resolvedMetaTitle,
    metaDescription: resolvedMetaDescription,
    date,
    readTime,
    category:
      input.category?.trim() ||
      structured.categories[0] ||
      detectCategory(resolvedTitle, articleBody),
    image: input.image?.trim() || DEFAULT_IMAGE,
    author: DEFAULT_AUTHOR,
    tags,
  };
}

export async function addBlogFromPDF(filePath: string): Promise<BlogPost> {
  const { PDFParse } = await import('pdf-parse');
  const buffer = await readFile(filePath);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();
  const lines = result.text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const title = extractTitleFromText(lines.join('\n'));
  const content = lines.slice(1).join('\n');
  return generateBlogPost({ title, content, category: 'PDF Imports' });
}
