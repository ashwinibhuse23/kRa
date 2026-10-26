import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionTag from './SectionTag';
import Button from './Button';

interface ServiceItem {
  id: string;
  number: string;
  tabLabel: string;
  title: string;
  category: string;
  summary: string;
  bullets: string[];
  img: string;
  focusNote?: string;
}

const getServiceIcon = (id: string, isActive: boolean) => {
  const iconClass = isActive ? 'w-3.5 h-3.5 text-white' : 'w-3.5 h-3.5 text-[#0078B8]';
  switch (id) {
    case 'trial-setup-mgmt':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      );
    case 'dev-strategy-execution':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );
    case 'patient-site-strategy':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'clinical-ops-excellence':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 14 3-3" />
          <path d="M3.34 19a10 10 0 1 1 17.32 0" />
        </svg>
      );
    case 'cross-functional-integration':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      );
    case 'advisory-consulting':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18h8" />
          <path d="M3 22h18" />
          <path d="M14 22a7 7 0 1 0 0-14h-1" />
          <path d="M9 14h2" />
          <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
          <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Services() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const servicesData: ServiceItem[] = [
    {
      id: 'trial-setup-mgmt',
      number: '01',
      tabLabel: 'Trial Set-Up & Mgmt',
      title: 'Clinical Trial Set-Up, Development & Management',
      category: 'Trial Execution',
      summary:
        'Structured support for clinical trial planning and execution, from early development considerations through study completion.',
      img: '/ClinicalTrial.png',
      bullets: [
        'Clinical trial feasibility and study planning',
        'Clinical operations strategy and execution oversight',
        'Study start-up planning and site selection inputs',
        'Clinical trial project and programme management',
        'Milestone, budget, timeline and quality oversight',
        'Cross-functional and vendor coordination',
      ],
    },
    {
      id: 'dev-strategy-execution',
      number: '02',
      tabLabel: 'Clinical Strategy',
      title: 'Clinical Development Strategy & Programme Execution',
      category: 'Programme Strategy',
      summary:
        'Integrating clinical trials early into product development to improve alignment between development objectives and operational execution.',
      img: '/GlobalClinical.png',
      bullets: [
        'Clinical development programme planning',
        'Study sequencing and milestone planning',
        'Proof-of-concept and dose-escalation study planning',
        'Phase I, II, III and IV study oversight, as applicable',
        'BA/BE and TQT study planning and coordination',
        'Pre-clinical and post-marketing development coordination',
      ],
    },
    {
      id: 'patient-site-strategy',
      number: '03',
      tabLabel: 'Patient & Site strategy',
      title: 'Patient Recruitment, Retention & Site Strategy',
      category: 'Site & Patient',
      summary:
        'Recruitment and retention strategies designed around study requirements, investigator capabilities and patient needs.',
      img: '/patient.png',
      bullets: [
        'Recruitment feasibility and enrolment planning',
        'Investigator and site selection inputs',
        'Site performance and recruitment monitoring',
        'Patient recruitment and retention strategy',
        'Identification of enrolment bottlenecks and corrective actions',
        'Site-level risk assessment and mitigation planning',
      ],
    },
    {
      id: 'clinical-ops-excellence',
      number: '04',
      tabLabel: 'Ops Excellence',
      title: 'Clinical Operations & Operational Excellence',
      category: 'Governance & SOPs',
      summary:
        'Building stronger operational foundations for clinical trials and clinical research organisations through effective processes, structures and governance.',
      img: '/approach-ops.jpg',
      bullets: [
        'Clinical operations function and department set-up',
        'Organisational structure and organogram design',
        'Process mapping and workflow optimisation',
        'Standardised operating processes and operational controls',
        'Risk identification and mitigation frameworks',
        'Training needs assessment and capability development',
        'Project management team mentoring and training',
      ],
    },
    {
      id: 'cross-functional-integration',
      number: '05',
      tabLabel: 'Cross-Functional',
      title: 'Cross-Functional Clinical Trial Integration',
      category: 'Multidisciplinary',
      summary:
        'Bringing multiple functions and specialist providers together under a coordinated execution framework across the full lifecycle.',
      img: '/cross.png',
      focusNote:
        'Ensuring that responsibilities, dependencies, timelines and deliverables are connected across teams, rather than managed in isolation.',
      bullets: [
        'Clinical protocol development and medical writing',
        'Medical monitoring and safety inputs',
        'Clinical data management and database development',
        'Pharmacovigilance and safety reporting',
        'Statistical analysis and CSR writing',
        'Clinical trial software and systems inputs',
        'Finance, budgets and vendor management',
      ],
    },
    {
      id: 'advisory-consulting',
      number: '06',
      tabLabel: 'Specialist Advisory',
      title: 'Clinical Research Advisory & Specialist Consulting',
      category: 'Advisory & Insight',
      summary:
        'Medical and operational perspectives to help sponsors, investigators and clinical research organisations make informed decisions.',
      img: '/lab-pipette-clean.png',
      bullets: [
        'Sponsor-side and investigator-side operational inputs',
        'Clinical trial feasibility and execution reviews',
        'Clinical research process and workflow assessments',
        'Support for Phase I and TQT facility planning',
        'BA/BE screening and investigator database planning',
        'Clinical research training and development',
      ],
    },
  ];

  const currentService = servicesData[activeIdx];
  const midPoint = Math.ceil(currentService.bullets.length / 2);
  const bulletsCol1 = currentService.bullets.slice(0, midPoint);
  const bulletsCol2 = currentService.bullets.slice(midPoint);

  // Initial Modern Slow Cinematic GSAP Reveal on Scroll
  useEffect(() => {
    let ctx: gsap.Context;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctx = gsap.context(() => {
              const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

              // 1. Ambient Background Glow Orbs: Soft slow breathing bloom
              tl.fromTo(
                '.services-ambient-glow',
                { opacity: 0, scale: 0.6 },
                { opacity: 1, scale: 1, duration: 2.2, ease: 'sine.out', clearProps: 'all' },
                0
              );

              // 2. Section Tag: Horizontal slide & soft focus reveal
              tl.fromTo(
                '.services-header-tag',
                { opacity: 0, x: -25, filter: 'blur(8px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1.2, clearProps: 'all' },
                0.1
              );

              // 3. Header Title: Modern cinematic vertical ascent with focus unblur
              tl.fromTo(
                '.services-header-title',
                { opacity: 0, y: 35, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out', clearProps: 'all' },
                0.2
              );

              // 4. Narrative Paragraph: Gentle fade-up
              tl.fromTo(
                '.services-header-desc',
                { opacity: 0, y: 25, filter: 'blur(6px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out', clearProps: 'all' },
                0.35
              );

              // 5. Right Corner Showcase Image: Modern floating 3D scale and soft glow reveal
              tl.fromTo(
                '.services-header-image',
                { opacity: 0, y: 35, scale: 0.93, filter: 'blur(10px)' },
                { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power3.out', clearProps: 'all' },
                0.25
              );

              // 6. Top Divider Line: Elegant center-out horizontal line expansion
              tl.fromTo(
                '.services-divider-line',
                { opacity: 0, scaleX: 0 },
                { opacity: 1, scaleX: 1, duration: 1.3, ease: 'power3.inOut', clearProps: 'all' },
                0.5
              );

              // 7. Navigation Tab Pills: Smooth staggered wave reveal
              tl.fromTo(
                '.service-tab-pill',
                { opacity: 0, y: 22, scale: 0.92, filter: 'blur(4px)' },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  duration: 1.1,
                  stagger: 0.08,
                  ease: 'power3.out',
                  clearProps: 'all',
                },
                0.65
              );

              // 8. Showcase Card Content: Smooth depth lift
              tl.fromTo(
                '.services-showcase-reveal',
                { opacity: 0, y: 40, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out', clearProps: 'all' },
                0.85
              );

              // 9. Showcase Bullet Points: Cascading slide
              tl.fromTo(
                '.service-bullet-item',
                { opacity: 0, x: -14 },
                { opacity: 1, x: 0, duration: 0.9, stagger: 0.05, ease: 'power2.out', clearProps: 'all' },
                1.05
              );

              // 10. Bottom CTA Block: Graceful upward arrival
              tl.fromTo(
                '.services-cta-reveal',
                { opacity: 0, y: 25, filter: 'blur(6px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.3, ease: 'power3.out', clearProps: 'all' },
                1.2
              );
            }, sectionRef);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (ctx) ctx.revert();
    };
  }, []);

  // Animate Showcase Content smoothly when Active Service Changes
  const handleServiceSelect = (index: number) => {
    if (index === activeIdx) return;
    if (showcaseRef.current) {
      gsap.fromTo(
        showcaseRef.current,
        { opacity: 0.2, y: 16, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power2.out', clearProps: 'all' }
      );
    }
    setActiveIdx(index);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F3F8FC] to-[#F8FAFC] pt-12 sm:pt-14 lg:pt-16 pb-10 sm:pb-12 lg:pb-14 border-t border-slate-200/80 font-sans"
    >
      {/* ── Ambient Background Accents ── */}
      <div className="services-ambient-glow absolute top-10 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="services-ambient-glow absolute bottom-10 left-10 w-96 h-96 bg-blue-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ── Section Header (Text on Left, services.png on Right Corner) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center mb-8 sm:mb-10">
          {/* Left Column: Tag, Heading & Paragraph */}
          <div className="lg:col-span-7 xl:col-span-7 pl-1 sm:pl-2 lg:pl-3 xl:pl-4">
            <div className="services-header-tag mb-3.5">
              <SectionTag text="Our Services" variant="green" />
            </div>
            <h2 className="services-header-title font-sans text-2xl sm:text-3xl lg:text-[33px] xl:text-[36px] font-extrabold text-[#0a192f] tracking-tight leading-[1.2] mb-3.5">
              <span className="block">End-to-End Clinical Trial Consulting</span>
              <span className="block">
                <span className="bg-gradient-to-r from-[#0078B8] via-[#009BE5] to-[#00A8CC] bg-clip-text text-transparent">
                  And Clinical Development Solutions
                </span>
              </span>
            </h2>
            <p className="services-header-desc text-slate-600 text-sm sm:text-[15.5px] lg:text-[16px] leading-[1.65] font-sans max-w-2xl">
              <strong className="font-semibold text-[#002B49]">kRa Life Sciences</strong> provides strategic
              and operational consulting across clinical development, helping sponsors and research organisations
              plan, coordinate and execute complex programmes.
            </p>
          </div>

          {/* Right Column: services.png Showcase */}
          <div className="services-header-image lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end pr-1.5 sm:pr-2.5 lg:pr-4 xl:pr-5.5">
            <div className="relative group w-full max-w-md lg:max-w-[420px] xl:max-w-[450px]">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0078B8]/20 via-[#00A8CC]/20 to-sky-400/20 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-lg shadow-sky-950/5 h-44 sm:h-48 lg:h-[205px] xl:h-[215px] w-full">
                <img
                  src="/services.png"
                  alt="kRa Life Sciences Clinical Development & Consulting Services"
                  className="w-full h-full object-cover object-[center_38%] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Subtle Divider Line ── */}
        <div className="services-divider-line w-full h-px bg-slate-200/80 mb-5.5 sm:mb-6.5 origin-center" />

        {/* ── Interactive Service Navigation Tabs ── */}
        <div className="services-tabs-reveal mb-9 sm:mb-11 w-full pl-1 sm:pl-2 lg:pl-3 xl:pl-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5 w-full">
            {servicesData.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceSelect(idx)}
                  className={`service-tab-pill w-full flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-[11.5px] lg:text-[11.5px] xl:text-[12.5px] font-semibold transition-all duration-200 cursor-pointer text-left ${isActive
                    ? 'bg-[#084D3E] text-white shadow-md shadow-[#084D3E]/20 ring-1 ring-[#084D3E]'
                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm border border-slate-200/80 hover:border-slate-300'
                    }`}
                >
                  {/* Circular Icon Badge */}
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${isActive
                      ? 'bg-[#00A896] text-white shadow-sm'
                      : 'bg-[#EEF7FC] text-[#0088CC] border border-sky-100/90'
                      }`}
                  >
                    {getServiceIcon(service.id, isActive)}
                  </div>

                  {/* Tab Label */}
                  <span className="truncate flex-1 font-semibold">
                    {service.tabLabel}
                  </span>

                  {/* Up-Right Arrow on Active Tab */}
                  {isActive && (
                    <svg
                      className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0 mr-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Featured Service Showcase (Direct Section Flow - No Enclosing White Card) ── */}
        <div
          ref={showcaseRef}
          className="services-showcase-reveal w-full pt-2 sm:pt-4 mb-6 sm:mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
            {/* Left Column: High-Res Clinical Image (Compact Size) */}
            <div className="lg:col-span-4 xl:col-span-4 flex justify-center lg:justify-start pl-1 sm:pl-2 lg:pl-3.5 xl:pl-4">
              <div className="relative w-full max-w-[390px] aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-slate-200/80 group bg-slate-100">
                <img
                  src={currentService.img}
                  alt={currentService.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Content Details */}
            <div className="lg:col-span-8 xl:col-span-8">
              {/* Service Title */}
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#002B49] leading-snug mb-3">
                {currentService.title}
              </h3>

              {/* Service Summary */}
              <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-6">
                {currentService.summary}
              </p>

              {/* 2-Column Bullet Points with Teal/Cyan Dashes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-3.5 pt-1">
                {/* Column 1 */}
                <div className="space-y-3 sm:space-y-3.5">
                  {bulletsCol1.map((bullet, idx) => (
                    <div key={idx} className="service-bullet-item flex items-start gap-2.5 sm:gap-3 group/item">
                      <span className="w-3.5 h-[2px] bg-[#0078B8] mt-2.5 shrink-0 rounded-full group-hover/item:w-5 transition-all duration-200" />
                      <span className="text-[13.5px] sm:text-[14px] text-slate-700 font-medium leading-relaxed font-sans group-hover/item:text-slate-900 transition-colors">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="space-y-3 sm:space-y-3.5">
                  {bulletsCol2.map((bullet, idx) => (
                    <div key={idx} className="service-bullet-item flex items-start gap-2.5 sm:gap-3 group/item">
                      <span className="w-3.5 h-[2px] bg-[#0078B8] mt-2.5 shrink-0 rounded-full group-hover/item:w-5 transition-all duration-200" />
                      <span className="text-[13.5px] sm:text-[14px] text-slate-700 font-medium leading-relaxed font-sans group-hover/item:text-slate-900 transition-colors">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific Focus Note Callout (For Service 05) */}
              {currentService.focusNote && (
                <div className="mt-5 p-3 sm:p-3.5 rounded-xl bg-sky-50/80 border border-sky-100 text-[12px] sm:text-[12.5px] leading-relaxed text-slate-800 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#0078B8] mt-1.5 shrink-0" />
                  <p>
                    <strong className="font-semibold text-[#002B49]">Our focus:</strong>{' '}
                    {currentService.focusNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Subtle Divider Line ── */}
        <div className="w-full h-px bg-slate-200/80 mb-5 sm:mb-6" />

        {/* ── Tailored Programme Engagement & Scope CTA (Section-Integrated Design - No Background Card) ── */}
        <div className="services-cta-reveal w-full pl-1 sm:pl-2 lg:pl-3.5 xl:pl-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center justify-between">
            {/* Left Content Area (Spans 8 columns) */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-3">
              <h3 className="font-sans text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#0a192f] tracking-tight leading-[1.2]">
                Aligning Clinical Expertise with{' '}
                <span className="bg-gradient-to-r from-[#0078B8] via-[#009BE5] to-[#00A8CC] bg-clip-text text-transparent">
                  Execution Needs
                </span>
              </h3>

              <p className="text-slate-600 text-sm sm:text-[15px] lg:text-[16px] leading-[1.65] font-sans max-w-2xl">
                Specific services are scoped according to programme requirements and may be delivered directly or coordinated with specialist partners, as applicable.
              </p>
            </div>

            {/* Right Action Area (Spans 4 columns) */}
            <div className="lg:col-span-4 xl:col-span-4 flex justify-start lg:justify-end shrink-0 pt-2 lg:pt-0 pr-1.5 sm:pr-2.5 lg:pr-4 xl:pr-12">
              <Button href="#contact" size="md" variant="primary">
                Discuss Your Programme Scope
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
