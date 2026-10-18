import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionTag from './SectionTag';
import MedicalParticlesBackground from './MedicalParticlesBackground';

export default function AboutUs() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const part1Ref = useRef<HTMLDivElement>(null);
  const part2Ref = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {}, sectionRef);

    // ── Part 1 ("About kRa Life Sciences") Slow Modern Entrance Animation ──
    const part1Observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctx.add(() => {
              const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
              });

              // 1. Right Column: 3D perspective depth glide for Video Showcase Card
              if (videoCardRef.current) {
                tl.fromTo(
                  videoCardRef.current,
                  {
                    opacity: 0,
                    x: 60,
                    rotateY: -8,
                    transformPerspective: 1200,
                    scale: 0.93,
                    filter: 'blur(16px)',
                  },
                  {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 2.4,
                    ease: 'power3.out',
                    clearProps: 'filter,transformPerspective',
                    onComplete: () => {
                      if (videoCardRef.current) {
                        gsap.to(videoCardRef.current, {
                          y: -7,
                          duration: 5.2,
                          repeat: -1,
                          yoyo: true,
                          ease: 'sine.inOut',
                        });
                      }
                    },
                  },
                  0
                );
              }

              // 2. Section Tag: Slow cinematic slide & blur fade
              if (tagRef.current) {
                tl.fromTo(
                  tagRef.current,
                  {
                    opacity: 0,
                    x: -28,
                    filter: 'blur(10px)',
                  },
                  {
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                    duration: 1.8,
                    ease: 'power3.out',
                    clearProps: 'all',
                  },
                  0.1
                );
              }

              // 3. Headline: Slow luxury 3D line rise with blur
              const headlineLines = headlineRef.current?.querySelectorAll('.about-headline-line');
              if (headlineLines && headlineLines.length > 0) {
                tl.fromTo(
                  headlineLines,
                  {
                    opacity: 0,
                    y: 36,
                    rotateX: -10,
                    filter: 'blur(12px)',
                  },
                  {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: 'blur(0px)',
                    duration: 2.1,
                    stagger: 0.22,
                    ease: 'power3.out',
                    clearProps: 'all',
                  },
                  0.25
                );
              }

              // 4. Paragraphs: Staggered slow cinematic glide into crystal clarity
              const paragraphs = paragraphsRef.current?.querySelectorAll('.about-paragraph');
              if (paragraphs && paragraphs.length > 0) {
                tl.fromTo(
                  paragraphs,
                  {
                    opacity: 0,
                    y: 28,
                    filter: 'blur(10px)',
                  },
                  {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 1.9,
                    stagger: 0.22,
                    ease: 'power3.out',
                    clearProps: 'all',
                  },
                  0.55
                );
              }

              // 5. Founder signature badge: Soft scale & upward drift
              if (founderRef.current) {
                tl.fromTo(
                  founderRef.current,
                  {
                    opacity: 0,
                    y: 24,
                    scale: 0.92,
                    filter: 'blur(8px)',
                  },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 1.9,
                    ease: 'power3.out',
                    clearProps: 'all',
                  },
                  0.9
                );
              }
            });

            part1Observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    // ── Part 2 ("OUR APPROACH") Small Modern GSAP Animation ──
    const part2Observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctx.add(() => {
              const cardTl = gsap.timeline({
                defaults: { ease: 'power3.out' },
              });

              // 1. Approach Header: Soft subtle rise
              cardTl.fromTo(
                '.approach-header-item',
                { opacity: 0, y: 16, filter: 'blur(5px)' },
                {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  duration: 1.0,
                  ease: 'power3.out',
                  clearProps: 'all',
                },
                0
              );

              // 2. Card Containers: Clean staggered upward glide
              cardTl.fromTo(
                '.approach-card-item',
                { opacity: 0, y: 24, scale: 0.96, filter: 'blur(6px)' },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 0.85,
                  stagger: 0.08,
                  ease: 'power3.out',
                  clearProps: 'all',
                },
                0.1
              );

              // 3. Floating Circular Photos: Modern elastic pop & settle
              cardTl.fromTo(
                '.approach-photo-circle',
                { opacity: 0, scale: 0.72, y: -8 },
                {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.7,
                  stagger: 0.08,
                  ease: 'back.out(1.6)',
                  clearProps: 'all',
                },
                0.2
              );

              // 4. Overlapping Center Icon Badges: Snappy modern rotate & pop
              cardTl.fromTo(
                '.approach-badge-icon',
                { opacity: 0, scale: 0, rotate: -25 },
                {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  duration: 0.55,
                  stagger: 0.08,
                  ease: 'back.out(2.2)',
                  clearProps: 'all',
                },
                0.3
              );

              // 5. Bottom Colored Accent Pill Bar: Smooth horizontal expansion
              cardTl.fromTo(
                '.approach-pill-bar',
                { opacity: 0, scaleX: 0 },
                {
                  opacity: 1,
                  scaleX: 1,
                  duration: 0.5,
                  stagger: 0.08,
                  ease: 'power2.out',
                  clearProps: 'all',
                },
                0.4
              );
            });

            part2Observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (part1Ref.current) part1Observer.observe(part1Ref.current);
    if (part2Ref.current) part2Observer.observe(part2Ref.current);

    return () => {
      part1Observer.disconnect();
      part2Observer.disconnect();
      ctx.revert();
    };
  }, []);



  const approachItems = [
    {
      num: '01',
      title: 'Integrated Collaboration',
      desc: 'Connecting functions, teams and specialist partners around common study objectives.',
      img: '/approach-collab.jpg',
      badgeBg: 'bg-[#0078B8]',
      pillBg: 'bg-[#0078B8]',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Execution-Focused Planning',
      desc: 'Converting clinical development strategies into actionable plans, milestones and responsibilities.',
      img: '/approach-plan.jpg',
      badgeBg: 'bg-[#CF3838]',
      pillBg: 'bg-[#CF3838]',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Proactive Risk Management',
      desc: 'Identifying operational gaps and potential risks early, with mitigation plans built into execution.',
      img: '/approach-risk.jpg',
      badgeBg: 'bg-[#0078B8]',
      pillBg: 'bg-[#0078B8]',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      num: '04',
      title: 'Operational Excellence',
      desc: 'Aligning organisational structures, workflows and team capabilities to improve efficiency and accountability.',
      img: '/approach-ops.jpg',
      badgeBg: 'bg-[#CF3838]',
      pillBg: 'bg-[#CF3838]',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      num: '05',
      title: 'Patient-Centric Thinking',
      desc: 'Considering patient needs and site realities while planning recruitment, retention and trial conduct.',
      img: '/approach-patient.jpg',
      badgeBg: 'bg-[#0078B8]',
      pillBg: 'bg-[#0078B8]',
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full overflow-hidden font-sans"
    >
      {/* ══════════════════════════════════════════════════════════════
          PART 1: ABOUT KRA LIFE SCIENCES (Dark Theme with Particles)
          ══════════════════════════════════════════════════════════════ */}
      <div
        ref={part1Ref}
        className="relative w-full bg-gradient-to-b from-[#071322] via-[#0A192F] to-[#06101E] pt-10 sm:pt-13 lg:pt-15 pb-8 sm:pb-11 lg:pb-13 overflow-hidden border-t border-slate-800"
      >
        {/* Three.js Medical Field Particles Background ONLY in About Us part */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <MedicalParticlesBackground />
        </div>

        {/* Ambient Dark Theme Glow Accents */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#0078B8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#CF3838]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* ── Left Column: Story, Title & Narrative ── */}
            <div className="lg:col-span-6 xl:col-span-6 pl-2 sm:pl-4 lg:pl-6 xl:pl-3">
              {/* Red Tagline Prefix */}
              <div ref={tagRef}>
                <SectionTag text="About kRa Life Sciences" variant="red" className="mb-3.5" />
              </div>

              {/* Main Headline (2 Lines) */}
              <h2
                ref={headlineRef}
                className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-semibold tracking-tight leading-[1.2] mb-3.5 sm:mb-4"
              >
                <span className="about-headline-line block text-white">Connecting Clinical Expertise</span>
                <span className="about-headline-line block text-[#38BDF8]">
                  <span className="inline-block pl-1 sm:pl-1.5">With</span> Execution Excellence
                </span>
              </h2>

              {/* Paragraph Text in Dark Theme */}
              <div
                ref={paragraphsRef}
                className="space-y-2.5 sm:space-y-3 text-slate-300 text-[13px] sm:text-[13.5px] lg:text-[14px] leading-[1.6]"
              >
                <p className="about-paragraph">
                  Clinical trials require more than sound protocols and capable teams, They demand meticulous
                  planning, coordinated execution, proactive risk management and a shared commitment to study
                  objectives.
                </p>
                <p className="about-paragraph">
                  Founded by <strong className="font-semibold text-white">Dr. Kavya Appaiah</strong>,{' '}
                  <strong className="font-semibold text-white">kRa Life Sciences</strong> builds on extensive
                  experience in clinical research, clinical operations, project management and organisational
                  development. Established in 2018 as an individual consultancy, the practice evolved into kRa Life
                  Sciences to address a critical need in clinical development: a single point of coordination
                  across functions, with a clear focus on translating plans into execution.
                </p>
                <p className="about-paragraph">
                  We work across the clinical development lifecycle, bringing together the right expertise,
                  processes and teams to address operational gaps, strengthen accountability and support
                  quality-driven, timeline-conscious and cost-aware trial delivery.
                </p>
              </div>

              {/* Founder Signature (Simple & Clean) */}
              <div ref={founderRef} className="pt-3 sm:pt-4">
                <div className="inline-flex items-center gap-3.5 group">
                  <img
                    src="/kavya-portrait.jpg"
                    alt="Dr. Kavya Appaiah Founder"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white/20 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="text-left">
                    <span className="block text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase text-[#CF3838] mb-0.5">
                      FOUNDED BY
                    </span>
                    <span className="font-serif font-bold text-white text-[15px] sm:text-[16px] leading-tight block">
                      Dr. Kavya Appaiah
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right Column: Interactive Video Card ── */}
            <div className="lg:col-span-6 xl:col-span-6 pr-2 sm:pr-3 lg:pr-3.5 xl:pr-4">
              <div className="flex flex-col items-center lg:items-end w-full">
                {/* Main Feature / Video Card with aboutvideo.mp4 */}
                <div
                  ref={videoCardRef}
                  className="relative w-full max-w-[560px] aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/10 group bg-slate-950 shadow-cyan-950/40"
                >
                  {/* Live video element with continuous playback */}
                  <video
                    ref={videoRef}
                    src="/aboutvideo.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          PART 2: OUR APPROACH (Dark Theme - Compact Height)
          ══════════════════════════════════════════════════════════════ */}
      <div
        ref={part2Ref}
        className="relative w-full bg-gradient-to-b from-[#06101E] via-[#081628] to-[#0A192F] pt-6 sm:pt-7 lg:pt-8 pb-7 sm:pb-9 lg:pb-11 border-t border-slate-800/80 overflow-hidden"
      >
        {/* Subtle Ambient Glow Lights */}
        <div className="absolute top-1/4 -right-24 w-80 h-80 bg-[#0078B8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-24 w-80 h-80 bg-[#CF3838]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Header: Tag followed directly by explanatory content */}
          <div className="approach-header-item mb-6 sm:mb-7 lg:mb-8 max-w-3xl pl-2 sm:pl-4 lg:pl-6 xl:pl-4">
            <div className="flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#CF3838] tracking-widest uppercase mb-1.5 sm:mb-2">
              <span className="w-5 sm:w-6 h-0.5 bg-[#CF3838]" />
              <span>OUR APPROACH</span>
            </div>
            <p className="text-sm sm:text-[15px] lg:text-[16px] text-slate-200 leading-[1.6] font-sans">
              Our approach combines medical understanding, operational rigour and business insight to align
              sponsor expectations with investigator and site realities.
            </p>
          </div>

          {/* ── 5 Approach Cards Grid (Dark Theme) ── */}
          <div className="relative pt-4 sm:pt-5 lg:pt-6">
            {/* Grid of 5 Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-11 sm:gap-y-11 gap-x-3.5 sm:gap-x-3.5 relative z-10 items-stretch">
              {approachItems.map((item, idx) => {
                const isSelected = activeCard === idx;
                return (
                  <div
                    key={item.num}
                    onMouseEnter={() => setActiveCard(idx)}
                    onMouseLeave={() => setActiveCard(null)}
                    className="approach-card-item relative pt-10 sm:pt-11 flex flex-col group cursor-pointer"
                  >
                    {/* Floating Circular Photo & Overlapping Icon Badge */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                      <div className="approach-photo-circle w-18 h-18 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-slate-700/80 shadow-md ring-2 ring-white/10 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:ring-sky-400/40">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Icon Badge overlapping bottom of circle */}
                      <div
                        className={`approach-badge-icon -mt-3.5 w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full ${item.badgeBg} shadow-md border-2 border-[#0D1C33] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10`}
                      >
                        {item.icon}
                      </div>
                    </div>

                    {/* Dark Sleek Information Card (No Overlap, Compact Height) */}
                    <div
                      className={`w-full h-full bg-[#0D1C33]/90 hover:bg-[#112440] rounded-2xl sm:rounded-3xl pt-13 sm:pt-14 pb-3.5 sm:pb-4 px-3 sm:px-3.5 text-center border shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between backdrop-blur-md ${
                        isSelected
                          ? 'border-[#0078B8] shadow-sky-950/50 -translate-y-1'
                          : 'border-slate-700/60 hover:border-slate-600/80 hover:-translate-y-0.5'
                      }`}
                    >
                      {/* Title & Description */}
                      <div className="flex-1 flex flex-col justify-start">
                        <h4 className="font-sans font-bold text-[13.5px] sm:text-[14px] text-white mb-1.5 leading-snug group-hover:text-[#38BDF8] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-[11.5px] text-slate-300/80 leading-relaxed font-sans">
                          {item.desc}
                        </p>
                      </div>

                      {/* Bottom Colored Accent Pill Bar */}
                      <div className="mt-2.5 sm:mt-3 flex justify-center">
                        <div
                          className={`approach-pill-bar w-9 sm:w-10 h-1 rounded-full ${item.pillBg} transition-all duration-300 group-hover:w-14`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
