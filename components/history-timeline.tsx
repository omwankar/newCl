'use client';

import { TimelineEvent } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';

interface HistoryTimelineProps {
  events: TimelineEvent[];
}

export function HistoryTimeline({ events }: HistoryTimelineProps) {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) {
            setVisibleItems((prev) => ({ ...prev, [index]: true }));
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    itemRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [events.length]);

  return (
    <section className="py-16 md:py-24">
      <div className="app-container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Our Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Three decades of innovation and excellence in global logistics
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {events.map((event, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === events.length - 1;
            const isVisible = !!visibleItems[index];
            const delay = `${index * 80}ms`;
            return (
              <div
                key={event.id}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                data-index={index}
                className={`tl-item grid grid-cols-[32px_1fr] md:grid-cols-[1fr_40px_1fr] gap-3 md:gap-5 items-start ${isVisible ? 'visible' : ''}`}
              >
                <div className={`hidden md:block ${isEven ? 'col-[1]' : 'col-[3]'}`}>
                  <div
                    style={{ transitionDelay: delay }}
                    className={`border border-border rounded-xl p-4 bg-white hover:border-foreground/20 transition-all duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : isEven
                          ? 'opacity-0 translate-x-7'
                          : 'opacity-0 -translate-x-7'
                    }`}
                  >
                    <div className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border mb-2">
                      {event.year}
                    </div>
                    <h3 className="text-sm font-medium text-foreground mb-1">{event.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>

                <div className="col-[1] md:col-[2] flex flex-col items-center mt-4">
                  <div
                    style={{ transitionDelay: delay }}
                    className={`relative w-3 h-3 rounded-full border-2 border-border bg-background transition-transform duration-[350ms] ease-[cubic-bezier(.34,1.56,.64,1)] ${
                      isVisible ? 'scale-100' : 'scale-0'
                    }`}
                  >
                    {isVisible && <span className="absolute inset-0 rounded-full animate-tl-dot-ring" />}
                  </div>
                  {!isLast && (
                    <div
                      style={{ transitionDelay: delay }}
                      className={`w-px flex-1 min-h-16 bg-border mt-1 origin-top transition-transform duration-[500ms] ease-out ${
                        isVisible ? 'scale-y-100' : 'scale-y-0'
                      }`}
                    />
                  )}
                </div>

                <div className="col-[2] md:hidden">
                  <div
                    style={{ transitionDelay: delay }}
                    className={`border border-border rounded-xl p-4 bg-white hover:border-foreground/20 transition-all duration-[450ms] ease-[cubic-bezier(.22,1,.36,1)] ${
                      isVisible
                        ? 'opacity-100 translate-x-0'
                        : isEven
                          ? 'opacity-0 translate-x-7'
                          : 'opacity-0 -translate-x-7'
                    }`}
                  >
                    <div className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border mb-2">
                      {event.year}
                    </div>
                    <h3 className="text-sm font-medium text-foreground mb-1">{event.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>

                <div className={`hidden md:block ${isEven ? 'col-[3]' : 'col-[1]'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
