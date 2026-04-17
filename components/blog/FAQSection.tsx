import type { ParsedBlogFAQ } from '@/lib/blog-parser';

type FAQSectionProps = {
  faqs: ParsedBlogFAQ[];
};

export function FAQSection({ faqs }: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="bg-white rounded-2xl border border-border p-6 md:p-8">
      <h2 className="text-2xl font-bold text-[#0A1628] mb-5">Frequently Asked Questions</h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details
            key={`${faq.question}-${index}`}
            className="group border border-border rounded-xl p-4 open:bg-[#FFF7F2]"
          >
            <summary className="cursor-pointer list-none font-semibold text-[#0A1628]">
              {faq.question}
            </summary>
            <p className="mt-3 text-base text-foreground/90 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
