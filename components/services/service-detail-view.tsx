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
            sizes="(max-width: 768px) 100vw, min(1600px, 100vw)"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/75 via-[#0a0a0a]/82 to-[#0a0a0a]" />
        </div>

        <div className="app-container relative z-10 flex min-h-screen max-w-5xl flex-col justify-center pb-20 pt-24 md:pb-24 md:pt-28">
          <div className={`mb-6 h-1 w-24 max-w-[min(6rem,30vw)] rounded-full ${accentBarClass(page.accentStripe)}`} aria-hidden />
          <h1 className="sd-heading max-w-4xl text-[clamp(2rem,8vw,4.5rem)] uppercase leading-[0.95] tracking-wide text-[#f0f0f0]">
            {page.title}
          </h1>
          <p className="text-body-fluid mt-6 max-w-xl text-[#a0a0a0]">{page.subheading}</p>
          <Link
            href="/contact"
            className="sd-heading mt-10 inline-flex min-h-12 w-fit cursor-pointer touch-manipulation items-center justify-center rounded-sm bg-[#f5a623] px-6 py-3 text-base tracking-wide text-[#0a0a0a] transition-opacity hover:opacity-90 active:opacity-100 md:px-8 md:text-lg"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      <section className="mobile-section-y border-t border-white/10 bg-[#0a0a0a] md:py-24">
        <div className="app-container max-w-[800px]">
          <p className="text-body-fluid leading-[1.85] text-[#f0f0f0]/95 md:text-lg">{p1}</p>
          <p className="text-body-fluid mt-8 leading-[1.85] text-[#f0f0f0]/95 md:text-lg">{p2}</p>
        </div>
      </section>

      <section
        className={`mobile-section-y border-t border-white/10 md:py-24 ${
          page.accentStripe === 'ember' ? 'bg-[#0c0c0c]' : page.accentStripe === 'gold' ? 'bg-[#0b0b0b]' : 'bg-[#0a0a0a]'
        }`}
      >
        <div className="app-container max-w-6xl">
          <h2 className="sd-heading text-center text-heading-fluid uppercase tracking-wide text-[#f0f0f0]">
            Why Choose Us
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-body-fluid text-[#a0a0a0]">
            Built for operators who need predictable execution and transparent communication.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-12 md:grid-cols-3">
            {page.whyChoose.map((card) => (
              <div
                key={card.title}
                className="mobile-card-pad mobile-radius rounded-xl border border-white/10 bg-[#161616] p-4 transition-colors hover:border-[#f5a623]/40 active:border-[#f5a623]/50 md:p-6"
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

      <section className="mobile-section-y border-t border-white/10 bg-[#161616] md:py-20">
        <div className="app-container flex max-w-4xl flex-col items-center text-center">
          <h2 className="sd-heading text-heading-fluid uppercase tracking-wide text-[#f0f0f0]">Ready to Ship?</h2>
          <p className="text-body-fluid mt-4 max-w-lg text-[#a0a0a0]">
            Tell us about lanes, volumes, and timelines — we will respond with a clear plan and commercial options.
          </p>
          <div className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
            <Link
              href="/contact"
              className="sd-heading inline-flex min-h-12 cursor-pointer touch-manipulation items-center justify-center rounded-sm bg-[#f5a623] px-6 py-3 text-base tracking-wide text-[#0a0a0a] hover:opacity-90 active:opacity-100 md:text-lg"
            >
              Contact us
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-12 cursor-pointer touch-manipulation items-center justify-center rounded-sm border border-white/25 px-6 py-3 text-sm font-medium text-[#f0f0f0] hover:border-[#f5a623] hover:text-[#f5a623] active:border-[#f5a623]"
            >
              All services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
