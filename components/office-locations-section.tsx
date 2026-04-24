'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Minus,
  Plus,
} from 'lucide-react';

type OfficeLocation = {
  id: number;
  city: string;
  country: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
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
          loading="lazy"
          className="block h-[300px] md:h-[620px] w-full border-none"
        />
        <div className="pointer-events-none absolute inset-0" />
      </div>

      {/* LAYOUT */}
      <div className="pointer-events-none relative z-10 flex flex-col md:flex-row min-h-[300px] md:min-h-[620px]">

        {/* PANEL */}
        <div
          className="
            pointer-events-auto
            w-full
            md:max-w-[360px]
            md:m-6
            mt-[260px] md:mt-0
            mx-2 md:mx-0
            rounded-2xl
            bg-[#a37742]/95
            p-3
            text-white
            shadow-lg
            backdrop-blur
            max-h-[70vh]
            overflow-y-auto
          "
        >
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
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm md:text-base"
                >
                  <span className="font-semibold">
                    {office.city} Office
                  </span>

                  {/* ICON */}
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-transform duration-300">
                    {isOpen ? (
                      <Minus className="h-4 w-4 rotate-180" />
                    ) : (
                      <Plus className="h-4 w-4" />
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
                    <div className="px-4 pb-4 text-[14px] md:text-[13px] leading-relaxed text-white/90">

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
                            className="flex items-start gap-2 underline-offset-2 hover:underline"
                          >
                            <Phone className="mt-0.5 h-4 w-4 text-white/80" />
                            <span>{office.phone}</span>
                          </a>
                        )}

                        {office.email && (
                          <Link
                            href="/contact"
                            className="flex items-start gap-2 underline-offset-2 hover:underline"
                          >
                            <Mail className="mt-0.5 h-4 w-4 text-white/80" />
                            <span>Contact via form</span>
                          </Link>
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
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold hover:bg-white/20"
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