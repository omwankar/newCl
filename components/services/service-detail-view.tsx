import Image from 'next/image';
import Link from 'next/link';
import type { ServiceDetailPage } from '@/lib/service-detail-pages';

function accentBarClass(stripe: ServiceDetailPage['accentStripe']) {
  switch (stripe) {
    case 'gold':
      return 'bg-gradient-to-r from-[#f5a623]/80 via-[#ffd166]/60 to-transparent';
    case 'ember':
      return 'bg-gradient-to-r from-[#e85d04]/90 via-[#f5a623]/50 to-transparent';
    default:
      return 'bg-gradient-to-r from-[#f5a623] via-[#f5a623]/60 to-transparent';
  }
}

export function ServiceDetailView({ page }: { page: ServiceDetailPage }) {
  const [p1, p2] = page.paragraphs;

  return (
    <>
      <section className="relative min-h-screen w-full">
        <div className="absolute inset-0">
          <Image
            src={page.heroImage}
            alt={`${page.title} — hero`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/75 via-[#0a0a0a]/82 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 pb-24 pt-28 sm:px-6 lg:px-8">
          <div className={`mb-6 h-1 w-24 rounded-full ${accentBarClass(page.accentStripe)}`} aria-hidden />
          <h1 className="sd-heading max-w-4xl text-5xl uppercase leading-[0.95] tracking-wide text-[#f0f0f0] sm:text-6xl md:text-7xl lg:text-8xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#a0a0a0] sm:text-xl">{page.subheading}</p>
          <Link
            href="/contact"
            className="sd-heading mt-10 inline-flex w-fit items-center justify-center rounded-sm bg-[#f5a623] px-8 py-3 text-lg tracking-wide text-[#0a0a0a] transition-opacity hover:opacity-90"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0a0a] py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-4 sm:px-6">
          <p className="text-base leading-[1.85] text-[#f0f0f0]/95 md:text-lg">{p1}</p>
          <p className="mt-8 text-base leading-[1.85] text-[#f0f0f0]/95 md:text-lg">{p2}</p>
        </div>
      </section>

      <section
        className={`border-t border-white/10 py-16 md:py-24 ${
          page.accentStripe === 'ember' ? 'bg-[#0c0c0c]' : page.accentStripe === 'gold' ? 'bg-[#0b0b0b]' : 'bg-[#0a0a0a]'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="sd-heading text-center text-4xl uppercase tracking-wide text-[#f0f0f0] sm:text-5xl">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[#a0a0a0]">
            Built for operators who need predictable execution and transparent communication.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {page.whyChoose.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-white/10 bg-[#161616] p-6 transition-colors hover:border-[#f5a623]/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f5a623]/15 text-[#f5a623]">
                  <card.Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="sd-heading mt-4 text-xl uppercase tracking-wide text-[#f0f0f0]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#a0a0a0]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#161616] py-16 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">
          <h2 className="sd-heading text-4xl uppercase tracking-wide text-[#f0f0f0] sm:text-5xl">Ready to Ship?</h2>
          <p className="mt-4 max-w-lg text-[#a0a0a0]">
            Tell us about lanes, volumes, and timelines — we will respond with a clear plan and commercial options.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="sd-heading inline-flex rounded-sm bg-[#f5a623] px-8 py-3 text-lg tracking-wide text-[#0a0a0a] hover:opacity-90"
            >
              Contact us
            </Link>
            <Link
              href="/services"
              className="inline-flex rounded-sm border border-white/25 px-6 py-3 text-sm font-medium text-[#f0f0f0] hover:border-[#f5a623] hover:text-[#f5a623]"
            >
              All services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
