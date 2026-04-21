'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

type OfficeLocation = {
  id: number;
  flag?: string;
  city: string;
  country: string;
  address?: string;
  phone?: string;
  email?: string;
  lat: number;
  lng: number;
};

export function OfficeLocationsSection({ offices }: { offices: OfficeLocation[] }) {
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation>(offices[0]);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const officeQueryRaw = [
    selectedOffice.address,
    selectedOffice.city,
    selectedOffice.country,
  ]
    .filter(Boolean)
    .join(', ');
  const officeQuery = encodeURIComponent(officeQueryRaw);

  // Use full office address so Google places a marker on the most exact resolvable location.
  const mapSrc = `https://maps.google.com/maps?q=${officeQuery}&z=15&output=embed`;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {offices.map((office) => {
          const isSelected = selectedOffice.id === office.id;
          return (
            <Card
              key={office.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedOffice(office)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedOffice(office);
                }
              }}
              className={`cursor-pointer bg-white ring-1 transition-all hover:shadow-lg ${
                isSelected ? 'ring-amber-400 shadow-md' : 'ring-border hover:ring-accent/40'
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <div>
                    <CardTitle className="text-xl">
                      {office.flag ? `${office.flag} ` : ''}
                      {office.city}
                    </CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">{office.country}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {office.address && (
                  <div>
                    <p className="text-sm font-semibold text-foreground">Address</p>
                    <p className="text-sm text-muted-foreground">{office.address}</p>
                  </div>
                )}
                {office.phone && (
                  <div>
                    <p className="text-sm font-semibold text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">{office.phone}</p>
                  </div>
                )}
                {office.email && (
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">{office.email}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-foreground">
            Showing map for: {selectedOffice.city}, {selectedOffice.country}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {googleMapsApiKey
              ? 'Using compatible embed mode for reliable rendering with demo/restricted keys.'
              : 'Using no-key embed mode. Add a full Google Maps key with billing to use advanced Maps APIs.'}
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <iframe
            title={`Map location for ${selectedOffice.city}`}
            src={mapSrc}
            width="100%"
            height="520"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>
      </div>
    </div>
  );
}
