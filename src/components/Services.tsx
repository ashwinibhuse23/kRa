import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import SectionTag from './SectionTag';

interface ServiceItem {
  id: string;
  number: string;
  tabLabel: string;
  title: string;
  category: string;
  summary: string;
  bullets: string[];
  img: string;
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

const getServiceBulletIcon = (text: string) => {
  const iconClass = "w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2] text-white";
  const lower = text.toLowerCase();

  // 1. Finance / Budgets / Software / Database / System (Image 2 item #7)
  if (lower.includes('finance') || lower.includes('database') || lower.includes('software') || lower.includes('system')) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="7" ry="2.5" />
        <path d="M5 5v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" />
        <path d="M5 10v5c0 1.38 3.13 2.5 7 2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="M18 14.5v1" />
        <path d="M18 20.5v1" />
        <path d="M14.5 18h1" />
        <path d="M20.5 18h1" />
      </svg>
    );
  }

  // 2. Cross-functional / Vendor / Coordination / Molecule / Organogram / Integration (Image 2 item #6)
  if (lower.includes('cross-functional') || lower.includes('vendor') || lower.includes('coordination') || lower.includes('organogram') || lower.includes('integration') || lower.includes('network')) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <circle cx="6" cy="17" r="3" />
        <circle cx="18" cy="17" r="3" />
        <line x1="10.5" y1="7.5" x2="7.5" y2="14.5" />
        <line x1="13.5" y1="7.5" x2="16.5" y2="14.5" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    );
  }

  // 3. Milestone / Timeline / Quality / Sequencing / Statistics (Image 2 item #5)
  if (lower.includes('milestone') || lower.includes('timeline') || lower.includes('quality') || lower.includes('sequencing') || lower.includes('statist')) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M4 14l5-5 4 4 7-7" />
        <polyline points="16 6 20 6 20 10" />
      </svg>
    );
  }

  // 4. Start-up / Site / Investigator / Patient / Team / Screening / Recruitment / Mentoring (Image 2 item #3)
  if (lower.includes('start-up') || lower.includes('site') || lower.includes('investigator') || lower.includes('patient') || lower.includes('team') || lower.includes('mentor') || lower.includes('enrolment') || lower.includes('screening') || lower.includes('retention')) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  // 5. Programme / Project / Checklist / SOP / Controls / Training (Image 2 item #4)
  if (lower.includes('programme') || lower.includes('project') || lower.includes('controls') || lower.includes('sop') || lower.includes('standard') || lower.includes('training')) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="15" y2="15" />
        <line x1="9" y1="19" x2="13" y2="19" />
      </svg>
    );
  }

  // 6. Feasibility / Protocol / Writing / CSR / Review / Assessment (Image 2 item #1)
  if (lower.includes('feasib') || lower.includes('protocol') || lower.includes('writing') || lower.includes('csr') || lower.includes('review') || lower.includes('assessment')) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="11" y2="17" />
        <circle cx="16" cy="17" r="3" />
        <line x1="18.1" y1="19.1" x2="20.5" y2="21.5" />
      </svg>
    );
  }

  // 7. Operations / Strategy / Execution / Process / Workflow / Optimization (Image 2 item #2)
  if (lower.includes('operat') || lower.includes('strategy') || lower.includes('execution') || lower.includes('workflow') || lower.includes('process') || lower.includes('optimis')) {
    return (
      <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }

  // 8. Default: Target / Beaker
  return (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
};

export default function Services() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const servicesData: ServiceItem[] = [
    {
      id: 'trial-setup-mgmt',
      number: '01',
      tabLabel: 'Clinical Trial Set-Up',
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
        'Finance, budgets and vendor management',
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
      tabLabel: 'Patient & Site Strategy',
      title: 'Patient Recruitment, Retention & Site Strategy',
      category: 'Site & Patient',
      summary:
        'Recruitment and retention strategies designed around study requirements, investigator capabilities and patient needs.',
      img: '/patient.png',
      bullets: [
        'Therapeutic Area feasibility and enrolment planning',
        'Country-level and region-specific feasibility',
        'Investigator and site feasibility selection inputs',
        'Site performance and recruitment monitoring',
        'Patient screening and retention strategy',
        'Identification of enrolment bottlenecks and corrective actions',
        'Site-level risk assessment and mitigation planning',
      ],
    },
    {
      id: 'clinical-ops-excellence',
      number: '04',
      tabLabel: 'Operational Excellence',
      title: 'Clinical Operations & Operational Excellence',
      category: 'Governance & SOPs',
      summary:
        'Building stronger operational foundations for clinical trials and clinical research organisations through effective processes, structures and governance.',
      img: '/approach-ops.jpg',
      bullets: [
        'Clinical operations function and department set-up',
        'Organisational structure and restructure and organogram design and redesign',
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
      tabLabel: 'Clinical Trial Integration',
      title: 'Cross-Functional Clinical Trial Integration',
      category: 'Multidisciplinary',
      summary:
        'Bringing multiple functions and specialist providers together under a coordinated execution framework across the full lifecycle.',
      img: '/cross.png',
      bullets: [
        'Clinical protocol development and medical writing',
        'Medical monitoring and safety inputs',
        'Clinical data management and database development',
        'Pharmacovigilance and safety reporting',
        'Statistical analysis and CSR writing',
        'Clinical trial software and systems inputs',

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
        'Clinical Trial Planning and Support Across Phase I, II, III & IV Studies'
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

              // 5. Header Background Graphic: Subtle depth entrance
              tl.fromTo(
                '.services-bg-graphic',
                { opacity: 0, x: 30, scale: 0.97, filter: 'blur(8px)' },
                { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out', clearProps: 'all' },
                0.2
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
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F3F8FC] to-[#F8FAFC] pt-9 sm:pt-12 lg:pt-16 pb-8 sm:pb-9 lg:pb-10 border-t border-slate-200/80 font-sans"
    >
      {/* ── Background Image (serviceback.png) - Hidden on mobile/tablet, Desktop only ── */}
      <div className="services-bg-graphic hidden lg:block absolute top-0 right-0 lg:w-[66%] xl:w-[61%] lg:h-[440px] pointer-events-none select-none overflow-hidden will-change-transform">
        <img
          src="/serviceback.png"
          alt="Clinical Trial Consulting Services"
          className="w-full h-full object-cover object-right scale-100 origin-right"
        />
        {/* Soft edge blend on the left so it seamlessly fades into the section background */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-44 lg:w-60 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent pointer-events-none" />
        {/* Soft bottom blend to transition smoothly into the tabs */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent pointer-events-none" />
      </div>

      {/* ── Ambient Background Accents ── */}
      <div className="services-ambient-glow absolute top-10 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="services-ambient-glow absolute bottom-10 left-10 w-96 h-96 bg-blue-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ── Section Header (Clean & clear on mobile; serviceback.png on desktop right) ── */}
        <div className="relative mb-7 sm:mb-9 lg:mb-16">
          <div className="max-w-xl lg:max-w-[60%] xl:max-w-[48%] pl-0.5 sm:pl-2 lg:pl-3 xl:pl-4 pr-1 sm:pr-3 lg:pr-4">
            <div className="services-header-tag mb-3 sm:mb-3.5">
              <SectionTag text="Our Services" variant="green" />
            </div>
            <h2 className="services-header-title text-xl sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[38px] font-bold text-[#0a192f] tracking-tight leading-[1.2] mb-3 sm:mb-3.5 pr-1 sm:pr-2.5">
              <span className="block sm:whitespace-nowrap">End-to-End Clinical Trial Consulting</span>
              <span className="block sm:whitespace-nowrap">
                <span className="bg-gradient-to-r from-[#0078B8] via-[#009BE5] to-[#00A8CC] bg-clip-text text-transparent">
                  And Clinical Development Solutions
                </span>
              </span>
            </h2>
            <p className="services-header-desc text-slate-600 text-[13.5px] min-[390px]:text-[14px] sm:text-[15px] lg:text-[15.5px] leading-relaxed tracking-normal sm:tracking-tight text-left lg:text-justify font-sans max-w-[540px] mt-3.5 sm:mt-4 lg:mt-6">
              <strong className="font-semibold text-[#002B49]">kRa Life Sciences</strong> provides strategic
              and operational consulting across clinical development, helping sponsors and research organisations
              plan, coordinate and execute complex programmes.
            </p>
          </div>
        </div>

        {/* ── Subtle Divider Line ── */}
        <div className="services-divider-line w-full h-px bg-slate-200/80 mb-5.5 sm:mb-6.5 origin-center" />

        {/* ── Interactive Service Navigation Tabs (Mobile: 2 tabs per line, Desktop: 6 tabs) ── */}
        <div className="services-tabs-reveal mb-7 sm:mb-8 w-full pl-0.5 sm:pl-2 lg:pl-3 xl:pl-2.5">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-2.5 w-full">
            {servicesData.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => handleServiceSelect(idx)}
                  className={`service-tab-pill w-full flex items-center gap-1.5 sm:gap-1.5 px-2.5 sm:px-2.5 xl:px-1.5 2xl:px-2.5 py-2 sm:py-2.5 rounded-full text-[11px] min-[390px]:text-[11.5px] sm:text-[11.5px] md:text-[12px] xl:text-[11px] 2xl:text-[11.8px] font-semibold transition-all duration-200 cursor-pointer text-left min-h-[44px] sm:min-h-0 ${isActive
                    ? 'bg-[#084D3E] text-white shadow-md shadow-[#084D3E]/20 ring-1 ring-[#084D3E]'
                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-xs border border-slate-200/80 hover:border-slate-300'
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
                  <span className="flex-1 font-semibold leading-tight line-clamp-2 xl:whitespace-nowrap">
                    {service.tabLabel}
                  </span>

                  {/* Up-Right Arrow on Active Tab */}
                  {isActive && (
                    <svg
                      className="w-3 h-3 text-[#2DD4BF] shrink-0 ml-0.5 hidden min-[400px]:block"
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
          className="services-showcase-reveal w-full pt-1 sm:pt-2 mb-3 sm:mb-5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch">
            {/* Left Column: High-Res Clinical Image (Flush Height Alignment with Content - Desktop Only) */}
            <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 flex-col justify-start pl-0 sm:pl-2 lg:pl-4 xl:pl-5">
              <div className="relative w-full h-56 sm:h-64 lg:h-full lg:min-h-full rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-slate-200/90 group bg-slate-100 transition-all duration-300">
                <img
                  src={currentService.img}
                  alt={currentService.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Soft natural edge lighting */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/15 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Right Column: Content Details (Heading, Subtext, Points) */}
            <div className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between">
              {/* Header: Title and Subtext */}
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#002B49] font-serif leading-snug tracking-tight mb-2 sm:mb-2.5">
                  {currentService.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-[14.5px] leading-relaxed mb-4 sm:mb-5 font-sans max-w-2xl">
                  {currentService.summary}
                </p>
              </div>

              {/* Responsive Image (Mobile & Tablet: displayed after heading and subtext, hidden on desktop) */}
              <div className="block lg:hidden mb-4 sm:mb-5">
                <div className="relative w-full h-52 sm:h-64 md:h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-lg border border-slate-200/90 group bg-slate-100 transition-all duration-300">
                  <img
                    src={currentService.img}
                    alt={currentService.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Soft natural edge lighting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* 2-Column Illustrated Capsule Cards (Clean Borderless Pill Design) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {/* Column 1 */}
                <div className="space-y-2 sm:space-y-2.5">
                  {bulletsCol1.map((bullet, idx) => {
                    const isRed = idx % 2 === 1;
                    return (
                      <div
                        key={idx}
                        className="service-bullet-item group flex items-center gap-2 sm:gap-2.5 pl-1.5 pr-3 sm:pr-3.5 py-1.5 min-h-[44px] sm:min-h-[48px] rounded-full bg-white shadow-[0_2px_10px_rgba(0,43,73,0.06)] hover:shadow-[0_4px_16px_rgba(0,43,73,0.12)] border border-slate-100/80 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                      >
                        {/* Left Circular Icon Badge */}
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ring-2 sm:ring-[2.5px] ring-white shadow-sm transition-transform duration-200 group-hover:scale-105 ${isRed
                              ? 'bg-gradient-to-br from-[#E02E2E] via-[#D12323] to-[#B31A1A] text-white shadow-rose-900/15'
                              : 'bg-gradient-to-br from-[#0088CC] via-[#0070BA] to-[#005599] text-white shadow-sky-900/15'
                            }`}
                        >
                          {getServiceBulletIcon(bullet)}
                        </div>

                        {/* Text Content */}
                        <span className="flex-1 text-[11.5px] sm:text-[12px] xl:text-[12.5px] font-semibold text-[#002B49] leading-snug tracking-tight font-sans pl-0.5">
                          {bullet}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Column 2 */}
                <div className="space-y-2 sm:space-y-2.5">
                  {bulletsCol2.map((bullet, idx) => {
                    const isRed = idx % 2 === 1;
                    return (
                      <div
                        key={idx}
                        className="service-bullet-item group flex items-center gap-2 sm:gap-2.5 pl-1.5 pr-3 sm:pr-3.5 py-1.5 min-h-[44px] sm:min-h-[48px] rounded-full bg-white shadow-[0_2px_10px_rgba(0,43,73,0.06)] hover:shadow-[0_4px_16px_rgba(0,43,73,0.12)] border border-slate-100/80 hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                      >
                        {/* Left Circular Icon Badge */}
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 ring-2 sm:ring-[2.5px] ring-white shadow-sm transition-transform duration-200 group-hover:scale-105 ${isRed
                              ? 'bg-gradient-to-br from-[#E02E2E] via-[#D12323] to-[#B31A1A] text-white shadow-rose-900/15'
                              : 'bg-gradient-to-br from-[#0088CC] via-[#0070BA] to-[#005599] text-white shadow-sky-900/15'
                            }`}
                        >
                          {getServiceBulletIcon(bullet)}
                        </div>

                        {/* Text Content */}
                        <span className="flex-1 text-[11.5px] sm:text-[12px] xl:text-[12.5px] font-semibold text-[#002B49] leading-snug tracking-tight font-sans pl-0.5">
                          {bullet}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
