import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface StatMetricItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  description: string;
  badgeBg: string;
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const stats: StatMetricItem[] = [
    {
      id: 'years-experience',
      target: 20,
      suffix: '+',
      label: 'Years of Experience',
      description: 'Strategic clinical operations oversight',
      badgeBg: 'bg-[#EAF3FB]',
    },
    {
      id: 'clinical-studies',
      target: 50,
      suffix: '+',
      label: 'Clinical Studies Supported',
      description: 'End-to-end trial delivery & execution',
      badgeBg: 'bg-[#E6F7F2]',
    },
    {
      id: 'therapeutic-areas',
      target: 10,
      suffix: '+',
      label: 'Therapeutic Areas',
      description: 'Oncology, immunology & complex trials',
      badgeBg: 'bg-[#F0EDFC]',
    },
    {
      id: 'countries-supported',
      target: 8,
      suffix: '+',
      label: 'Countries Supported',
      description: 'Multi-jurisdictional trial governance',
      badgeBg: 'bg-[#E5F3FB]',
    },
  ];

  const getStatIcon = (id: string) => {
    switch (id) {
      case 'years-experience':
        return (
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0070BA]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2.5" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <circle cx="8" cy="14" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
            <circle cx="16" cy="14" r="1" fill="currentColor" stroke="none" />
            <circle cx="8" cy="17.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
            <circle cx="16" cy="17.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        );
      case 'clinical-studies':
        return (
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#00A884]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'therapeutic-areas':
        return (
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#7C3AED]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m8 8 8 8" />
            <path d="m9 5 2 2" />
            <path d="m13 17 2 2" />
            <path d="M14 8c1.5-1.5 3-1.5 4.5 0" />
            <path d="M5.5 16.5c1.5 1.5 3 1.5 4.5 0" />
            <path d="M18.5 5.5c-4 4-9 9-13 13" />
            <path d="M5.5 5.5c4 4 9 9 13 13" />
          </svg>
        );
      case 'countries-supported':
        return (
          <svg
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0284C7]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    let ctx: gsap.Context;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctx = gsap.context(() => {
              const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

              // Staggered reveal for metric items
              tl.fromTo(
                '.stat-metric-item',
                {
                  opacity: 0,
                  y: 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  stagger: 0.1,
                  clearProps: 'all',
                },
                0.1
              );

              // Live GSAP numerical counter
              stats.forEach((stat, index) => {
                const counterObj = { val: 0 };
                tl.to(
                  counterObj,
                  {
                    val: stat.target,
                    duration: 1.8,
                    ease: 'power2.out',
                    onUpdate: () => {
                      const el = countRefs.current[index];
                      if (el) {
                        el.textContent = Math.floor(counterObj.val).toString();
                      }
                    },
                    onComplete: () => {
                      const el = countRefs.current[index];
                      if (el) {
                        el.textContent = stat.target.toString();
                      }
                    },
                  },
                  0.2 + index * 0.08
                );
              });
            }, sectionRef);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="metrics"
      aria-label="Clinical Metrics and Track Record"
      className="relative w-full z-20 -mt-8 sm:-mt-10 lg:-mt-12 mb-1.5 sm:mb-2 lg:mb-2.5 pt-1 sm:pt-1.5 pb-0.5"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ── Floating Stats Card (Compact Reference Design) ── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_35px_rgba(0,35,80,0.05)] border border-slate-100/90 py-3.5 sm:py-4.5 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 relative">
            {stats.map((stat, idx) => (
              <div
                key={stat.id}
                className={`stat-metric-item relative flex flex-col items-center justify-center text-center px-2.5 sm:px-4 py-1.5 group ${
                  idx < 2 ? 'border-b border-sky-100/80 lg:border-b-0 pb-3 mb-2.5 lg:pb-1 lg:mb-0' : ''
                }`}
              >
                {/* ── Thin Vertical Divider Line (Matches Reference Image) ── */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-18 lg:h-22 bg-sky-100/90 pointer-events-none" />
                )}
                {/* Mobile vertical divider between col 1 and 2 */}
                {idx % 2 === 0 && (
                  <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-px h-14 bg-sky-100/90 pointer-events-none" />
                )}

                {/* ── Compact Circular Pastel Icon Badge ── */}
                <div
                  className={`w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full ${stat.badgeBg} flex items-center justify-center mb-1.5 sm:mb-2 transition-transform duration-300 group-hover:scale-110 shadow-2xs`}
                >
                  {getStatIcon(stat.id)}
                </div>

                {/* ── Refined Blue Number + Suffix (Website Primary Sans Font) ── */}
                <div className="flex items-baseline justify-center text-2xl sm:text-3xl lg:text-[36px] font-bold font-sans text-[#0060B2] tracking-tight leading-none mb-1 transition-transform duration-300 group-hover:scale-105">
                  <span
                    ref={(el) => {
                      countRefs.current[idx] = el;
                    }}
                  >
                    {stat.target}
                  </span>
                  <span className="font-semibold ml-0.5">{stat.suffix}</span>
                </div>

                {/* ── Label (Website Primary Sans Font) ── */}
                <h3 className="text-slate-800 font-sans font-semibold text-[11.5px] sm:text-[12px] lg:text-[13px] leading-snug mb-0.5">
                  {stat.label}
                </h3>

                {/* ── Subtitle / Description (Website Primary Sans Font) ── */}
                <p className="text-[10px] sm:text-[10.25px] lg:text-[10.75px] text-slate-500 font-sans mt-0.5 max-w-[190px] leading-relaxed hidden sm:block">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
