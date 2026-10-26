import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionTag from './SectionTag';

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && contentRef.current) {
            ctx = gsap.context(() => {
              const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

              // 1. Soft atmospheric glows bloom
              tl.fromTo(
                '.leadership-glow-top',
                { opacity: 0, scale: 0.65 },
                { opacity: 1, scale: 1, duration: 2.5, ease: 'sine.out' },
                0
              );
              tl.fromTo(
                '.leadership-glow-bottom',
                { opacity: 0, scale: 0.65 },
                { opacity: 1, scale: 1, duration: 2.5, ease: 'sine.out' },
                0.2
              );

              // Ambient background slow organic breathing
              gsap.to('.leadership-glow-top', {
                x: 25,
                y: -18,
                duration: 7,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
              gsap.to('.leadership-glow-bottom', {
                x: -20,
                y: 15,
                duration: 8.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });

              // 2. Section Tag glide & reveal
              tl.fromTo(
                '.leadership-tag',
                { opacity: 0, x: -30, filter: 'blur(8px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.3, clearProps: 'all' },
                0.15
              );

              // 3. Headline & Subtitle smooth lift
              tl.fromTo(
                '.leadership-title',
                { opacity: 0, y: 32, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, clearProps: 'all' },
                0.25
              );
              tl.fromTo(
                '.leadership-subtitle',
                { opacity: 0, y: 20, filter: 'blur(6px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, clearProps: 'all' },
                0.4
              );

              // 4. Bio Paragraphs: New smooth staggered cascade
              tl.fromTo(
                '.leadership-para',
                { opacity: 0, y: 22, filter: 'blur(6px)' },
                {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: 1.25,
                  stagger: 0.16,
                  clearProps: 'all',
                },
                0.55
              );

              // 5. Mission Statement Callout slide & glow
              tl.fromTo(
                '.leadership-quote',
                { opacity: 0, x: -24, filter: 'blur(8px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.35, clearProps: 'all' },
                1.15
              );

              // 6. Portrait reveal: Smooth vertical rise with soft focal blur clearing
              tl.fromTo(
                '.leadership-portrait',
                { opacity: 0, y: 40, scale: 0.95, filter: 'blur(12px)' },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 1.6,
                  ease: 'power2.out',
                  clearProps: 'filter',
                },
                0.35
              );

              // Portrait ambient glow pulse
              tl.fromTo(
                '.leadership-portrait-glow',
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 1.8, ease: 'sine.out' },
                0.45
              );

              // Subtle, luxurious ambient floating for the portrait
              gsap.to('.leadership-portrait', {
                y: -6,
                duration: 4.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 2.0,
              });
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
      id="leadership"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#020B18] flex items-center py-8 sm:py-10 lg:py-12 text-white border-t border-slate-800/80"
    >
      {/* ── Ambient Glows: Pure dark theme (#020B18) with organic breathing lighting ── */}
      <div className="leadership-glow-top absolute -top-24 right-1/4 w-[420px] h-[420px] bg-gradient-to-br from-[#0078B8]/15 via-[#00A8CC]/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="leadership-glow-bottom absolute -bottom-24 left-10 w-[380px] h-[380px] bg-gradient-to-tr from-[#002B49]/40 via-sky-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* ── Main Content Container ── */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Leadership Narrative, Bio & Pedigree ── */}
          <div className="lg:col-span-7 xl:col-span-7 pl-3 sm:pl-5 lg:pl-4">
            {/* Tag: FOUNDER & LEADERSHIP using SectionTag */}
            <div className="leadership-tag mb-2.5 sm:mb-3">
              <SectionTag text="Founder & Leadership" variant="green" isDark={true} />
            </div>

            {/* Executive Headline: Dr. Kavya Kadam in elegant Playfair serif */}
            <div className="mb-3 sm:mb-4">
              <h2 className="leadership-title text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.15] mb-3 sm:mb-3.5 font-serif">
                Dr. Kavya Kadam
              </h2>

              <p className="leadership-subtitle text-xs sm:text-sm lg:text-[15px] font-medium text-sky-400 font-sans tracking-wide">
                Clinical Trial & Development Consultant <span className="text-sky-300/50 mx-1.5">|</span> Clinical Operations Leader
              </p>
            </div>

            {/* Bio Narrative & Credentials: Smooth staggered cascade */}
            <div className="w-full max-w-[710px] space-y-2.5">
              <p className="leadership-para text-slate-200 text-sm sm:text-[14.5px] lg:text-[15px] leading-relaxed font-sans font-normal">
                Dr. Kavya Kadam is a medically qualified clinical research professional with over 20 years of experience across clinical operations, clinical trial management, project leadership and product development.
              </p>

              <p className="leadership-para text-slate-300 text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed font-sans">
                A former Head of Global Clinical Operations, she has led and overseen teams across geographies, worked with investigators and sponsors, and coordinated multiple specialist functions involved in clinical trial delivery.
              </p>

              <p className="leadership-para text-slate-300 text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed font-sans">
                Her expertise combines detailed study planning, operational execution, risk management, budget and timeline oversight, team development and process improvement. She has also contributed to the establishment of clinical operations departments, Phase I and TQT facilities, feasibility databases, investigator databases and structured operational workflows.
              </p>

              <p className="leadership-para text-slate-300 text-[13px] sm:text-[13.5px] lg:text-[14px] leading-relaxed font-sans">
                An alumna of Seth GS Medical College and KEM Hospital, Mumbai, and SP Jain Global School of Management, she brings together medical training and executive business education to bridge clinical, operational and organisational priorities.
              </p>

              {/* Mission Statement Callout */}
              <div className="leadership-quote border-l-2 border-sky-400/80 bg-sky-500/5 rounded-r-xl pl-3.5 pr-4 py-2 text-sky-200 text-xs sm:text-[13.5px] lg:text-[14px] font-medium leading-relaxed font-sans !mt-3.5 sm:!mt-4">
                “Through kRa Life Sciences, she aims to make clinical development more integrated, accountable and execution-focused.”
              </div>
            </div>
          </div>

          {/* Right Column: Clean Dr. Kavya Kadam Portrait on Dark Navy Background ── */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end items-center">
            <div className="leadership-portrait relative group">
              {/* Subtle ambient back-glow behind portrait */}
              <div className="leadership-portrait-glow absolute inset-0 bg-sky-500/15 rounded-3xl blur-2xl -z-10 group-hover:bg-sky-400/20 transition-all duration-500" />

              <div className="relative rounded-2xl overflow-hidden border border-sky-500/20 shadow-[0_15px_40px_rgba(0,10,25,0.7)] bg-[#020B18]">
                <img
                  src="/kavya-leader.jpg"
                  alt="Dr. Kavya Kadam - Founder & Leadership"
                  className="w-full max-w-[290px] sm:max-w-[340px] lg:max-w-[395px] xl:max-w-[420px] h-auto object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Gentle bottom edge gradient blend */}
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#020B18] via-[#020B18]/60 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
