'use client';

import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Minus,
  Plus,
} from 'lucide-react';

type OfficeLocation = {
  id: number;
  flag?: string;
  city: string;
  country: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  established?: string;
  teamSize?: number;
  lat: number;
  lng: number;
};

export function OfficeLocationsSection({
  offices,
}: {
  offices: OfficeLocation[];
}) {
  const [selected, setSelected] = useState<OfficeLocation>(offices[0]);
  const [openId, setOpenId] = useState<number>(offices[0]?.id ?? 0);

  const officeQuery = encodeURIComponent(
    [selected.address, selected.city, selected.country]
      .filter(Boolean)
      .join(', ')
  );

  const mapSrc = `https://maps.google.com/maps?q=${officeQuery}&z=15&output=embed`;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      {/* MAP */}
      <div className="absolute inset-0">
        <iframe
          key={selected.id}
          title={`Map for ${selected.city}`}
          src={mapSrc}
          width="100%"
          height="620"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[620px] w-full border-none"
        />
        <div className="pointer-events-none absolute inset-0" />
      </div>

      {/* PANEL */}
      <div className="pointer-events-none relative z-10 flex min-h-[620px] items-stretch">
        <div className="pointer-events-auto m-4 w-full max-w-[360px] rounded-2xl bg-[#a37742]/95 p-3 text-white shadow-lg backdrop-blur md:m-6">
          {offices.map((office) => {
            const isOpen = openId === office.id;

            return (
              <div
                key={office.id}
                className={`rounded-xl transition-colors ${
                  isOpen ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                {/* HEADER */}
                <button
                  type="button"
                  onClick={() => {
                    setSelected(office);
                    setOpenId((prev) =>
                      prev === office.id ? 0 : office.id
                    );
                  }}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold">
                    {office.city} Office
                  </span>

                  {/* ICON ANIMATION */}
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-transform duration-300">
                    {isOpen ? (
                      <Minus className="h-4 w-4 rotate-180 transition-transform duration-300" />
                    ) : (
                      <Plus className="h-4 w-4 transition-transform duration-300" />
                    )}
                  </span>
                </button>

                {/* SMOOTH CONTENT */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 mt-1'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 text-[13px] leading-relaxed text-white/90">
                      {office.address && (
                        <p className="text-white/85">
                          {office.address}
                        </p>
                      )}

                      <div className="mt-3 grid gap-2">
                        {office.hours && (
                          <div className="flex items-start gap-2">
                            <Clock className="mt-0.5 h-4 w-4 text-white/80" />
                            <span>{office.hours}</span>
                          </div>
                        )}

                        {office.phone && (
                          <a
                            href={`tel:${office.phone}`}
                            className="flex items-start gap-2 text-white/95 underline-offset-2 hover:underline"
                          >
                            <Phone className="mt-0.5 h-4 w-4 text-white/80" />
                            <span>{office.phone}</span>
                          </a>
                        )}

                        {office.email && (
                          <a
                            href={`mailto:${office.email}`}
                            className="flex items-start gap-2 text-white/95 underline-offset-2 hover:underline"
                          >
                            <Mail className="mt-0.5 h-4 w-4 text-white/80" />
                            <span>{office.email}</span>
                          </a>
                        )}
                      </div>

                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(
                          [
                            office.address,
                            office.city,
                            office.country,
                          ]
                            .filter(Boolean)
                            .join(', ')
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Get directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}