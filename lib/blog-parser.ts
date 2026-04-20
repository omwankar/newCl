export type ParsedBlogSection = {
  heading: string;
  content?: string[];
  list?: string[];
};

export type ParsedBlogFAQ = {
  question: string;
  answer: string;
};

export type ParsedBlog = {
  title: string;
  sections: ParsedBlogSection[];
  faqs: ParsedBlogFAQ[];
};

export function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function stripBulletPrefix(line: string): string {
  return line.replace(/^[-*•]\s+/, '').replace(/^\d+[\).\s-]+/, '').trim();
}

function isHeading(line: string): boolean {
  const text = line.trim();
  if (!text) return false;
  if (text.endsWith(':')) return true;
  if (text.length > 90) return false;
  if (/^(https?:\/\/|source:)/i.test(text)) return false;
  if (/^\d+[\).\s-]+[A-Za-z].{6,}$/.test(text) && !/[.!?]$/.test(text)) return true;
  if (/^[A-Za-z0-9&(),\-\/\s]+$/.test(text) && !/[.!?]$/.test(text)) return true;
  return false;
}

function isListLikeLine(line: string): boolean {
  const text = line.trim();
  if (!text) return false;
  if (/^[-*•]\s+/.test(text)) return true;
  if (/^\d+[\).\s-]+/.test(text)) return true;
  if (text.length > 80) return false;
  if (/[.!?]$/.test(text)) return false;
  if (isHeading(text)) return false;
  const words = text.split(/\s+/).length;
  return words >= 2 && words <= 12;
}

function pushSection(
  sections: ParsedBlogSection[],
  heading: string,
  content: string[],
  list: string[]
) {
  if (content.length === 0 && list.length === 0) return;
  sections.push({
    heading,
    content: content.length > 0 ? content : undefined,
    list: list.length > 0 ? list : undefined,
  });
}

function parseFaqs(lines: string[]): ParsedBlogFAQ[] {
  const faqs: ParsedBlogFAQ[] = [];
  let currentQuestion = '';
  let answerLines: string[] = [];

  const flush = () => {
    if (!currentQuestion) return;
    faqs.push({
      question: currentQuestion.trim(),
      answer: answerLines.join(' ').trim(),
    });
    currentQuestion = '';
    answerLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const questionMatch = line.match(/^\d+\.\s*(.+\?)$/);
    if (questionMatch) {
      flush();
      currentQuestion = questionMatch[1].trim();
      continue;
    }

    if (line.endsWith('?')) {
      flush();
      currentQuestion = line;
      continue;
    }

    answerLines.push(stripBulletPrefix(line));
  }

  flush();
  return faqs;
}

export function parseRawBlogText(rawText: string): ParsedBlog {
  const lines = rawText.split(/\r?\n/).map((line) => line.trim());
  const nonEmpty = lines.filter(Boolean);
  const title = nonEmpty[0] ?? 'Untitled Blog';

  const faqStartIndex = lines.findIndex((line) =>
    /^faqs?/i.test(line.trim())
  );

  const bodyLines =
    faqStartIndex >= 0 ? lines.slice(1, faqStartIndex) : lines.slice(1);
  const faqLines = faqStartIndex >= 0 ? lines.slice(faqStartIndex + 1) : [];

  const sections: ParsedBlogSection[] = [];
  let currentHeading = 'Overview';
  let currentContent: string[] = [];
  let currentList: string[] = [];

  for (const line of bodyLines) {
    if (!line) continue;

    if (isHeading(line)) {
      pushSection(sections, currentHeading, currentContent, currentList);
      currentHeading = line.replace(/:$/, '').trim();
      currentContent = [];
      currentList = [];
      continue;
    }

    if (isListLikeLine(line)) {
      currentList.push(stripBulletPrefix(line));
    } else {
      currentContent.push(line);
    }
  }

  pushSection(sections, currentHeading, currentContent, currentList);
  const faqs = parseFaqs(faqLines);

  return {
    title,
    sections,
    faqs,
  };
}

export const SAMPLE_RAW_BLOG_INPUT = `Future of Last-Mile Logistics in 2026
Introduction:
Last-mile delivery is changing rapidly due to customer expectations and operating costs.
Companies now focus on route optimization and delivery visibility.

Key Trends:
- Real-time tracking for end customers
- Micro-fulfillment in urban areas
- AI-assisted route planning

Operational Challenges
Driver shortages and fuel price volatility continue to affect service levels.
Many operators are redesigning delivery windows to preserve reliability.

FAQs:
1. Why is last-mile delivery expensive?
It includes failed attempts, route inefficiencies, and labor intensity.
2. How can businesses reduce last-mile cost?
Use dynamic routing, delivery slot controls, and localized fulfillment nodes.`;

export const SAMPLE_PARSED_BLOG_JSON = parseRawBlogText(SAMPLE_RAW_BLOG_INPUT);
