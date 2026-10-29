import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionTag from './SectionTag';

export default function WhyKra() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            ctx = gsap.context(() => {
              const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

              // 1. Slow ambient background glow breathing bloom
              tl.fromTo(
                '.why-ambient-glow',
                { opacity: 0, scale: 0.65 },
                { opacity: 1, scale: 1, duration: 2.8, ease: 'sine.out', clearProps: 'all' },
                0
              );

              // 2. Background graphic slow cinematic float & zoom-out
              tl.fromTo(
                '.why-bg-graphic',
                { opacity: 0, scale: 1.07 },
                { opacity: 0.85, scale: 1, duration: 2.6, ease: 'power2.out', clearProps: 'transform' },
                0
              );

              // 3. Section Tag: Smooth glide from left with soft blur clearance
              tl.fromTo(
                '.why-tag-reveal',
                { opacity: 0, x: -24, filter: 'blur(8px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.25, ease: 'power3.out', clearProps: 'all' },
                0.2
              );

              // 4. Headline lines: Staggered cinematic reveal with upward drift and blur clearance
              tl.fromTo(
                '.why-headline-line',
                { opacity: 0, y: 35, filter: 'blur(8px)' },
                {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: 1.35,
                  stagger: 0.16,
                  ease: 'power3.out',
                  clearProps: 'all',
                },
                0.4
              );

              // 5. Description Paragraph: Smooth fade & gentle lift
              tl.fromTo(
                '.why-desc-reveal',
                { opacity: 0, y: 22, filter: 'blur(4px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', clearProps: 'all' },
                0.7
              );

              // 6. Bento Grid Cards: 3D perspective depth glide with stagger
              tl.fromTo(
                '.why-card-reveal',
                {
                  opacity: 0,
                  y: 38,
                  scale: 0.94,
                  rotateX: 7,
                  transformPerspective: 1200,
                  filter: 'blur(8px)',
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  filter: 'blur(0px)',
                  duration: 1.35,
                  stagger: 0.14,
                  ease: 'power3.out',
                  clearProps: 'all',
                },
                0.85
              );

              // 7. Interactive Live Counter animation for 20+ Years Experience
              const counterObj = { val: 0 };
              tl.to(
                counterObj,
                {
                  val: 20,
                  duration: 1.8,
                  ease: 'power2.out',
                  onUpdate: () => {
                    if (counterRef.current) {
                      counterRef.current.textContent = `${Math.floor(counterObj.val)}+`;
                    }
                  },
                },
                1.1
              );
            }, contentRef);

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
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="why-kra"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#020B18] pt-10 sm:pt-11 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 text-white border-t border-slate-800/80"
    >
      {/* ── Background Graphic: Covers the Entire Section Edge-to-Edge with Slow Scale Float ── */}
      <div className="why-bg-graphic absolute inset-0 bg-[url('/whykraback.png')] bg-cover bg-no-repeat bg-[center_right] lg:bg-right pointer-events-none opacity-85 origin-center" />

      {/* ── Section Gradient Overlays: Ensure Text Contrast on Left & Smooth Transitions Top/Bottom ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020B18] via-[#020B18]/90 sm:via-[#020B18]/75 md:via-[#020B18]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020B18] via-transparent to-[#020B18] pointer-events-none" />

      {/* ── Ambient Glow Accents: Slow Breathing Bloom Entrance ── */}
      <div className="why-ambient-glow absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#0078B8]/15 via-[#00A8CC]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="why-ambient-glow absolute bottom-10 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-[#002B49]/30 via-sky-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* ── Main Content Container (Direct in Section - No Outer Box Card) ── */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Tag */}
        <div className="why-tag-reveal mb-3.5 sm:mb-4">
          <SectionTag
            text="Why kRa Life Sciences"
            variant="green"
            isDark={true}
          />
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[33px] xl:text-[35px] font-semibold text-white tracking-tight leading-[1.22] font-serif">
            <span className="why-headline-line block">Clinical Understanding. Operational Discipline.</span>
            <span className="why-headline-line block bg-gradient-to-r from-[#00C4FF] via-[#00A8CC] to-[#38BDF8] bg-clip-text text-transparent mt-1">
              One Coordinated Approach.
            </span>
          </h2>
        </div>

        {/* ── 5 Pillar Cards: 3 on Top, 2 Below ── */}
        <div className="space-y-4 sm:space-y-5">
          {/* Row 1: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {/* Card 1: The Golden Triad */}
            <div className="why-card-reveal relative rounded-2xl pt-6 sm:pt-7 px-5 sm:px-5.5 xl:px-6 pb-10 sm:pb-12 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group">
              <div className="flex items-center justify-between mb-4 h-7">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/50 text-sky-300 bg-sky-950/50 font-sans">
                  THE GOLDEN TRIAD
                </span>

                {/* Cyan Triad Molecule Icon */}
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="5" r="3" />
                  <circle cx="5" cy="18" r="3" />
                  <circle cx="19" cy="18" r="3" />
                  <line x1="7.5" y1="16.5" x2="10" y2="7.5" />
                  <line x1="16.5" y1="16.5" x2="14" y2="7.5" />
                  <line x1="8" y1="18" x2="16" y2="18" />
                </svg>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug mb-2 sm:mb-2.5">
                Quality, Timeline and Cost Focus
              </h3>
              <p className="text-slate-300 text-xs sm:text-[12.8px] leading-relaxed font-sans text-justify tracking-[-0.03em]">
                A disciplined focus on study quality, recruitment timelines, budget management and operational efficiency throughout execution.
              </p>
            </div>

            {/* Card 2: Dual-Competence Model */}
            <div className="why-card-reveal relative rounded-2xl pt-6 sm:pt-7 px-5 sm:px-5.5 xl:px-6 pb-10 sm:pb-12 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group">
              <div className="flex items-center justify-between mb-4 h-7">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/50 text-sky-300 bg-sky-950/50 font-sans">
                  DUAL-COMPETENCE MODEL
                </span>

                {/* Cyan Dual-Competence / Team Silhouette Icon */}
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug mb-2 sm:mb-2.5">
                Medical and Business Perspective
              </h3>
              <p className="text-slate-300 text-xs sm:text-[12.8px] leading-relaxed font-sans text-justify tracking-[-0.03em]">
                A medically qualified clinical research professional with executive management education brings together scientific understanding, operational judgement and business priorities.
              </p>
            </div>

            {/* Card 3: Sponsor & Investigator */}
            <div className="why-card-reveal relative rounded-2xl pt-6 sm:pt-7 px-5 sm:px-5.5 xl:px-6 pb-10 sm:pb-12 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group">
              <div className="flex items-center justify-between mb-4 h-7">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/50 text-sky-300 bg-sky-950/50 font-sans">
                  SPONSOR & INVESTIGATOR
                </span>

                {/* Cyan Alignment / Perspectives Exchange Icon */}
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m16 3 4 4-4 4" />
                  <path d="M20 7H4" />
                  <path d="m8 21-4-4 4-4" />
                  <path d="M4 17h16" />
                </svg>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug mb-2 sm:mb-2.5">
                Sponsor and Investigator Perspectives
              </h3>
              <p className="text-slate-300 text-xs sm:text-[12.8px] leading-relaxed font-sans text-justify tracking-[-0.03em]">
                An understanding of both sponsor expectations and investigator/site realities helps anticipate execution challenges and align teams more effectively.
              </p>
            </div>
          </div>

          {/* Row 2: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch">
            {/* Card 4: Proactive Foresight */}
            <div className="why-card-reveal relative rounded-2xl pt-6 sm:pt-7 px-6 sm:px-7 pb-10 sm:pb-12 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group">
              <div className="flex items-center justify-between mb-4 h-7">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/50 text-sky-300 bg-sky-950/50 font-sans">
                  PROACTIVE FORESIGHT
                </span>

                {/* Cyan Alert Triangle Icon */}
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug mb-2 sm:mb-2.5">
                Planning That Anticipates Risk
              </h3>
              <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed font-sans text-justify tracking-tight">
                Detailed planning, early gap identification and structured milestone reviews help teams address potential issues before they affect study progress.
              </p>
            </div>

            {/* Card 5: Unified Governance */}
            <div className="why-card-reveal relative rounded-2xl pt-6 sm:pt-7 px-6 sm:px-7 pb-10 sm:pb-12 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group">
              <div className="flex items-center justify-between mb-4 h-7">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/50 text-sky-300 bg-sky-950/50 font-sans">
                  UNIFIED GOVERNANCE
                </span>

                {/* Cyan Network Nodes Icon */}
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug mb-2 sm:mb-2.5">
                Connected Teams, Clear Accountability
              </h3>
              <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed font-sans text-justify tracking-tight">
                A coordinated approach to vendors, functions and project teams keeps responsibilities and deliverables aligned with programme objectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
