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
} from 'lucide-react';

export const SERVICE_DETAIL_SLUGS = [
  'air-freight',
  'sea-freight',
  'land-transport',
  'warehousing',
  'supply-chain',
  'customs-clearance',
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
    heroImage:
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80',
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
    heroImage:
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=80',
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
    heroImage:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=80',
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
    heroImage:
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&q=80',
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
  'supply-chain': {
    slug: 'supply-chain',
    title: 'Supply Chain Management',
    subheading: 'End-to-End Visibility',
    heroImage:
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1600&q=80',
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
  'customs-clearance': {
    slug: 'customs-clearance',
    title: 'Customs Clearance',
    subheading: 'Smooth Borders, Every Time',
    heroImage:
      'https://images.unsplash.com/photo-1515630278258-407f994a2bc9?w=1600&q=80',
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
};

export function isServiceDetailSlug(s: string): s is ServiceDetailSlug {
  return (SERVICE_DETAIL_SLUGS as readonly string[]).includes(s);
}
