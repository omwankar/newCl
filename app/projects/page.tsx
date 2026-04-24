import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function ProjectsPage() {
  const caseStudies = [
    {
      id: 1,
      title: 'Heavy Industry Route Stabilization',
      category: 'Manufacturing & Heavy Industry',
      description:
        'Planned and executed multimodal deliveries for high-weight industrial consignments with documented customs support and controlled handover windows.',
      result: 'Lower transit variation across complex lanes',
      image: '/projects/project-21.png',
      index: '01',
    },
    {
      id: 2,
      title: 'Oil & Gas Mission-Critical Movements',
      category: 'Oil & Gas',
      description:
        'Delivered time-bound energy-sector cargo with strict checkpoint compliance, route planning, and real-time operational visibility.',
      result: 'Improved schedule reliability for critical loads',
      image: '/projects/project-22.png',
      index: '02',
    },
    {
      id: 3,
      title: 'Retail & E-commerce Fulfillment Upgrade',
      category: 'Retail & E-commerce',
      description:
        'Connected warehousing, cross-border freight, and regional distribution to support scalable order volumes for retail growth.',
      result: 'Faster dispatch and tighter fulfillment consistency',
      image: '/projects/project-23.png',
      index: '03',
    },
    {
      id: 4,
      title: 'FMCG Distribution Network Alignment',
      category: 'FMCG',
      description:
        'Built a repeatable replenishment flow across regional hubs with frequent shipment cycles and service-level tracking.',
      result: 'Reduced stockout risk across delivery regions',
      image: '/projects/project-24.png',
      index: '04',
    },
    {
      id: 5,
      title: 'Automotive Components Corridor',
      category: 'Automotive',
      description:
        'Coordinated road, sea, and warehouse interfaces for recurring component movements with predictable ETA performance.',
      result: 'Higher delivery precision for production timelines',
      image: '/projects/project-25.png',
      index: '05',
    },
    {
      id: 6,
      title: 'Pharma & Healthcare Handling Program',
      category: 'Pharmaceuticals & Healthcare',
      description:
        'Executed controlled handling workflows and compliant documentation for sensitive healthcare and regulated shipments.',
      result: 'Stronger compliance confidence and shipment traceability',
      image: '/projects/project-26.png',
      index: '06',
    },
  ];

  const projectGallery = Array.from(
    { length: 12 },
    (_, i) => `/projects/project-${String(27 + i).padStart(2, '0')}.png`
  );

  const stats = [
    { value: '2000+', label: 'Successful Projects' },
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '30+', label: 'Years of Logistics Trust' },
    { value: '100+', label: 'Global Partners' },
  ];

  const industries = [
    { name: 'Manufacturing & Heavy Industry', tag: 'MFG' },
    { name: 'FMCG (Fast-Moving Consumer Goods)', tag: 'FMCG' },
    { name: 'Agriculture & Food Supply', tag: 'AGR' },
    { name: 'Oil & Gas', tag: 'O&G' },
    { name: 'Retail & E-commerce', tag: 'RTL' },
    { name: 'Automotive', tag: 'AUTO' },
    { name: 'Pharmaceuticals & Healthcare', tag: 'PHR' },
  ];

  return (
    <>
      <style>{`
        :root {
          --ink: #0A0D12;
          --ink-2: #111620;
          --ink-3: #1A2030;
          --gold: #F5B800;
          --gold-dim: #C89400;
          --silver: #8A9BB8;
          --wire: rgba(255,255,255,0.07);
          --wire-gold: rgba(245,184,0,0.2);
        }

        .projects-root {
          background: var(--ink);
          color: #E8ECF4;
          font-family: var(--font-dm-sans), sans-serif;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 88vh;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-bottom: 1px solid var(--wire);
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, #0A0D12 0%, #111826 60%, #0D1520 100%);
        }
        .hero-img {
          position: absolute;
          inset: 0;
          object-fit: cover;
          opacity: 0.18;
          mix-blend-mode: luminosity;
        }
        .hero-grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(245,184,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,184,0,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 2rem;
          max-width: 900px;
        }
        .hero-eyebrow {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.25em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }
        .hero-eyebrow::before,
        .hero-eyebrow::after {
          content: '';
          display: block;
          width: 40px;
          height: 1px;
          background: var(--gold);
          opacity: 0.5;
        }
        .hero-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(72px, 12vw, 140px);
          line-height: 0.9;
          letter-spacing: 0.02em;
          color: #fff;
          margin-bottom: 2rem;
        }
        .hero-title span {
          color: var(--gold);
        }
        .hero-desc {
          font-size: 17px;
          color: var(--silver);
          max-width: 540px;
          margin: 0 auto 3rem;
          line-height: 1.7;
          font-weight: 300;
        }
        .hero-scroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--silver);
          text-transform: uppercase;
          z-index: 2;
        }
        .scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, var(--gold), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }

        /* ── SECTION LABEL ── */
        .section-label {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .section-label::after {
          content: '';
          display: block;
          flex: 1;
          max-width: 60px;
          height: 1px;
          background: var(--gold);
          opacity: 0.4;
        }

        /* ── CASE STUDIES ── */
        .case-section {
          padding: 7rem 0;
          background: var(--ink);
        }
        .case-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .case-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 5rem;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .case-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(48px, 7vw, 80px);
          line-height: 1;
          color: #fff;
          letter-spacing: 0.02em;
        }
        .case-heading em {
          font-style: normal;
          color: var(--gold);
        }
        .case-sub {
          font-size: 15px;
          color: var(--silver);
          max-width: 320px;
          line-height: 1.6;
          font-weight: 300;
        }

        .case-grid {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .case-card {
          display: grid;
          grid-template-columns: 80px 320px 1fr auto;
          align-items: stretch;
          background: var(--ink-2);
          border: 1px solid var(--wire);
          transition: border-color 0.3s, background 0.3s;
          overflow: hidden;
          position: relative;
        }
        .case-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--gold);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .case-card:hover {
          border-color: var(--wire-gold);
          background: var(--ink-3);
        }
        .case-card:hover::before {
          transform: scaleY(1);
        }
        .case-index {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
          font-family: var(--font-bebas), sans-serif;
          font-size: 28px;
          color: rgba(255,255,255,0.12);
          border-right: 1px solid var(--wire);
          letter-spacing: 0.05em;
          transition: color 0.3s;
        }
        .case-card:hover .case-index {
          color: var(--gold);
        }
        .case-img-wrap {
          position: relative;
          overflow: hidden;
          height: 160px;
          align-self: center;
          margin: 1rem;
          border-radius: 4px;
        }
        .case-img-wrap img {
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .case-card:hover .case-img-wrap img {
          transform: scale(1.06);
        }
        .case-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid var(--wire);
        }
        .case-cat {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: var(--gold);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }
        .case-title {
          font-size: 19px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .case-desc {
          font-size: 14px;
          color: var(--silver);
          line-height: 1.65;
          font-weight: 300;
        }
        .case-result-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          padding: 2rem 2.5rem;
          border-left: 1px solid var(--wire);
          min-width: 260px;
          gap: 0.5rem;
        }
        .result-label {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: var(--silver);
          text-transform: uppercase;
          text-align: right;
        }
        .result-text {
          font-size: 15px;
          color: var(--gold);
          font-weight: 500;
          text-align: right;
          line-height: 1.4;
          max-width: 220px;
        }
        .case-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid var(--wire);
          border-radius: 50%;
          margin-top: 1rem;
          color: var(--silver);
          transition: border-color 0.3s, color 0.3s;
        }
        .case-card:hover .case-arrow {
          border-color: var(--gold);
          color: var(--gold);
        }

        /* ── STATS ── */
        .stats-section {
          padding: 6rem 0;
          background: var(--gold);
          position: relative;
          overflow: hidden;
        }
        .stats-section::before {
          content: 'PROVEN';
          position: absolute;
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(120px, 20vw, 240px);
          letter-spacing: 0.1em;
          color: rgba(0,0,0,0.06);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .stats-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
          z-index: 1;
        }
        .stat-item {
          padding: 2rem;
          border-right: 1px solid rgba(0,0,0,0.12);
          text-align: center;
        }
        .stat-item:last-child {
          border-right: none;
        }
        .stat-value {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(56px, 7vw, 84px);
          line-height: 1;
          color: var(--ink);
          letter-spacing: 0.02em;
        }
        .stat-label {
          font-size: 14px;
          color: rgba(10,13,18,0.65);
          margin-top: 0.5rem;
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        /* ── GALLERY ── */
        .gallery-section {
          padding: 7rem 0;
          background: var(--ink-2);
        }
        .gallery-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .gallery-header {
          margin-bottom: 4rem;
        }
        .gallery-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(42px, 6vw, 72px);
          color: #fff;
          line-height: 1;
          letter-spacing: 0.02em;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 200px);
          gap: 4px;
        }
        .gallery-item {
          position: relative;
          overflow: hidden;
          background: var(--ink-3);
        }
        .gallery-item:nth-child(1) {
          grid-column: span 2;
          grid-row: span 2;
        }
        .gallery-item:nth-child(7) {
          grid-column: span 2;
        }
        .gallery-item img {
          object-fit: cover;
          transition: transform 0.6s ease, opacity 0.3s;
          opacity: 0.85;
        }
        .gallery-item:hover img {
          transform: scale(1.05);
          opacity: 1;
        }
        .gallery-item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,13,18,0.5) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── INDUSTRIES ── */
        .industries-section {
          padding: 7rem 0;
          background: var(--ink);
        }
        .industries-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .industries-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        .industries-left .heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(48px, 6vw, 76px);
          color: #fff;
          line-height: 1;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
        }
        .industries-left .heading span {
          color: var(--gold);
        }
        .industries-left p {
          font-size: 15px;
          color: var(--silver);
          line-height: 1.7;
          max-width: 380px;
          font-weight: 300;
        }
        .industry-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .industry-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem 0;
          border-bottom: 1px solid var(--wire);
          transition: padding-left 0.3s, border-color 0.3s;
          cursor: default;
        }
        .industry-row:first-child {
          border-top: 1px solid var(--wire);
        }
        .industry-row:hover {
          padding-left: 0.75rem;
          border-bottom-color: var(--wire-gold);
        }
        .industry-tag {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--gold);
          background: rgba(245,184,0,0.08);
          border: 1px solid var(--wire-gold);
          padding: 3px 8px;
          min-width: 50px;
          text-align: center;
        }
        .industry-name {
          font-size: 16px;
          color: #C8D0E0;
          font-weight: 400;
          flex: 1;
        }
        .industry-arrow {
          color: rgba(245,184,0,0);
          transition: color 0.3s;
        }
        .industry-row:hover .industry-arrow {
          color: var(--gold);
        }

        /* ── CTA ── */
        .cta-section {
          padding: 8rem 2rem;
          background: var(--ink-2);
          text-align: center;
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--wire);
        }
        .cta-bg-text {
          position: absolute;
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(80px, 16vw, 220px);
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.02);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
          margin: 0 auto;
        }
        .cta-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(52px, 8vw, 96px);
          line-height: 0.95;
          color: #fff;
          letter-spacing: 0.02em;
          margin-bottom: 1.5rem;
        }
        .cta-heading span {
          color: var(--gold);
        }
        .cta-sub {
          font-size: 16px;
          color: var(--silver);
          margin-bottom: 3rem;
          font-weight: 300;
          line-height: 1.6;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 1rem 2.5rem;
          background: var(--gold);
          color: var(--ink);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
          font-family: var(--font-dm-mono), monospace;
        }
        .cta-btn:hover {
          background: #FFD040;
          transform: translateY(-1px);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .case-card {
            grid-template-columns: 60px 1fr;
            grid-template-rows: auto auto auto;
          }
          .case-index {
            grid-row: span 3;
          }
          .case-img-wrap {
            grid-column: 2;
            margin: 1rem 1rem 0;
            height: 140px;
          }
          .case-body {
            grid-column: 2;
            padding: 1rem 1.5rem;
            border-left: none;
            border-top: 1px solid var(--wire);
          }
          .case-result-col {
            grid-column: 2;
            align-items: flex-start;
            padding: 1rem 1.5rem 1.5rem;
            border-left: none;
            border-top: 1px solid var(--wire);
            min-width: 0;
          }
          .result-text {
            text-align: left;
          }
          .result-label {
            text-align: left;
          }
          .stats-inner {
            grid-template-columns: repeat(2, 1fr);
          }
          .stat-item:nth-child(2) {
            border-right: none;
          }
          .stat-item:nth-child(1),
          .stat-item:nth-child(2) {
            border-bottom: 1px solid rgba(0,0,0,0.12);
          }
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(6, 180px);
          }
          .gallery-item:nth-child(1) {
            grid-column: span 2;
            grid-row: span 1;
          }
          .gallery-item:nth-child(7) {
            grid-column: span 2;
          }
          .industries-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 640px) {
          .stats-inner {
            grid-template-columns: 1fr 1fr;
          }
          .gallery-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="projects-root">
        <Navbar />

        <section className="hero">
          <div className="hero-bg" />
          <Image
            src="/projects/project-21.png"
            alt="Projects hero background"
            fill
            className="hero-img"
            priority
          />
          <div className="hero-grid-lines" />
          <div className="hero-content">
            <div className="hero-eyebrow">Case Studies</div>
            <h1 className="hero-title">
              OUR
              <br />
              <span>SUCCESS</span>
              <br />
              STORIES
            </h1>
            <p className="hero-desc">
              Real-world examples of how we&apos;ve transformed logistics for
              leading businesses across every sector.
            </p>
          </div>
          <div className="hero-scroll">
            <div className="scroll-line" />
            Scroll
          </div>
        </section>

        <section className="case-section">
          <div className="case-inner">
            <div className="case-header">
              <div>
                <div className="section-label">Featured Projects</div>
                <h2 className="case-heading">
                  Field
                  <br />
                  <em>Operations</em>
                </h2>
              </div>
              <p className="case-sub">
                Our logistics project showcase from Clarusto&apos;s field
                operations, infrastructure capability, and cross-border
                execution.
              </p>
            </div>

            <div className="case-grid">
              {caseStudies.map((study) => (
                <div key={study.id} className="case-card">
                  <div className="case-index">{study.index}</div>
                  <div className="case-img-wrap">
                    <Image src={study.image} alt={study.title} fill />
                  </div>
                  <div className="case-body">
                    <div className="case-cat">{study.category}</div>
                    <div className="case-title">{study.title}</div>
                    <p className="case-desc">{study.description}</p>
                  </div>
                  <div className="case-result-col">
                    <div className="result-label">Key Result</div>
                    <div className="result-text">{study.result}</div>
                    <div className="case-arrow">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-inner">
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="gallery-section">
          <div className="gallery-inner">
            <div className="gallery-header">
              <div className="section-label">Portfolio Visuals</div>
              <h2 className="gallery-heading">
                PROJECT
                <br />
                IMAGE GALLERY
              </h2>
            </div>
            <div className="gallery-grid">
              {projectGallery.map((image, idx) => (
                <div key={image} className="gallery-item">
                  <Image
                    src={image}
                    alt={`Clarusto project visual ${idx + 1}`}
                    fill
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="industries-section">
          <div className="industries-inner">
            <div className="industries-layout">
              <div className="industries-left">
                <div className="section-label">Coverage</div>
                <div className="heading">
                  Industries
                  <br />
                  <span>We Serve</span>
                </div>
                <p>
                  Sector coverage based on the company profile and project
                  scope. Specialized workflows for each vertical.
                </p>
              </div>
              <div className="industry-list">
                {industries.map((ind) => (
                  <div key={ind.name} className="industry-row">
                    <span className="industry-tag">{ind.tag}</span>
                    <span className="industry-name">{ind.name}</span>
                    <span className="industry-arrow">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-bg-text">CLARUSTO</div>
          <div className="cta-content">
            <div className="section-label" style={{ justifyContent: 'center' }}>
              Get Started
            </div>
            <h2 className="cta-heading">
              Ready for Your
              <br />
              <span>Success Story?</span>
            </h2>
            <p className="cta-sub">
              Let us help you optimize your logistics and supply chain. Start a
              conversation with our team today.
            </p>
            <Link href="/contact" className="cta-btn">
              Start Your Project <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

