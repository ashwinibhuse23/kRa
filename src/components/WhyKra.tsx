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
      className="relative w-full overflow-hidden bg-[#020B18] pt-11 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24 text-white border-t border-slate-800/80"
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
            variant="red"
          />
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[40px] font-semibold text-white tracking-tight leading-[1.22] mb-4 font-serif">
            <span className="why-headline-line block">Clinical Understanding.</span>
            <span className="why-headline-line block">
              <span className="bg-gradient-to-r from-[#00C4FF] via-[#00A8CC] to-[#38BDF8] bg-clip-text text-transparent">
                Operational Discipline.
              </span>
            </span>
            <span className="why-headline-line block">One Coordinated Approach.</span>
          </h2>

          <p className="why-desc-reveal text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-sans">
            We bridge medical science, executive leadership, and on-the-ground operational execution to keep complex clinical programmes predictable, compliant, and moving forward.
          </p>
        </div>

        {/* ── Cards Bento Grid ── */}
        <div className="space-y-4 sm:space-y-5">
          {/* Row 1: 20+ Years Track Record (5 cols) & Dual-Competence Model (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            {/* Card 1: Global Track Record */}
            <div className="why-card-reveal lg:col-span-5 relative rounded-2xl p-6 sm:p-7 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/50 text-sky-300 bg-sky-950/50 font-sans">
                  GLOBAL TRACK RECORD
                </span>

                {/* 3 Vertical Bars (Analytics / Bar Chart) in Cyan */}
                <svg
                  className="w-6 h-6 text-sky-400 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <rect x="3" y="13" width="4" height="8" rx="1" />
                  <rect x="10" y="8" width="4" height="13" rx="1" />
                  <rect x="17" y="3" width="4" height="18" rx="1" />
                </svg>
              </div>

              <div>
                <div className="flex items-baseline gap-2.5 mb-2">
                  <span
                    ref={counterRef}
                    className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-sans"
                  >
                    20+
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-sky-400 font-sans">
                    Years
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white font-serif mb-2">
                  Clinical Research Experience
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13.5px] leading-relaxed font-sans">
                  Leadership experience spanning clinical operations, project management, team management and clinical development across multiple geographies.
                </p>
              </div>
            </div>

            {/* Card 2: Dual-Competence Model */}
            <div className="why-card-reveal lg:col-span-7 relative rounded-2xl p-6 sm:p-7 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group overflow-hidden">
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/50 text-sky-300 bg-sky-950/50 font-sans">
                  DUAL-COMPETENCE MODEL
                </span>

                {/* 3 People Silhouette Icon in Cyan */}
                <svg
                  className="w-6 h-6 text-sky-400 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>

              <div>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white font-serif mb-2">
                  Medical and Business Perspective
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13.5px] leading-relaxed font-sans">
                  A medically qualified clinical research professional with executive management education brings together scientific understanding, operational judgement and business priorities.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2: 3 Proportional Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            {/* Card 3: Sponsor & Investigator */}
            <div className="why-card-reveal relative rounded-2xl p-6 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group">
              <div className="mb-4">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/50 text-sky-300 bg-sky-950/50 font-sans">
                  SPONSOR & INVESTIGATOR
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug mb-2">
                  Sponsor and Investigator Perspectives
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed font-sans">
                  An understanding of both sponsor expectations and investigator/site realities helps anticipate execution challenges and align teams more effectively.
                </p>
              </div>
            </div>

            {/* Card 4: Proactive Foresight */}
            <div className="why-card-reveal relative rounded-2xl p-6 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-rose-500/50 text-rose-300 bg-rose-950/50 font-sans">
                  PROACTIVE FORESIGHT
                </span>

                {/* Cyan Alert Triangle Icon */}
                <svg
                  className="w-6 h-6 text-sky-400 shrink-0"
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

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug mb-2">
                  Planning That Anticipates Risk
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed font-sans">
                  Detailed planning, early gap identification and structured milestone reviews help teams address potential issues before they affect study progress.
                </p>
              </div>
            </div>

            {/* Card 5: Unified Governance */}
            <div className="why-card-reveal relative rounded-2xl p-6 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex flex-col group">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-sky-400/50 text-sky-300 bg-sky-950/50 font-sans">
                  UNIFIED GOVERNANCE
                </span>

                {/* Cyan Network Nodes Icon */}
                <svg
                  className="w-6 h-6 text-sky-400 shrink-0"
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

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-serif leading-snug mb-2">
                  Connected Teams, Clear Accountability
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed font-sans">
                  A coordinated approach to vendors, functions and project teams keeps responsibilities and deliverables aligned with programme objectives.
                </p>
              </div>
            </div>
          </div>

          {/* Row 3: The Golden Triad (Full Width Pill Banner) */}
          <div className="why-card-reveal relative rounded-2xl p-4 sm:px-6 sm:py-4.5 bg-[#05152b]/85 border border-sky-500/30 hover:border-sky-400/70 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgba(2,11,24,0.6)] flex items-center justify-between group">
            <div className="flex items-center gap-3.5 sm:gap-4">
              {/* Left Cyan Network Molecule Icon */}
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/40 flex items-center justify-center text-sky-400 shrink-0 shadow-[0_0_12px_rgba(0,168,204,0.25)]">
                <svg
                  className="w-5 h-5 text-sky-400"
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

              <div className="flex flex-col pr-3">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-400 font-sans">
                  THE GOLDEN TRIAD
                </span>
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white font-serif mb-1">
                  Quality, Timeline and Cost Focus
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed font-sans max-w-2xl">
                  A disciplined focus on study quality, recruitment timelines, budget management and operational efficiency throughout execution.
                </p>
              </div>
            </div>

            {/* Right Action Button with Arrow Chevron */}
            <a
              href="#contact"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00A8CC] hover:bg-[#00c4ff] flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,168,204,0.5)] group-hover:scale-105 transition-all shrink-0"
              aria-label="Contact kRa Life Sciences regarding Golden Triad"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
