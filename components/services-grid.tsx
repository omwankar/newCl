import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { Service } from '@/lib/types';

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
        {services.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
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
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <Card
          key={service.id}
          id={service.id}
          className="hover:shadow-lg hover:border-accent transition-all duration-300 h-full"
        >
          <CardHeader>
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
              {getIcon(service.icon)}
            </div>
            <CardTitle className="text-lg">{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{service.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
