import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SectionTag from './SectionTag';

export default function Expertise() {
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

              // 1. Ambient glows
              tl.fromTo(
                '.exp-glow',
                { opacity: 0, scale: 0.7 },
                { opacity: 1, scale: 1, duration: 2.2, ease: 'sine.out' },
                0
              );

              // 2. Header
              tl.fromTo(
                '.exp-header-text',
                { opacity: 0, y: 25, filter: 'blur(6px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, clearProps: 'all' },
                0.15
              );


              // 4. Staggered 4 columns
              tl.fromTo(
                '.exp-col-card',
                { opacity: 0, y: 35, filter: 'blur(8px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, stagger: 0.15, clearProps: 'all' },
                0.55
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

  const studyTypesList = [
    'Phase I, II, III and IV trials',
    'Proof-of-concept & dose-escalation studies',
    'BA/BE studies',
    'Thorough QT (TQT) studies',
    'Stem cell studies',
    'Pre-clinical programme set-up and post-marketing',
    '505(b)(2) development',
  ];

  const therapeuticAreasList = [
    'Oncology',
    'Cardiology',
    'Respiratory medicine',
    'Haematology',
    'Gastroenterology',
    'Musculoskeletal conditions',
    'Neuropsychiatry',
    'Immunology',
    'Dermatology',
    'Stem cell therapies',
  ];

  const productsList = [
    'Biosimilars',
    'Monoclonal antibodies (mAbs)',
    'Vaccines',
    'Generic products',
    'Stem cell products',
    'Medical devices',
    'Oral and injectable routes',
  ];

  const geographicList = [
    'Leadership and coordination of teams, investigators, sites and specialist vendors across multiple geographies.',
  ];

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#F2F8FC] via-white to-[#F8FAFC] py-10 sm:py-12 lg:py-14 border-t border-slate-200/90 font-sans text-slate-900"
    >


      {/* Ambient background glows */}
      <div className="exp-glow absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-sky-200/40 via-blue-100/20 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="exp-glow absolute bottom-0 left-10 w-[450px] h-[350px] bg-gradient-to-tr from-sky-100/40 via-blue-50/30 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* ── Header Area: Left Text Content ── */}
        <div className="exp-header-text max-w-3xl mb-8 sm:mb-10 relative z-10">
          <div>
            <SectionTag text="Experience &amp; Therapeutic Expertise" variant="red" />
          </div>

          <h2 className="mt-1.5 sm:mt-2 mb-2.5 sm:mb-3 text-xl sm:text-2xl lg:text-[30px] xl:text-[33px] font-semibold text-slate-900 tracking-tight leading-[1.24] font-serif">
            Broad Clinical Research Experience <br />
            <span className="bg-gradient-to-r from-[#0078B8] via-[#0094C6] to-[#00A8CC] bg-clip-text text-transparent">
              Across Study Types and Product Categories
            </span>
          </h2>

          <p className="mt-2 sm:mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Dr. Kavya Appaiah&apos;s experience spans multiple clinical research settings, study phases, therapeutic areas and product categories.
          </p>
        </div>

        {/* ── 4 Modern Illustrated Cards (Compact, Reduced Height Design) ── */}
        <div className="relative pt-1 sm:pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4.5 lg:gap-4 xl:gap-5 items-stretch relative z-10">

            {/* ════ Card 1: Study Types (Blue Theme) ════ */}
            <div className="exp-col-card group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden pt-3.5 px-4 pb-0">
              {/* Top-Left Curved Blue Corner Wave (Slightly reduced compact size) */}
              <div className="absolute top-0 left-0 w-[46px] h-[46px] bg-gradient-to-br from-[#0078B8] to-[#0284C7] rounded-br-[22px] pointer-events-none" />

              <div>
                {/* Header: Blue Circular Icon & Title */}
                <div className="flex items-center gap-2 mb-3.5 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#0078B8] text-white flex items-center justify-center shrink-0 ring-2 ring-white shadow-xs group-hover:scale-105 transition-transform -mt-0.5 -ml-0.5">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                      <path d="m9 14 2 2 4-4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 pl-3.5">
                    <h4 className="text-[15px] font-bold text-[#002B49] leading-tight tracking-tight">
                      Study Types
                    </h4>
                  </div>
                </div>

                {/* List Items with Compact Circular Icon Badges */}
                <div className="space-y-0 relative z-10 pt-4">
                  {/* 1. Phases */}
                  <div className="flex items-center gap-2 py-0.5 border-b border-slate-100/80 group/item">
                    <div className="w-4.5 h-4.5 rounded-full bg-sky-50 text-[#0078B8] flex items-center justify-center shrink-0 group-hover/item:bg-[#0078B8] group-hover/item:text-white transition-all">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-[11.5px] font-medium text-slate-700 leading-tight group-hover/item:text-slate-900 transition-colors">
                      Phase I, II, III and IV trials
                    </span>
                  </div>

                  {/* 2. Proof of Concept */}
                  <div className="flex items-center gap-2 py-0.5 border-b border-slate-100/80 group/item">
                    <div className="w-4.5 h-4.5 rounded-full bg-sky-50 text-[#0078B8] flex items-center justify-center shrink-0 group-hover/item:bg-[#0078B8] group-hover/item:text-white transition-all">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <circle cx="12" cy="12" r="2.5" strokeWidth={2} />
                      </svg>
                    </div>
                    <span className="text-[11.5px] font-medium text-slate-700 leading-tight group-hover/item:text-slate-900 transition-colors">
                      Proof-of-concept &amp; dose-escalation
                    </span>
                  </div>

                  {/* 3. BA/BE studies */}
                  <div className="flex items-center gap-2 py-0.5 border-b border-slate-100/80 group/item">
                    <div className="w-4.5 h-4.5 rounded-full bg-sky-50 text-[#0078B8] flex items-center justify-center shrink-0 group-hover/item:bg-[#0078B8] group-hover/item:text-white transition-all">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-[11.5px] font-medium text-slate-700 leading-tight group-hover/item:text-slate-900 transition-colors">
                      BA/BE studies
                    </span>
                  </div>

                  {/* 4. TQT studies */}
                  <div className="flex items-center gap-2 py-0.5 border-b border-slate-100/80 group/item">
                    <div className="w-4.5 h-4.5 rounded-full bg-sky-50 text-[#0078B8] flex items-center justify-center shrink-0 group-hover/item:bg-[#0078B8] group-hover/item:text-white transition-all">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <span className="text-[11.5px] font-medium text-slate-700 leading-tight group-hover/item:text-slate-900 transition-colors">
                      Thorough QT (TQT) studies
                    </span>
                  </div>

                  {/* 5. Stem cell studies */}
                  <div className="flex items-center gap-2 py-0.5 border-b border-slate-100/80 group/item">
                    <div className="w-4.5 h-4.5 rounded-full bg-sky-50 text-[#0078B8] flex items-center justify-center shrink-0 group-hover/item:bg-[#0078B8] group-hover/item:text-white transition-all">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="7" r="2.5" strokeWidth={2} />
                        <circle cx="7" cy="16" r="2.5" strokeWidth={2} />
                        <circle cx="17" cy="16" r="2.5" strokeWidth={2} />
                      </svg>
                    </div>
                    <span className="text-[11.5px] font-medium text-slate-700 leading-tight group-hover/item:text-slate-900 transition-colors">
                      Stem cell studies
                    </span>
                  </div>

                  {/* 6. Pre-clinical & Post-marketing */}
                  <div className="flex items-center gap-2 py-0.5 border-b border-slate-100/80 group/item">
                    <div className="w-4.5 h-4.5 rounded-full bg-sky-50 text-[#0078B8] flex items-center justify-center shrink-0 group-hover/item:bg-[#0078B8] group-hover/item:text-white transition-all">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <span className="text-[11.5px] font-medium text-slate-700 leading-tight group-hover/item:text-slate-900 transition-colors">
                      Pre-clinical &amp; post-marketing set-up
                    </span>
                  </div>

                  {/* 7. 505(b)(2) development */}
                  <div className="flex items-center gap-2 py-0.5 group/item">
                    <div className="w-4.5 h-4.5 rounded-full bg-sky-50 text-[#0078B8] flex items-center justify-center shrink-0 group-hover/item:bg-[#0078B8] group-hover/item:text-white transition-all">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-[11.5px] font-medium text-slate-700 leading-tight group-hover/item:text-slate-900 transition-colors">
                      505(b)(2) development
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Visual Wave: Clinical Stethoscope & Study Papers */}
              <div className="relative mt-2.5 -mx-4 h-20 sm:h-24 overflow-hidden rounded-b-2xl">
                <img
                  src="/card-stethoscope.jpg"
                  alt="Clinical Trial Protocol Stethoscope"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-sky-500/10 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* ════ Card 2: Therapeutic Areas (Red Theme) ════ */}
            <div className="exp-col-card group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden pt-3.5 px-4 pb-0">
              {/* Top-Left Curved Red Corner Wave (Slightly reduced compact size) */}
              <div className="absolute top-0 left-0 w-[46px] h-[46px] bg-gradient-to-br from-[#CF3838] to-[#E63946] rounded-br-[22px] pointer-events-none" />

              <div>
                {/* Header: Red Circular Icon & Title */}
                <div className="flex items-center gap-2 mb-3.5 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#CF3838] text-white flex items-center justify-center shrink-0 ring-2 ring-white shadow-xs group-hover:scale-105 transition-transform -mt-0.5 -ml-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 pl-3.5">
                    <h4 className="text-[15px] font-bold text-[#002B49] leading-tight tracking-tight">
                      Therapeutic Areas
                    </h4>
                  </div>
                </div>

                {/* List Items with Compact Circular Icon Badges */}
                <div className="space-y-0 relative z-10 pt-4">
                  {[
                    { label: 'Oncology', icon: 'M12 4v16m8-8H4' },
                    { label: 'Cardiology', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                    { label: 'Respiratory medicine', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' },
                    { label: 'Haematology', icon: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0z' },
                    { label: 'Gastroenterology', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                    { label: 'Musculoskeletal conditions', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                    { label: 'Neuropsychiatry', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                    { label: 'Immunology', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                    { label: 'Dermatology', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
                    { label: 'Stem cell therapies', icon: 'M12 8a3 3 0 100-6 3 3 0 000 6zm-7 9a3 3 0 100-6 3 3 0 000 6zm14 0a3 3 0 100-6 3 3 0 000 6z' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-0.5 border-b border-slate-100/70 last:border-0 group/item">
                      <div className="w-4.5 h-4.5 rounded-full bg-rose-50 text-[#CF3838] flex items-center justify-center shrink-0 group-hover/item:bg-[#CF3838] group-hover/item:text-white transition-all">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <span className="text-[11.5px] font-medium text-slate-700 leading-tight group-hover/item:text-slate-900 transition-colors">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Visual Wave: 3D DNA Helix */}
              <div className="relative mt-2.5 -mx-4 h-16 sm:h-20 overflow-hidden rounded-b-2xl">
                <img
                  src="/card-dna.jpg"
                  alt="DNA Double Helix"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-rose-500/10 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* ════ Card 3: Product & Technology (Blue Theme) ════ */}
            <div className="exp-col-card group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-sky-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden pt-3.5 px-4 pb-0">
              {/* Top-Left Curved Blue Corner Wave (Slightly reduced compact size) */}
              <div className="absolute top-0 left-0 w-[46px] h-[46px] bg-gradient-to-br from-[#0078B8] to-[#0284C7] rounded-br-[22px] pointer-events-none" />

              <div>
                {/* Header: Blue Circular Icon & Title */}
                <div className="flex items-center gap-2 mb-3.5 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#0078B8] text-white flex items-center justify-center shrink-0 ring-2 ring-white shadow-xs group-hover:scale-105 transition-transform -mt-0.5 -ml-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 pl-3.5">
                    <h4 className="text-[15px] font-bold text-[#002B49] leading-tight tracking-tight">
                      Product &amp; Technology
                    </h4>
                  </div>
                </div>

                {/* List Items with Compact Circular Icon Badges */}
                <div className="space-y-0 relative z-10 pt-4">
                  {[
                    { label: 'Biosimilars', icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' },
                    { label: 'Monoclonal antibodies (mAbs)', icon: 'M12 3v9m0 0l-4-4m4 4l4-4m-4 9v6' },
                    { label: 'Vaccines', icon: 'M19 14l-7 7m0 0l-3-3m3 3l7-7m-7-7l7 7m-7-7L5 14m0 0l3 3m-3-3l7 7' },
                    { label: 'Generic products', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
                    { label: 'Stem cell products', icon: 'M12 8a3 3 0 100-6 3 3 0 000 6zm-7 9a3 3 0 100-6 3 3 0 000 6zm14 0a3 3 0 100-6 3 3 0 000 6z' },
                    { label: 'Medical devices', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
                    { label: 'Oral and injectable routes', icon: 'M14 5l7 7m0 0l-7 7m7-7H3' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-0.5 border-b border-slate-100/80 last:border-0 group/item">
                      <div className="w-4.5 h-4.5 rounded-full bg-sky-50 text-[#0078B8] flex items-center justify-center shrink-0 group-hover/item:bg-[#0078B8] group-hover/item:text-white transition-all">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <span className="text-[11.5px] font-medium text-slate-700 leading-tight group-hover/item:text-slate-900 transition-colors">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Visual Wave: Sterile Vaccine Vial & Syringe */}
              <div className="relative mt-2.5 -mx-4 h-20 sm:h-24 overflow-hidden rounded-b-2xl">
                <img
                  src="/card-vial.jpg"
                  alt="Pharmaceutical Vaccine Vial"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-sky-500/10 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* ════ Card 4: Geographic & Functional (Red Theme - Proportionate Height) ════ */}
            <div className="exp-col-card group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden pt-3.5 px-4 pb-0">
              {/* Top-Left Curved Red Corner Wave (Slightly reduced compact size) */}
              <div className="absolute top-0 left-0 w-[46px] h-[46px] bg-gradient-to-br from-[#CF3838] to-[#E63946] rounded-br-[22px] pointer-events-none" />

              <div>
                {/* Header: Red Circular Icon & Title */}
                <div className="flex items-center gap-2 mb-3.5 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-[#CF3838] text-white flex items-center justify-center shrink-0 ring-2 ring-white shadow-xs group-hover:scale-105 transition-transform -mt-0.5 -ml-0.5">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0 pl-3.5">
                    <h4 className="text-[15px] font-bold text-[#002B49] leading-tight tracking-tight">
                      Geographic &amp; Functional
                    </h4>
                  </div>
                </div>

                {/* Highlight Box with Team Collaboration Icon */}
                <div className="relative z-10 pt-4">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/70 border border-rose-100/90 shadow-2xs">
                    <div className="w-7 h-7 rounded-full bg-[#CF3838] text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <p className="text-[11.5px] font-medium text-slate-700 leading-snug">
                      Leadership and coordination of teams, investigators, sites and specialist vendors across multiple geographies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Visual Wave: Dotted World Map */}
              <div className="relative mt-3 -mx-4 h-44 sm:h-48 lg:h-52 overflow-hidden rounded-b-2xl bg-gradient-to-b from-white via-rose-50/20 to-rose-50/40 flex items-center justify-center px-1">
                <img
                  src="/card-world-map.jpg"
                  alt="Global Clinical Trial Logistics Network"
                  className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle top dissolve */}
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none" />
                {/* Bottom subtle brand glow */}
                <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-rose-500/15 via-rose-500/5 to-transparent pointer-events-none" />
                {/* Global Network Badge */}
                <div className="absolute bottom-2 left-3 z-10 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs border border-rose-200/90 shadow-2xs pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CF3838] animate-pulse" />
                  <span className="text-[9.5px] font-semibold text-[#CF3838] tracking-wider uppercase">Multi-Region Reach</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
