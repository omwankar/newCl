import type { LucideIcon } from 'lucide-react';
import {
  Plane,
  Ship,
  Truck,
  Warehouse,
  GitBranch,
  FileBadge,
  Thermometer,
  ScrollText,
  Route,
  Box,
  RotateCcw,
  Container,
  ClipboardCheck,
} from 'lucide-react';

export const SERVICE_DETAIL_SLUGS = [
  'air-freight',
  'sea-freight',
  'land-transport',
  'warehousing',
  'freight-forwarding',
  'transportation-management',
  'supply-chain',
  'last-mile-delivery',
  'ecommerce-logistics',
  'reverse-logistics',
  'heavy-goods-handling',
  'customs-clearance',
  'customs-brokerage',
] as const;

export type ServiceDetailSlug = (typeof SERVICE_DETAIL_SLUGS)[number];

export type ServiceWhyCard = {
  title: string;
  body: string;
  Icon: LucideIcon;
};

export type ServiceDetailPage = {
  slug: ServiceDetailSlug;
  title: string;
  subheading: string;
  heroImage: string;
  metaDescription: string;
  paragraphs: [string, string];
  whyChoose: ServiceWhyCard[];
  /** subtle visual variation */
  accentStripe: 'amber' | 'gold' | 'ember';
};

export const SERVICE_DETAIL_PAGES: Record<ServiceDetailSlug, ServiceDetailPage> = {
  'air-freight': {
    slug: 'air-freight',
    title: 'Air Freight',
    subheading: 'Speed Without Compromise',
    heroImage: '/landing/air-freight.png',
    metaDescription:
      'Clarusto air freight: global airline partnerships, temperature-sensitive handling, and dedicated freight managers.',
    paragraphs: [
      "Our air freight services are engineered for businesses where time is the most critical asset. We maintain active partnerships with over 50 major international airlines, providing reliable cargo capacity across 150+ countries. Whether you're shipping temperature-sensitive pharmaceuticals, high-value electronics, or urgent manufacturing parts, our specialized handling protocols ensure your cargo arrives safely and on schedule — every single time, without exception.",
      'We offer comprehensive door-to-airport and airport-to-door delivery solutions, supported by real-time shipment tracking and customs pre-clearance to eliminate border delays. Every client is assigned a dedicated freight manager who coordinates end-to-end logistics, handles documentation, and provides proactive updates throughout transit. Our enterprise clients benefit from priority booking, flexible scheduling, and volume-based pricing that scales with their business growth and evolving supply chain demands.',
    ],
    whyChoose: [
      {
        title: 'Global airline network',
        body: 'Priority capacity agreements and multi-carrier routing keep urgent cargo moving on the fastest lanes.',
        Icon: Plane,
      },
      {
        title: 'Specialized handling',
        body: 'Cold chain, DG, and high-value programs with documented SOPs and milestone checkpoints.',
        Icon: FileBadge,
      },
      {
        title: 'Live visibility',
        body: 'Milestone tracking and proactive exception alerts from booking through final delivery.',
        Icon: GitBranch,
      },
    ],
    accentStripe: 'amber',
  },
  'sea-freight': {
    slug: 'sea-freight',
    title: 'Sea Freight',
    subheading: 'Bulk Cargo, Global Reach',
    heroImage: '/landing/sea-freight.png',
    metaDescription:
      'FCL and LCL sea freight across major lanes with Maersk, MSC, CMA CGM partners and full visibility.',
    paragraphs: [
      'Sea freight remains the most cost-effective solution for transporting large volumes of goods across international waters. We offer both Full Container Load (FCL) and Less than Container Load (LCL) options, giving businesses of all sizes access to competitive ocean shipping rates. Our network spans every major global shipping lane, connecting manufacturers, exporters, and importers across Asia, Europe, the Americas, Africa, and the Middle East with unmatched reliability.',
      'Our container fleet includes refrigerated reefers, open-top, flat rack, and out-of-gauge containers to accommodate virtually any cargo type. We partner with leading ocean carriers including Maersk, MSC, and CMA CGM to guarantee consistent vessel space and competitive transit times. Full port-to-port and door-to-door services are available, with integrated customs clearance, cargo insurance, and live shipment tracking through our dedicated client portal for complete visibility.',
    ],
    whyChoose: [
      {
        title: 'FCL & LCL flexibility',
        body: 'Right-size ocean moves from pallet loads to high-cube containers without compromising schedule.',
        Icon: Ship,
      },
      {
        title: 'Equipment for every load',
        body: 'Reefers, flat racks, and project cargo support for out-of-gauge and industrial shipments.',
        Icon: Warehouse,
      },
      {
        title: 'Carrier-grade reliability',
        body: 'Allocated space programs and contingency sailings when markets tighten.',
        Icon: GitBranch,
      },
    ],
    accentStripe: 'gold',
  },
  'land-transport': {
    slug: 'land-transport',
    title: 'Land Transport',
    subheading: 'Last-Mile to Long-Haul',
    heroImage: '/landing/land-transport.png',
    metaDescription:
      'FTL and LTL land transport with GPS fleet monitoring, hazmat certification, and refrigerated options.',
    paragraphs: [
      'Our land transport division offers flexible Full Truck Load (FTL) and Less than Truck Load (LTL) services across domestic and cross-border routes. Our GPS-monitored fleet of modern vehicles operates 24/7, covering major highway corridors across Asia, Europe, and the Americas. We provide scheduled linehaul services as well as on-demand dispatch, ensuring your goods are picked up and delivered on your timeline without unnecessary delays or detours.',
      'We are fully certified for transporting hazardous materials, oversized cargo, and temperature-sensitive freight under strict compliance standards. Our refrigerated transport solutions maintain precise temperature control throughout the journey, ideal for food, pharma, and chemical shipments. High-volume clients can access dedicated fleet arrangements with fixed pricing, preferred scheduling, and on-site driver coordination — giving your supply chain a reliable ground backbone that integrates seamlessly with air and sea operations.',
    ],
    whyChoose: [
      {
        title: 'FTL & LTL coverage',
        body: 'Linehaul, regional distribution, and dedicated routes tuned to your lead times.',
        Icon: Truck,
      },
      {
        title: 'Compliance-first fleet',
        body: 'ADR / hazmat programs, escorts, and permit management for regulated freight.',
        Icon: FileBadge,
      },
      {
        title: 'Temperature integrity',
        body: 'Reefer telemetry with alarm thresholds and audit-ready temperature logs.',
        Icon: Thermometer,
      },
    ],
    accentStripe: 'ember',
  },
  warehousing: {
    slug: 'warehousing',
    title: 'Warehousing & Distribution',
    subheading: 'Your Inventory, Always in Control',
    heroImage: '/landing/warehousing-distribution.png',
    metaDescription:
      'WMS-enabled warehousing near ports and hubs, pick & pack, kitting, and e-commerce fulfillment integrations.',
    paragraphs: [
      'Our strategically located warehousing facilities are positioned near key ports, airports, and industrial hubs to minimize transit time and reduce distribution costs. Equipped with advanced Warehouse Management Systems (WMS), our centers offer real-time inventory visibility, automated stock alerts, and multi-location management. Round-the-clock CCTV surveillance, fire suppression systems, and access-controlled entry ensure that your goods are stored in a fully secure and compliant environment at all times.',
      'Beyond storage, we offer a complete range of value-added services including pick and pack, product labeling, kitting, bundling, and reverse logistics management. Our e-commerce fulfillment centers are integrated with major platforms like Shopify, Amazon, and Flipkart, enabling same-day order processing and dispatch. Whether you\'re scaling a startup or managing enterprise-level inventory, our flexible storage plans and dedicated account managers ensure smooth, efficient distribution tailored to your exact requirements.',
    ],
    whyChoose: [
      {
        title: 'WMS-driven accuracy',
        body: 'Cycle counts, slotting rules, and exception workflows that keep inventory honest.',
        Icon: Warehouse,
      },
      {
        title: 'Fulfillment velocity',
        body: 'Same-day cutoffs and carrier injection for high-volume D2C and B2B channels.',
        Icon: Truck,
      },
      {
        title: 'Secure facilities',
        body: 'Zoned access, CCTV, and insurance-ready storage for high-value SKUs.',
        Icon: FileBadge,
      },
    ],
    accentStripe: 'amber',
  },
  'freight-forwarding': {
    slug: 'freight-forwarding',
    title: 'Freight Forwarding',
    subheading: 'Global Coordination, One Expert Partner',
    heroImage: '/landing/sea-freight.png',
    metaDescription:
      'Comprehensive freight forwarding with booking, consolidation, customs planning, and end-to-end shipment orchestration.',
    paragraphs: [
      'Our freight forwarding team manages every moving part of international cargo so your operations stay focused on core business. We coordinate carriers, negotiate rates, prepare shipment plans, and align schedules across origins, hubs, and final destinations. By consolidating shipments and selecting optimal transit lanes, we improve reliability while controlling costs. You receive one accountable logistics partner instead of fragmented communication with multiple vendors and agents.',
      'From pre-shipment planning to final proof of delivery, we handle documentation, compliance checks, and milestone tracking with precision. Our specialists proactively manage exceptions like rollover, congestion, and weather-related disruption through contingency routing and carrier alternatives. With transparent reporting, clear transit timelines, and dedicated account support, your teams gain predictable execution for both recurring lanes and time-sensitive spot movements across regional and global trade corridors.',
    ],
    whyChoose: [
      {
        title: 'Single point control',
        body: 'One coordination desk handles carrier booking, handoffs, milestones, and escalation.',
        Icon: ClipboardCheck,
      },
      {
        title: 'Carrier optimization',
        body: 'Route and mode decisions are tuned for service level, budget, and seasonality.',
        Icon: GitBranch,
      },
      {
        title: 'Exception response',
        body: 'Rapid mitigation plans reduce downstream disruption when transport conditions change.',
        Icon: Route,
      },
    ],
    accentStripe: 'gold',
  },
  'transportation-management': {
    slug: 'transportation-management',
    title: 'Transportation Management',
    subheading: 'Planned Movements, Measurable Performance',
    heroImage: '/landing/land-transport.png',
    metaDescription:
      'Transportation management for planning, tendering, dispatch, tracking, and continuous logistics performance improvement.',
    paragraphs: [
      'Our transportation management service centralizes planning, execution, and performance monitoring across your outbound and inbound logistics network. We design lane strategies, assign carrier mixes, and build dispatch schedules that match service commitments and inventory priorities. Through continuous load optimization and route balancing, we reduce empty miles, avoid unnecessary expedite costs, and maintain dependable transit performance during peak periods and changing market demand.',
      'Clients benefit from structured SOPs, KPI dashboards, and regular operational reviews focused on on-time delivery, freight spend, and claim reduction. We integrate shipment data across air, ocean, and road movements to provide a unified view of transport performance. With proactive tender management, automated milestone communication, and rapid issue escalation, your team gains stronger control, cleaner reporting, and consistent service quality across all shipping programs.',
    ],
    whyChoose: [
      {
        title: 'Network planning',
        body: 'Lane design and scheduling models improve speed, utilization, and service consistency.',
        Icon: Route,
      },
      {
        title: 'KPI visibility',
        body: 'Unified dashboards track cost, SLA adherence, dwell time, and exception trends.',
        Icon: GitBranch,
      },
      {
        title: 'Execution discipline',
        body: 'Standardized dispatch and escalation workflows keep shipments on plan.',
        Icon: ClipboardCheck,
      },
    ],
    accentStripe: 'ember',
  },
  'supply-chain': {
    slug: 'supply-chain',
    title: 'Supply Chain Management',
    subheading: 'End-to-End Visibility',
    heroImage: '/landing/supply-chain-network.png',
    metaDescription:
      'Design resilient supply chains with multimodal strategies, ERP-integrated dashboards, and risk mitigation.',
    paragraphs: [
      'Our supply chain management services deliver end-to-end control from raw material sourcing to final delivery. We work closely with your procurement and operations teams to map your supply chain, identify inefficiencies, and implement multi-modal transport strategies that reduce cost and improve lead times. Our demand forecasting tools and vendor coordination systems ensure that stock levels remain optimized, preventing costly overstock situations or production stoppages caused by delayed inbound materials.',
      'We provide businesses with powerful digital dashboards offering real-time KPI tracking, shipment visibility, and performance analytics across every node of the supply chain. Our systems integrate seamlessly with leading ERP platforms including SAP, Oracle, and Microsoft Dynamics. Risk mitigation strategies, including alternative routing and backup supplier networks, are built into every plan. From startups to multinational corporations, we design scalable, resilient supply chains that adapt to market shifts and disruptions.',
    ],
    whyChoose: [
      {
        title: 'Network design',
        body: 'Scenario modeling for cost, carbon, and service trade-offs across modes and regions.',
        Icon: GitBranch,
      },
      {
        title: 'ERP-aligned ops',
        body: 'Integrated planning signals so logistics execution matches finance and procurement.',
        Icon: FileBadge,
      },
      {
        title: 'Disruption playbooks',
        body: 'Alternate lanes, buffer stock policies, and supplier diversification on speed dial.',
        Icon: Ship,
      },
    ],
    accentStripe: 'gold',
  },
  'last-mile-delivery': {
    slug: 'last-mile-delivery',
    title: 'Last Mile Delivery',
    subheading: 'Reliable Final Delivery Experience',
    heroImage: '/landing/land-transport.png',
    metaDescription:
      'Last mile delivery with optimized routing, proof-of-delivery workflows, and customer-first execution.',
    paragraphs: [
      'Our last mile delivery solutions are built for accuracy, speed, and customer satisfaction at the most visible stage of fulfillment. We optimize local routes, dispatch windows, and delivery density to reduce delays while preserving service quality. Real-time driver tracking and dynamic re-sequencing support predictable outcomes even in high-traffic urban zones. Whether B2C parcels or B2B replenishment drops, we keep final delivery dependable and well-coordinated.',
      'We support scheduled, same-day, and next-day delivery models with clear proof-of-delivery capture and exception handling. Customers receive timely status notifications, while your operations team gets actionable visibility into attempt rates, failed deliveries, and turnaround performance. With trained delivery partners, defined SLA controls, and scalable city-level capacity, we help your brand maintain trust where it matters most, at the final customer handoff.',
    ],
    whyChoose: [
      {
        title: 'Route optimization',
        body: 'Dynamic sequencing improves stop efficiency and helps meet narrow delivery windows.',
        Icon: Route,
      },
      {
        title: 'Customer visibility',
        body: 'Live status updates and proof-of-delivery records reduce support inquiries.',
        Icon: ClipboardCheck,
      },
      {
        title: 'Scalable capacity',
        body: 'Flexible fleet models absorb seasonal peaks without service degradation.',
        Icon: Truck,
      },
    ],
    accentStripe: 'amber',
  },
  'ecommerce-logistics': {
    slug: 'ecommerce-logistics',
    title: 'E-Commerce Logistics',
    subheading: 'Fulfillment Built for Growth',
    heroImage: '/landing/warehousing-distribution.png',
    metaDescription:
      'Integrated e-commerce logistics covering inbound, storage, fulfillment, returns, and delivery visibility.',
    paragraphs: [
      'Our e-commerce logistics model connects inbound receiving, inventory control, order fulfillment, and outbound distribution into one streamlined workflow. We synchronize with marketplace and storefront platforms to process orders quickly and accurately, while maintaining stock visibility across SKUs and locations. Smart picking methods, packaging standards, and carrier allocation rules help improve order cycle times and reduce fulfillment errors during promotional spikes and seasonal demand swings.',
      'Beyond day-to-day execution, we provide performance intelligence that supports profitable scaling. You get insight into pick accuracy, dispatch cutoffs, shipping cost per order, and return patterns by channel. Our teams continuously refine slotting, packaging, and service-level logic to improve customer delivery experience without inflating logistics spend. From emerging brands to high-volume sellers, we build resilient operations that support sustained online growth.',
    ],
    whyChoose: [
      {
        title: 'Platform integration',
        body: 'Connected order flows across marketplaces and storefront channels reduce manual effort.',
        Icon: GitBranch,
      },
      {
        title: 'Fulfillment precision',
        body: 'Pick-pack standards and QC checkpoints improve accuracy at scale.',
        Icon: Box,
      },
      {
        title: 'Growth analytics',
        body: 'Actionable metrics guide cost control and service-level improvements.',
        Icon: ClipboardCheck,
      },
    ],
    accentStripe: 'gold',
  },
  'reverse-logistics': {
    slug: 'reverse-logistics',
    title: 'Reverse Logistics',
    subheading: 'Returns Managed With Control',
    heroImage: '/landing/supply-chain-analytics.png',
    metaDescription:
      'Reverse logistics programs for returns, inspection, refurbishment, and compliant disposal workflows.',
    paragraphs: [
      'Our reverse logistics services turn returns and recovery operations into a structured, cost-controlled process. We manage collection, return authorization alignment, inbound screening, and disposition routing based on product condition and business rules. By standardizing intake and inspection workflows, we shorten cycle times and improve recovery outcomes. This helps brands protect customer experience while minimizing write-offs, warehouse congestion, and avoidable handling costs.',
      'We support restock, repair, refurbishment, resale, and compliant disposal paths with complete audit trails and status visibility. Every return is tracked through checkpoints so finance, operations, and customer teams work from consistent information. Our reporting highlights root causes behind return volume and quality issues, enabling corrective action upstream. With scalable reverse logistics infrastructure, your business can maintain service quality while controlling the operational complexity of returns.',
    ],
    whyChoose: [
      {
        title: 'Structured returns flow',
        body: 'Defined intake and disposition logic improves speed and consistency.',
        Icon: RotateCcw,
      },
      {
        title: 'Recovery focused',
        body: 'Restock and refurbishment pathways maximize value recovery from returned inventory.',
        Icon: Box,
      },
      {
        title: 'Audit readiness',
        body: 'Checkpoint history and documentation support claims, compliance, and reconciliation.',
        Icon: ScrollText,
      },
    ],
    accentStripe: 'ember',
  },
  'heavy-goods-handling': {
    slug: 'heavy-goods-handling',
    title: 'Heavy Goods Handling',
    subheading: 'Specialized Capacity for Oversized Cargo',
    heroImage: '/landing/sea-freight.png',
    metaDescription:
      'Specialized heavy goods handling for oversized, project, and industrial cargo with safety-first execution.',
    paragraphs: [
      'Our heavy goods handling team specializes in oversized, high-weight, and project-critical cargo requiring engineered movement plans. We assess load dimensions, center of gravity, lift requirements, and route constraints before execution begins. From factory extraction to final placement, we coordinate cranes, trailers, escorts, and permits with strict safety controls. This approach minimizes risk and keeps complex industrial movements on schedule and fully documented.',
      'We handle machinery, transformers, steel structures, and other non-standard loads across domestic and cross-border corridors. Every project includes method statements, risk assessments, and contingency planning for site or transit constraints. Our crews follow certified lifting and securing procedures, while dedicated coordinators maintain progress visibility for stakeholders. With proven expertise in challenging cargo profiles, we deliver confidence for operations where failure is not an option.',
    ],
    whyChoose: [
      {
        title: 'Engineered execution',
        body: 'Lift planning and route surveys are designed around load physics and safety.',
        Icon: Container,
      },
      {
        title: 'Permit coordination',
        body: 'Regulatory approvals and escort planning are handled end-to-end.',
        Icon: FileBadge,
      },
      {
        title: 'Project visibility',
        body: 'Milestone communication keeps site, transport, and leadership teams aligned.',
        Icon: ClipboardCheck,
      },
    ],
    accentStripe: 'gold',
  },
  'customs-clearance': {
    slug: 'customs-clearance',
    title: 'Customs Clearance',
    subheading: 'Smooth Borders, Every Time',
    heroImage: '/landing/customs-clearance.png',
    metaDescription:
      'Licensed brokerage across 80+ countries: HS classification, documentation, and authority liaison for rapid release.',
    paragraphs: [
      'Our licensed customs brokerage team brings decades of experience navigating complex international trade regulations across 80+ countries. We handle every aspect of the clearance process — from accurate HS code classification and duty calculation to import/export license management and compliance verification. Our proactive approach ensures that all regulatory requirements are met well in advance, significantly reducing the risk of shipment holds, penalties, or costly delays at border checkpoints.',
      'We prepare and manage all critical trade documents including the Bill of Lading, Certificate of Origin, Packing Lists, Commercial Invoices, and Letters of Credit. Our team maintains direct liaisons with customs authorities at major ports and airports, enabling priority processing and rapid release of your cargo. With clearly defined clearance SLAs and dedicated documentation specialists available around the clock, your shipments clear borders smoothly, predictably, and fully compliant with all applicable trade laws.',
    ],
    whyChoose: [
      {
        title: 'Classification precision',
        body: 'Binding rulings support and audit-ready files to defend duty positions.',
        Icon: FileBadge,
      },
      {
        title: 'Authority relationships',
        body: 'Port and airport desks staffed with specialists who know local nuance.',
        Icon: GitBranch,
      },
      {
        title: 'Document control',
        body: 'Single source of truth for B/L, COO, invoices, and L/C compliance.',
        Icon: ScrollText,
      },
    ],
    accentStripe: 'ember',
  },
  'customs-brokerage': {
    slug: 'customs-brokerage',
    title: 'Customs Brokerage',
    subheading: 'Trade Compliance Without Friction',
    heroImage: '/landing/customs-clearance.png',
    metaDescription:
      'Customs brokerage services for classification, duty optimization, filing accuracy, and faster cargo release.',
    paragraphs: [
      'Our customs brokerage service helps importers and exporters navigate evolving trade regulations with confidence and speed. We manage tariff classification, valuation checks, and declaration filing to ensure submissions are accurate the first time. By combining regulatory expertise with process discipline, we reduce clearance delays, avoid penalty exposure, and improve release predictability across major ports and airports serving your primary trade lanes.',
      'Each shipment is supported by documentation specialists who validate commercial records, certificates, and permit requirements before filing. We also advise on duty optimization opportunities, preferential trade agreements, and compliance controls that stand up to audit scrutiny. With responsive communication, transparent status tracking, and escalation support when issues arise, your teams gain smoother cross-border execution and stronger governance over customs outcomes.',
    ],
    whyChoose: [
      {
        title: 'Filing accuracy',
        body: 'Pre-check workflows improve declaration quality and reduce rework.',
        Icon: ScrollText,
      },
      {
        title: 'Duty optimization',
        body: 'Classification strategy and trade program guidance protect landed cost.',
        Icon: GitBranch,
      },
      {
        title: 'Rapid escalation',
        body: 'Specialists coordinate directly with authorities to resolve holds quickly.',
        Icon: FileBadge,
      },
    ],
    accentStripe: 'amber',
  },
};

export function isServiceDetailSlug(s: string): s is ServiceDetailSlug {
  return (SERVICE_DETAIL_SLUGS as readonly string[]).includes(s);
}
