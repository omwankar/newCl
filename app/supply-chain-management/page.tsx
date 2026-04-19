import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';

export default function SupplyChainManagementPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-[#0F1923] py-20 text-white">
          <div className="app-container">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Supply Chain Management
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-white/85">
              End-to-end planning, warehousing, transportation, and delivery visibility
              designed to keep your cargo flow predictable and resilient.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="bg-amber-400 text-[#0F1923] hover:bg-amber-500">
                <Link href="/contact">Discuss Your Requirement</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href="/services">Back to Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background py-16 md:py-24">
          <div className="app-container">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              What We Manage
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <article className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold">Demand & Inventory Planning</h3>
                <p className="mt-3 text-muted-foreground">
                  Improve stock levels and replenishment cycles with practical planning models.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold">Multimodal Transportation</h3>
                <p className="mt-3 text-muted-foreground">
                  Coordinate air, sea, and land freight through one operational workflow.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold">Warehousing & Fulfillment</h3>
                <p className="mt-3 text-muted-foreground">
                  Use secure storage and order fulfillment processes to reduce dispatch delays.
                </p>
              </article>
              <article className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-xl font-semibold">Reporting & Visibility</h3>
                <p className="mt-3 text-muted-foreground">
                  Track KPIs and shipment milestones with clear, decision-ready reporting.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
