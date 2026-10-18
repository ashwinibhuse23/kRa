import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionTag from './SectionTag';

export default function PastExperience() {
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



              tl.fromTo(
                '.past-narrative',
                { opacity: 0, y: 25, filter: 'blur(6px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, clearProps: 'all' },
                0.2
              );

              tl.fromTo(
                '.past-exp-item',
                { opacity: 0, x: 20, filter: 'blur(6px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.1, clearProps: 'all' },
                0.35
              );
            }, sectionRef);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      ctx?.revert();
    };
  }, []);

  const priorExperienceItems = [
    {
      label: 'Clinical operations and site management',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: 'Project management and programme oversight',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      label: 'Medical writing and clinical documentation',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
    },
    {
      label: 'Medical monitoring and safety management',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l2.5-3 3 5 2-2 2.5 2" />
        </svg>
      ),
    },
    {
      label: 'Data management and statistical analysis',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
    },
    {
      label: 'Clinical reporting, finance and clinical technology',
      icon: (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <circle cx="12" cy="12" r="2.5" strokeWidth={2} />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full overflow-hidden py-9 sm:py-11 lg:py-13 border-t border-slate-200/90 font-sans text-slate-900 bg-white"
    >
      {/* ── Background Image Canvas: pastcollabback.png ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <img
          src="/pastcollabback.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">

          {/* ════ Left Column: Narrative & Header ════ */}
          <div className="past-narrative lg:col-span-7 xl:col-span-7 flex flex-col justify-center pl-3 sm:pl-5 lg:pl-7 xl:pl-8">
            {/* Top Section Tag */}
            <div>
              <SectionTag text="Past Collaborations &amp; Experience" variant="red" />
            </div>

            {/* Main Heading */}
            <h2 className="mt-1.5 sm:mt-2 mb-3 sm:mb-3.5 text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-semibold text-slate-900 tracking-tight leading-[1.24] font-serif">
              Bringing the Right Expertise Together <br />
              <span className="bg-gradient-to-r from-[#0078B8] via-[#0094C6] to-[#00A8CC] bg-clip-text text-transparent">
                To Deliver Clinical Programmes
              </span>
            </h2>

            {/* Paragraph 1 */}
            <p className="text-slate-600 text-xs sm:text-[13.5px] lg:text-[14px] leading-relaxed mb-3">
              Successful clinical development depends on the effective integration of people, processes, specialist expertise and technology.
            </p>

            {/* Paragraph 2 */}
            <p className="text-slate-600 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed mb-3">
              Across previous leadership and consulting engagements, <strong className="font-semibold text-slate-800">Dr. Kavya Appaiah</strong> has worked with and overseen cross-functional teams and vendors covering clinical operations, project management, medical writing, medical monitoring, data management, pharmacovigilance, statistical analysis, clinical reporting, finance and clinical technology.
            </p>

            {/* Paragraph 3 */}
            <p className="text-slate-600 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed mb-4 sm:mb-4.5">
              Her experience includes working across <strong className="font-semibold text-[#0078B8]">sponsor-side and investigator-side</strong> requirements, supporting study execution and developing operational frameworks that improve coordination and delivery.
            </p>

            {/* Bottom Highlight Pill Card */}
            <div className="group flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-2xl bg-[#EAF5FB]/90 border border-sky-100 shadow-2xs hover:shadow-xs transition-all">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#00A8CC]/20 text-[#0078B8] flex items-center justify-center shrink-0">
                  <svg className="w-4.5 h-4.5 text-[#0078B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-[11.5px] sm:text-[12.5px] font-medium text-slate-700 leading-snug">
                  A collaborative, integrated approach to drive high-quality clinical programmes from planning to delivery.
                </p>
              </div>
              <svg className="w-4 h-4 text-[#0078B8] shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* ════ Right Column: Experience Items ════ */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
            <h3 className="font-sans font-bold text-[#002B49] text-xs sm:text-[13.5px] mb-2 sm:mb-2.5 tracking-tight">
              Areas of prior experience include:
            </h3>

            <div className="space-y-1 sm:space-y-1.5">
              {priorExperienceItems.map((item, idx) => (
                <div
                  key={idx}
                  className="past-exp-item group flex items-center justify-between gap-2.5 py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-sky-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <div className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-cyan-50/90 border border-cyan-100/90 text-[#0078B8] flex items-center justify-center shrink-0 group-hover:bg-[#0078B8] group-hover:text-white transition-all shadow-2xs">
                      {item.icon}
                    </div>
                    <span className="text-[11px] sm:text-[11.5px] xl:text-xs font-semibold text-slate-800 leading-snug group-hover:text-[#0078B8] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-[#0078B8] group-hover:translate-x-0.5 transition-all shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
