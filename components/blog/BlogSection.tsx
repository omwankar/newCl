import type { ParsedBlogSection } from '@/lib/blog-parser';

type BlogSectionProps = {
  section: ParsedBlogSection;
};

export function BlogSection({ section }: BlogSectionProps) {
  return (
    <section className="bg-white rounded-2xl border border-border p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#0A1628] mb-4">{section.heading}</h2>

      {section.content?.map((paragraph, index) => (
        <p
          key={`${section.heading}-p-${index}`}
          className="text-base md:text-lg text-foreground/90 leading-loose mb-4 last:mb-0"
        >
          {paragraph}
        </p>
      ))}

      {section.list && section.list.length > 0 && (
        <ul className="mt-3 list-disc pl-6 space-y-2 text-base md:text-lg text-foreground/90">
          {section.list.map((item, index) => (
            <li key={`${section.heading}-li-${index}`}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
