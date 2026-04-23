'use client';

import { TimelineEvent } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';

interface HistoryTimelineProps {
  events: TimelineEvent[];
}

interface TimelineItemState {
  isVisible: boolean;
  dotAnimated: boolean;
  cardAnimated: boolean;
}

export function HistoryTimeline({ events }: HistoryTimelineProps) {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [itemStates, setItemStates] = useState<Record<number, TimelineItemState>>({});
  const palette = [
    { bg: '#FAECE7', edge: '#D85A30', text: '#993C1D', fill: '#F0997B' },
    { bg: '#E6F1FB', edge: '#378ADD', text: '#185FA5', fill: '#85B7EB' },
    { bg: '#E1F5EE', edge: '#1D9E75', text: '#0F6E56', fill: '#5DCAA5' },
    { bg: '#FAEEDA', edge: '#BA7517', text: '#854F0B', fill: '#FAC775' },
    { bg: '#EEEDFE', edge: '#7F77DD', text: '#534AB7', fill: '#AFA9EC' },
    { bg: '#FBEAF0', edge: '#D4537E', text: '#993556', fill: '#ED93B1' },
    { bg: '#EAF3DE', edge: '#639922', text: '#3B6D11', fill: '#97C459' },
  ] as const;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) {
            setItemStates((prev) => ({
              ...prev,
              [index]: {
                isVisible: true,
                dotAnimated: false,
                cardAnimated: false,
              },
            }));

            setTimeout(() => {
              setItemStates((prev) => ({
                ...prev,
                [index]: { ...prev[index], dotAnimated: true },
              }));
            }, 100);

            setTimeout(() => {
              setItemStates((prev) => ({
                ...prev,
                [index]: { ...prev[index], cardAnimated: true },
              }));
            }, 200);
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [events.length]);

  const getStyle = (index: number) => palette[index % palette.length];

  const Illustration = ({ index }: { index: number }) => {
    const s = getStyle(index);
    const shape = index % 5;
    return (
      <svg width="100%" viewBox="0 0 520 110" style={{ display: 'block' }} aria-hidden>
        <rect width="520" height="110" fill={s.bg} />
        <rect x="0" y="0" width="4" height="110" fill={s.edge} />
        {shape === 0 && (
          <>
            <rect x="332" y="30" width="70" height="64" rx="4" fill={s.fill} />
            <rect x="412" y="48" width="56" height="46" rx="4" fill={s.edge} opacity="0.7" />
            <rect x="350" y="44" width="14" height="16" rx="2" fill={s.text} />
            <rect x="371" y="44" width="14" height="16" rx="2" fill={s.text} />
            <rect x="392" y="44" width="14" height="16" rx="2" fill={s.text} />
            <rect x="344" y="94" width="150" height="12" fill="#D3D1C7" />
          </>
        )}
        {shape === 1 && (
          <>
            <rect x="304" y="55" width="96" height="34" rx="5" fill={s.fill} />
            <rect x="400" y="60" width="40" height="29" rx="5" fill={s.edge} />
            <circle cx="324" cy="95" r="8" fill={s.text} />
            <circle cx="410" cy="95" r="8" fill={s.text} />
            <circle cx="430" cy="95" r="8" fill={s.text} />
            <rect x="288" y="100" width="210" height="10" fill="#B4B2A9" />
          </>
        )}
        {shape === 2 && (
          <>
            <path d="M290 84 Q325 70 360 84 Q395 98 430 84 Q465 70 500 84 L500 110 L290 110Z" fill={s.fill} />
            <path d="M305 76 L488 76 L476 98 L318 98 Z" fill={s.text} />
            <rect x="328" y="43" width="108" height="35" rx="4" fill={s.edge} />
            <rect x="436" y="29" width="35" height="49" rx="4" fill={s.text} />
            <rect x="334" y="50" width="24" height="20" rx="2" fill={s.fill} />
            <rect x="363" y="50" width="24" height="20" rx="2" fill="#EF9F27" />
            <rect x="392" y="50" width="24" height="20" rx="2" fill="#378ADD" />
          </>
        )}
        {shape === 3 && (
          <>
            <ellipse cx="394" cy="58" rx="82" ry="15" fill={s.fill} />
            <polygon points="352,58 371,39 423,51 400,58" fill={s.edge} />
            <polygon points="352,58 371,77 400,70 400,58" fill={s.edge} />
            <polygon points="312,58 322,39 342,58" fill={s.fill} />
            <rect x="458" y="38" width="42" height="20" rx="4" fill={s.edge} />
            <rect x="458" y="38" width="42" height="20" rx="4" fill={s.edge} opacity="0.3" />
            <path d="M312 58 Q282 50 250 55 Q230 58 210 52" fill="none" stroke={s.fill} strokeWidth="2" strokeDasharray="6 4" />
          </>
        )}
        {shape === 4 && (
          <>
            <circle cx="390" cy="58" r="40" fill={s.fill} />
            <circle cx="390" cy="58" r="40" fill="none" stroke={s.edge} strokeWidth="1.5" />
            <ellipse cx="390" cy="58" rx="40" ry="13" fill="none" stroke={s.edge} strokeWidth="1" opacity="0.6" />
            <line x1="390" y1="18" x2="390" y2="98" stroke={s.edge} strokeWidth="1" opacity="0.7" />
            <circle cx="375" cy="40" r="4" fill={s.text} />
            <circle cx="408" cy="53" r="4" fill={s.text} />
            <circle cx="388" cy="74" r="4" fill={s.text} />
            <circle cx="440" cy="26" r="17" fill={s.edge} />
          </>
        )}
      </svg>
    );
  };

  return (
    <section className="py-10 md:py-14">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .tl-card-group:hover {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .tl-card-group::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 3s infinite;
        }
      `}</style>
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-2">
        <h2 className="sr-only">Our Journey — three decades of innovation in global logistics</h2>
        <div className="mb-7 text-center">
          <div className="mb-2 text-[11px] font-medium tracking-[0.1em] text-muted-foreground">SINCE 1990</div>
          <div className="mb-1 text-[26px] font-medium text-foreground">Our Journey</div>
          <div className="text-[13px] text-muted-foreground">Three decades of innovation in global logistics</div>
        </div>

        <div className="relative mx-auto max-w-[980px]">
          <div className="absolute bottom-4 left-1/2 top-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-border via-border to-transparent" />
          {events.map((event, index) => {
            const state = itemStates[index] || { isVisible: false, dotAnimated: false, cardAnimated: false };
            const isLeft = index % 2 === 0;
            const isVisible = state.isVisible;
            const s = getStyle(index);
            return (
              <div
                key={event.id}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                data-index={index}
                className={`mb-5 flex items-stretch transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                  isLeft ? 'flex-row-reverse' : 'flex-row'
                } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`absolute left-1/2 top-4 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] ${
                    state.dotAnimated ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`}
                  style={{ transitionDelay: `${120 + index * 100}ms` }}
                >
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
                    <circle cx="11" cy="11" r="10" fill={s.bg} stroke={s.edge} strokeWidth="1.5" />
                    <circle
                      cx="11"
                      cy="11"
                      r="10"
                      fill="none"
                      stroke={s.edge}
                      strokeWidth="1.5"
                      opacity={index === events.length - 1 ? '0.35' : '0'}
                      className={index === events.length - 1 ? 'animate-pulse' : ''}
                    />
                    <circle cx="11" cy="11" r="4" fill={s.edge} />
                  </svg>
                </div>

                <div
                  className={`w-[calc(50%-2rem)] max-w-[460px] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] max-md:w-full max-md:max-w-none ${
                    state.cardAnimated 
                      ? `translate-x-0 opacity-100` 
                      : isLeft 
                        ? 'translate-x-12 opacity-0' 
                        : '-translate-x-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="tl-card-group relative overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:border-foreground/25 hover:shadow-lg hover:shadow-foreground/5 cursor-pointer">
                    <Illustration index={index} />
                    <div className="px-[18px] pb-4 pt-3.5">
                      <div
                        className="mb-1.5 inline-block rounded-[20px] px-2.5 py-[2px] text-[11px] font-medium tracking-[0.03em]"
                        style={{ background: s.bg, color: s.text }}
                      >
                        {event.year}
                      </div>
                      <h3 className="mb-1 text-sm font-medium text-foreground">{event.title}</h3>
                      <p className="m-0 text-xs leading-[1.6] text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
