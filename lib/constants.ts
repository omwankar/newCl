import { Service, Office, Differentiator, ProcessStep, TimelineEvent, Industry } from './types';

export const PRIMARY_CONTACT_PHONE_DISPLAY = '+44 (0) 3300946908';
export const PRIMARY_CONTACT_PHONE_HREF = 'tel:+443300946908';

export const SERVICES: Service[] = [
  {
    id: 'air-freight',
    name: 'Air Freight',
    description: 'Fast international air shipping solutions',
    icon: 'Plane',
  },
  {
    id: 'sea-freight',
    name: 'Sea Freight',
    description: 'Cost-effective ocean freight services',
    icon: 'Ship',
  },
  {
    id: 'land-transport',
    name: 'Land Transport',
    description: 'Reliable road transportation across regions',
    icon: 'Truck',
  },
  {
    id: 'warehousing',
    name: 'Warehousing & Distribution',
    description: 'Secure storage and distribution facilities',
    icon: 'Package',
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Management',
    description: 'End-to-end supply chain optimization',
    icon: 'Network',
  },
  {
    id: 'customs-clearance',
    name: 'Customs Clearance',
    description: 'Expert customs brokerage services',
    icon: 'FileCheck',
  },
  {
    id: 'integrated-logistics',
    name: 'Integrated Logistics Solutions',
    description: 'Complete logistics management services',
    icon: 'Boxes',
  },
  {
    id: 'courier-delivery',
    name: 'Courier Delivery',
    description: 'Fast and reliable courier services',
    icon: 'Zap',
  },
];

export const OFFICES: Office[] = [
  {
    id: 'uk',
    flag: '🇬🇧',
    city: 'Glasgow',
    country: 'United Kingdom',
  },
  {
    id: 'saudi',
    flag: '🇸🇦',
    city: 'Dammam',
    country: 'Saudi Arabia',
  },
  {
    id: 'germany',
    flag: '🇩🇪',
    city: 'Magdeburg',
    country: 'Germany',
  },
  {
    id: 'india',
    flag: '🇮🇳',
    city: 'Kerala',
    country: 'India',
  },
  {
    id: 'dubai',
    flag: '🇦🇪',
    city: 'Dubai',
    country: 'UAE',
  },
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    id: '1',
    title: '30+ Years of Experience',
    description: 'Three decades of proven expertise in global logistics and shipping',
  },
  {
    id: '2',
    title: 'Global Network',
    description: 'Operations across 5 continents with strategic office locations worldwide',
  },
  {
    id: '3',
    title: 'Advanced Technology',
    description: 'Real-time tracking and digital solutions for complete transparency',
  },
  {
    id: '4',
    title: 'Expert Team',
    description: 'Highly trained professionals dedicated to your logistics success',
  },
  {
    id: '5',
    title: 'Customer-Centric',
    description: '24/7 support and personalized solutions for every client',
  },
  {
    id: '6',
    title: 'Sustainability',
    description: 'Committed to eco-friendly practices and green logistics solutions',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: '1',
    step: 1,
    title: 'Order Placement',
    description: 'Receive and process your shipping order with complete details',
  },
  {
    id: '2',
    step: 2,
    title: 'Documentation',
    description: 'Prepare and verify all necessary shipping and customs documents',
  },
  {
    id: '3',
    step: 3,
    title: 'Pickup & Collection',
    description: 'Collect goods from your location with utmost care and professionalism',
  },
  {
    id: '4',
    step: 4,
    title: 'Consolidation & Dispatch',
    description: 'Consolidate shipments and dispatch via optimal routing',
  },
  {
    id: '5',
    step: 5,
    title: 'Transit & Tracking',
    description: 'Monitor shipment in real-time with complete transparency',
  },
  {
    id: '6',
    step: 6,
    title: 'Delivery',
    description: 'Final delivery with signature confirmation and satisfaction guarantee',
  },
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    year: '1992',
    title: 'Joint Venture Founded',
    description: "Clarusto's roots began with a joint venture with Al Suhaimi Cargo in Eastern Province, Saudi Arabia.",
  },
  {
    id: '2',
    year: '2001',
    title: 'Air Freight Wing Launched',
    description: 'Expanded services to include air freight forwarding, broadening our logistics capabilities.',
  },
  {
    id: '3',
    year: '2004',
    title: 'Air Freight Leader',
    description: 'Recognised as one of the best air freight providers in the Eastern Province of Saudi Arabia.',
  },
  {
    id: '4',
    year: '2011',
    title: 'Global Express Cargo Born',
    description: 'Our firm GLOBAL EXPRESS CARGO became a separate independent entity from the joint venture.',
  },
  {
    id: '5',
    year: '2012',
    title: 'Emirates Cargo Award',
    description: 'Received the award for Best Freight Forwarder in Eastern Province from Emirates Cargo.',
  },
  {
    id: '6',
    year: '2015',
    title: 'Middle East Expansion',
    description: 'Established branches and agents across the Middle East region.',
  },
  {
    id: '7',
    year: '2016',
    title: 'Bahrain Branch',
    description: 'Opened our first international branch in Bahrain.',
  },
  {
    id: '8',
    year: '2017',
    title: 'Dubai Office',
    description: 'Expanded our footprint by opening an office in Dubai, UAE.',
  },
  {
    id: '9',
    year: '2018',
    title: 'Rebranded to Clarusto',
    description: 'Rebranded to Clarusto Logistics and opened a branch office in the UK.',
  },
  {
    id: '10',
    year: '2025',
    title: 'Worldwide Recognition',
    description: "Recognised as one of the world's leading freight and logistics providers operating across 5 continents.",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'automotive',
    name: 'Automotive',
    icon: 'Car',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Cpu',
  },
  {
    id: 'pharmaceutical',
    name: 'Pharmaceutical',
    icon: 'TestTube',
  },
  {
    id: 'fashion',
    name: 'Fashion & Retail',
    icon: 'ShoppingBag',
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'industrial',
    name: 'Industrial Equipment',
    icon: 'Wrench',
  },
  {
    id: 'energy',
    name: 'Energy & Resources',
    icon: 'Zap',
  },
];

export const MISSION = 'To deliver reliable, cost-efficient, and end-to-end logistics solutions that empower businesses to operate beyond borders. We are committed to accuracy, speed, and transparency - ensuring every shipment, big or small, receives the utmost care. By combining advanced technology, experienced professionals, and a customer-focused approach, Clarusto Logistics strives to set new standards in professionalism, efficiency, and service quality.';

export const VISION = 'To be a globally recognised logistics leader - known for trust, integrity, and consistent on-time performance. We envision a world where logistics challenges are simplified, supply chains are optimised, and businesses grow confidently with a partner that delivers more than just cargo. Through strategic expansion and commitment to global best practices, we aim to be the preferred logistics partner for companies worldwide.';
