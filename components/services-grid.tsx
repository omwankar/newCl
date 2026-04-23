import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { Service } from '@/lib/types';

const SERVICE_DETAIL_HREF: Partial<Record<string, string>> = {
  'air-freight': '/services/air-freight',
  'sea-freight': '/services/sea-freight',
  'land-transport': '/services/land-transport',
  warehousing: '/services/warehousing',
  'freight-forwarding': '/services/freight-forwarding',
  'transportation-management': '/services/transportation-management',
  'supply-chain': '/services/supply-chain',
  'last-mile-delivery': '/services/last-mile-delivery',
  'ecommerce-logistics': '/services/ecommerce-logistics',
  'reverse-logistics': '/services/reverse-logistics',
  'heavy-goods-handling': '/services/heavy-goods-handling',
  'customs-clearance': '/services/customs-clearance',
  'customs-brokerage': '/services/customs-brokerage',
};

interface ServicesGridProps {
  services: Service[];
  variant?: 'grid' | 'list';
}

export function ServicesGrid({ services, variant = 'grid' }: ServicesGridProps) {
  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    if (!IconComponent) return null;
    return <IconComponent className="w-8 h-8 text-accent" />;
  };

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {services.map((service) => {
          const detailHref = SERVICE_DETAIL_HREF[service.id];
          const inner = (
            <>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-3">
                    {getIcon(service.icon)}
                    {service.name}
                  </CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            {service.details && service.details.length > 0 && (
              <CardContent>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </>
          );
          return (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              {detailHref ? (
                <Link href={detailHref} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => {
        const detailHref = SERVICE_DETAIL_HREF[service.id];
        const card = (
          <Card
            id={service.id}
            className="hover:shadow-lg hover:border-accent h-full transition-all duration-300"
          >
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                {getIcon(service.icon)}
              </div>
              <CardTitle className="text-lg">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        );
        return detailHref ? (
          <Link key={service.id} href={detailHref} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {card}
          </Link>
        ) : (
          card
        );
      })}
    </div>
  );
}
