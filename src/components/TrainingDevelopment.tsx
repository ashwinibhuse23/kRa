import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTag from './SectionTag';
import Logo from './Logo';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

interface TrainingDevelopmentProps {
  onOpenContactModal: () => void;
  onNavigateHome: (hash?: string) => void;
}

export default function TrainingDevelopment({
  onOpenContactModal,
  onNavigateHome,
}: TrainingDevelopmentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctx = gsap.context(() => {
      // 1. Hero Section Entrance (Immediate Slow Cinematic Load)
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      heroTl.fromTo(
        '.td-hero-tag',
        { opacity: 0, y: 20, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, clearProps: 'all' },
        0.1
      );

      heroTl.fromTo(
        '.td-hero-title',
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, clearProps: 'all' },
        0.25
      );

      heroTl.fromTo(
        '.td-hero-lead',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.3, clearProps: 'all' },
        0.4
      );

      heroTl.fromTo(
        '.td-hero-visual',
        { opacity: 0, scale: 0.96, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.6, clearProps: 'all' },
        0.3
      );

      heroTl.fromTo(
        '.td-hero-pill-card',
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12, clearProps: 'all' },
        0.6
      );

      // Reusable slow entrance animation with ScrollTrigger for each subsequent section
      // Guarantees smooth, slow, synchronized motion both in desktop and mobile view
      const animateSection = (
        triggerSelector: string,
        elements: {
          selector: string;
          y?: number;
          scale?: number;
          duration?: number;
          stagger?: number;
          delay?: number;
        }[]
      ) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerSelector,
            start: 'top 85%',
            once: true,
          },
          defaults: { ease: 'power3.out' },
        });

        elements.forEach((item) => {
          tl.fromTo(
            item.selector,
            {
              opacity: 0,
              y: item.y ?? 35,
              scale: item.scale ?? 1,
              filter: 'blur(6px)',
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: item.duration ?? 1.3,
              stagger: item.stagger ?? 0,
              clearProps: 'all',
            },
            item.delay !== undefined ? item.delay : 0
          );
        });
      };

      // 2. Section 2: Workflows & Operational Excellence
      animateSection('.td-section-workflows', [
        { selector: '.td-workflows-header', y: 35, duration: 1.3, delay: 0 },
        { selector: '.td-workflows-card', y: 30, scale: 0.97, duration: 1.2, stagger: 0.12, delay: 0.2 },
      ]);

      // 3. Section 3: Quality in Everyday Clinical Trials & BABE Banner
      animateSection('.td-section-quality', [
        { selector: '.td-quality-header', y: 35, duration: 1.3, delay: 0 },
        { selector: '.td-quality-point-card', y: 25, duration: 1.1, stagger: 0.08, delay: 0.15 },
        { selector: '.td-babe-banner', y: 20, scale: 0.95, duration: 1.2, delay: 0.3 },
        { selector: '.td-quality-bottom-card', y: 25, scale: 0.96, duration: 1.1, stagger: 0.1, delay: 0.4 },
      ]);

      // 4. Section 4: Role-Specific Training Modules
      animateSection('.td-section-roles', [
        { selector: '.td-roles-header', y: 35, duration: 1.3, delay: 0 },
        { selector: '.td-role-card', y: 35, scale: 0.96, duration: 1.3, stagger: 0.12, delay: 0.2 },
      ]);

      // 5. Section 5: Need-Based Training Programmes
      animateSection('.td-section-need', [
        { selector: '.td-need-header', y: 35, duration: 1.3, delay: 0 },
        { selector: '.td-need-pill', y: 20, scale: 0.96, duration: 1.1, delay: 0.15 },
        { selector: '.td-need-card', y: 25, scale: 0.97, duration: 1.1, stagger: 0.08, delay: 0.25 },
      ]);

      // 6. Section 6: Budgeting & Project Finance Management Banner
      animateSection('.td-section-budget', [
        { selector: '.td-budget-card', y: 30, scale: 0.98, duration: 1.3, delay: 0 },
      ]);

      // 7. Section 7: Flexible Training Delivery
      animateSection('.td-section-delivery', [
        { selector: '.td-delivery-header', y: 35, duration: 1.3, delay: 0 },
        { selector: '.td-delivery-card', y: 25, scale: 0.96, duration: 1.1, stagger: 0.1, delay: 0.2 },
      ]);

      // 8. Section 8: Performance & Competence Excellence
      animateSection('.td-section-performance', [
        { selector: '.td-performance-content', y: 35, duration: 1.3, delay: 0 },
      ]);

      // 9. Section 9: Bottom Callout Banner
      animateSection('.td-section-cta', [
        { selector: '.td-cta-box', y: 30, scale: 0.98, duration: 1.3, delay: 0 },
      ]);

      // Refresh ScrollTrigger once DOM layout has fully settled
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, []);


  
  // 5 Quality Principles (Matching Reference Mockup)
  const qualityCards = [
    {
      title: 'Individual accountability and ownership',
      color: 'blue',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11" />
          <polygon points="12 5 13 7.5 15.5 7.8 13.6 9.5 14.1 12 12 10.7 9.9 12 10.4 9.5 8.5 7.8 11 7.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: 'Right-first-time approach',
      color: 'red',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      title: 'Continuous improvement in clinical conduct',
      color: 'blue',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      title: 'Effective collaboration across teams',
      color: 'red',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Building a sustainable quality culture',
      color: 'blue',
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V10" />
          <path d="M12 20V4" />
          <path d="M6 20v-6" />
          <path d="M4 14l6-6 4 4 6-6" />
          <path d="M17 2h3v3" />
        </svg>
      ),
    },
  ];

  // Role-Specific Training Modules (6 Modules Matching Reference Design)
  const roleModules = [
    {
      title: 'CRA – Clinical Research Associate',
      color: 'blue',
      desc: 'Clinical trial monitoring, site management, source data verification and compliance.',
      img: '/traning/role.png',
      icon: (
        <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3h6m-4 0v6.172a2 2 0 01-.586 1.414l-4.828 4.828A2 2 0 007 19h10a2 2 0 001.414-3.414L13.586 10.586A2 2 0 0113 9.172V3" />
        </svg>
      ),
    },
    {
      title: 'CTA – Clinical Trial Assistant',
      color: 'red',
      desc: 'TMF management, study tracking, document quality checks and coordination.',
      img: '/traning/cta.png',
      icon: (
        <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'PM – Project Management',
      color: 'blue',
      desc: 'Trial planning, timelines, risk assessment and performance monitoring.',
      img: '/traning/pm.png',
      icon: (
        <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Clinic Head Module',
      color: 'red',
      desc: 'Site operations, investigator coordination and team management.',
      img: '/traning/head.png',
      icon: (
        <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Other Functional Modules',
      color: 'blue',
      desc: 'Clinical Operations, QA, Regulatory Affairs, PV, Medical Writing & more.',
      img: '/traning/other.png',
      icon: (
        <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Leadership & Management Development',
      color: 'red',
      desc: 'Building leadership, decision-making and team management capabilities for clinical research excellence.',
      img: '/traning/leadership.png',
      icon: (
        <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
    },
  ];

  // Need-Based Training Programmes Interventions (Matching Reference Design)
  const needInterventions = [
    {
      title: 'Training Needs Assessment (TNA)',
      color: 'blue',
      icon: (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Competency and skill-gap analysis',
      color: 'red',
      icon: (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
          <circle cx="12" cy="12" r="5" strokeWidth={1.8} />
          <circle cx="12" cy="12" r="2" strokeWidth={1.8} />
        </svg>
      ),
    },
    {
      title: 'Project and protocol-specific training',
      color: 'blue',
      icon: (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'SOP, process and system orientation',
      color: 'blue',
      icon: (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: 'Refresher and remedial training',
      color: 'red',
      icon: (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
    {
      title: 'Regulatory and compliance updates',
      color: 'red',
      icon: (
        <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];



  return (
    <div ref={containerRef} className="w-full bg-[#FAFCFE] text-slate-900 font-sans selection:bg-[#0078B8] selection:text-white">
      {/* ── Top Brand Header Bar (Preserved as requested) ── */}
      <header className="sticky top-0 z-40 w-full bg-[#030E1F]/95 backdrop-blur-xl border-b border-[#0078B8]/30 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo on the left */}
          <button
            type="button"
            onClick={() => onNavigateHome('#home')}
            className="flex items-center group transition-transform duration-300 hover:scale-[1.02] cursor-pointer shrink-0"
            title="kRa Life Sciences Home"
          >
            <Logo
              height={64}
              theme="dark"
              className="h-11 sm:h-13 lg:h-14 drop-shadow-[0_0_14px_rgba(0,120,184,0.35)]"
            />
          </button>

          {/* Desktop Navigation Menu (Center) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              type="button"
              onClick={() => onNavigateHome('#home')}
              className="relative text-[14px] font-medium transition-all duration-200 px-3.5 py-1.5 rounded-full text-white/80 hover:text-[#00C4FF] hover:bg-white/[0.08] cursor-pointer"
            >
              Home
            </button>

            {/* About Us with Dropdown */}
            <div
              className="relative group/aboutdrop"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => onNavigateHome('#about')}
                className="relative text-[14px] font-medium transition-all duration-200 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-white/80 hover:text-[#00C4FF] hover:bg-white/[0.08] cursor-pointer"
              >
                <span>About Us</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 group-hover/aboutdrop:rotate-180 group-hover/aboutdrop:text-[#00C4FF] ${
                    aboutDropdownOpen ? 'rotate-180 text-[#00C4FF]' : 'text-white/60'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-44 z-50 transition-all duration-200 opacity-0 pointer-events-none -translate-y-1 group-hover/aboutdrop:opacity-100 group-hover/aboutdrop:pointer-events-auto group-hover/aboutdrop:translate-y-0 ${
                  aboutDropdownOpen ? '!opacity-100 !pointer-events-auto !translate-y-0' : ''
                }`}
              >
                <div className="rounded-2xl border border-[#0078B8]/60 bg-[#030E1F]/95 backdrop-blur-2xl p-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.7),0_0_20px_rgba(0,120,184,0.3)] flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setAboutDropdownOpen(false);
                      onNavigateHome('#expertise');
                    }}
                    className="px-3.5 py-2 rounded-xl text-[13px] font-medium text-left text-white/80 hover:text-[#00C4FF] hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
                  >
                    Expertise
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAboutDropdownOpen(false);
                      onNavigateHome('#leadership');
                    }}
                    className="px-3.5 py-2 rounded-xl text-[13px] font-medium text-left text-white/80 hover:text-[#00C4FF] hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
                  >
                    Leadership
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAboutDropdownOpen(false);
                      onNavigateHome('#why-kra');
                    }}
                    className="px-3.5 py-2 rounded-xl text-[13px] font-medium text-left text-white/80 hover:text-[#00C4FF] hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
                  >
                    Why kRa
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateHome('#services')}
              className="relative text-[14px] font-medium transition-all duration-200 px-3.5 py-1.5 rounded-full text-white/80 hover:text-[#00C4FF] hover:bg-white/[0.08] cursor-pointer"
            >
              Services
            </button>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative text-[14px] font-semibold transition-all duration-200 px-3.5 py-1.5 rounded-full flex items-center justify-center whitespace-nowrap text-[#00C4FF] bg-[#0078B8]/30 border border-[#00C4FF]/50 shadow-[0_0_16px_rgba(0,196,255,0.3)] cursor-pointer"
            >
              Training &amp; Development
            </button>

            <button
              type="button"
              onClick={() => onNavigateHome('#contact')}
              className="relative text-[14px] font-medium transition-all duration-200 px-3.5 py-1.5 rounded-full text-white/80 hover:text-[#00C4FF] hover:bg-white/[0.08] cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Back to Home + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateHome('#home')}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#0078B8]/50 bg-[#0078B8]/20 hover:bg-[#0078B8]/35 text-[#00C4FF] hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-[0_0_14px_rgba(0,196,255,0.25)] hover:shadow-[0_0_20px_rgba(0,196,255,0.4)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center border border-[#0078B8]/60 bg-[#030E1F]/90 text-[#00C4FF] hover:text-white shadow-[0_4px_16px_rgba(0,120,184,0.3)] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5 text-[#00C4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#00C4FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#0078B8]/30 bg-[#030E1F]/98 backdrop-blur-2xl px-4 py-3 shadow-[0_20px_48px_rgba(0,0,0,0.85)] flex flex-col gap-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome('#home');
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/[0.08] cursor-pointer"
            >
              Home
            </button>

            <div className="flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/[0.08]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateHome('#about');
                  }}
                  className="flex-1 text-left cursor-pointer"
                >
                  About Us
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileAboutExpanded(!mobileAboutExpanded);
                  }}
                  className="p-1 text-[#00C4FF] hover:text-white cursor-pointer"
                  aria-label="Toggle About submenu"
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileAboutExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {mobileAboutExpanded && (
                <div className="pl-4 py-1 flex flex-col gap-1 border-l-2 border-[#0078B8]/30 ml-4 my-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateHome('#expertise');
                    }}
                    className="text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] cursor-pointer"
                  >
                    Expertise
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateHome('#leadership');
                    }}
                    className="text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] cursor-pointer"
                  >
                    Leadership
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateHome('#why-kra');
                    }}
                    className="text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] cursor-pointer"
                  >
                    Why kRa
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome('#services');
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/[0.08] cursor-pointer"
            >
              Services
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#0078B8]/30 text-[#00C4FF] border border-[#00C4FF]/40 cursor-pointer flex items-center justify-between"
            >
              <span>Training &amp; Development</span>
              <span className="w-2 h-2 rounded-full bg-[#00C4FF] shadow-[0_0_8px_#00C4FF]" />
            </button>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateHome('#contact');
              }}
              className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/[0.08] cursor-pointer"
            >
              Contact
            </button>
          </div>
        )}
      </header>

      {/* ── Section 1: Hero Header (Matching Reference Design with /traning/training.png) ── */}
      <section className="td-section-hero relative overflow-hidden pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-14 bg-gradient-to-b from-[#F2F7FC] via-white to-white border-b border-slate-200/80">
        {/* Full-Bleed Desktop Background Graphic (/traning/training.png) */}
        <div className="td-hero-visual hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
          <img
            src="/traning/training.png"
            alt="Clinical Research Training & Development"
            className="w-full h-full object-cover object-right"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Main Top Content: Left Side Text Column */}
          <div className="max-w-2xl lg:max-w-[56%] xl:max-w-[53%]">
            {/* Section Tag */}
            <div className="td-hero-tag mb-3 sm:mb-3.5">
              <SectionTag text="TRAINING &amp; DEVELOPMENT" variant="green" />
            </div>

            {/* Main Headline */}
            <h1 className="td-hero-title font-bold text-[#0A1E3B] tracking-tight font-serif leading-[1.18]">
              <span className="block text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] whitespace-nowrap">Building Clinical Research Competence.</span>
              <span className="block text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] whitespace-nowrap text-[#0078B8] mt-1 sm:mt-1.5">Strengthening Operational Excellence.</span>
            </h1>



            {/* Lead Paragraphs */}
            <div className="td-hero-lead space-y-3 text-slate-600 text-xs sm:text-sm lg:text-[14px] leading-relaxed mt-5 sm:mt-6">
              <p className="font-semibold text-slate-800 text-xs sm:text-sm lg:text-[14.5px]">
                Quality clinical trials begin with competent people, well-defined processes and consistent execution.
              </p>
              <p>
                At <strong className="text-slate-900 font-semibold">kRa Life Sciences</strong>, our{' '}
                <span className="text-[#0078B8] font-semibold">Training &amp; Development</span> programmes are designed to strengthen clinical research capabilities, improve operational efficiency and embed quality across clinical trial teams.
              </p>

              {/* Callout Box with Circular People Icon (Matching Reference Image) */}
              <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-[#EBF5FA]/90 border border-sky-200/70 flex items-center gap-3.5 shadow-xs backdrop-blur-xs">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-xs flex items-center justify-center shrink-0 text-[#0078B8]">
                  <svg className="w-5.5 h-5.5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
                  Through structured learning, role-specific training and practical interventions, we help professionals translate knowledge into better performance, compliance and clinical trial outcomes.
                </p>
              </div>
            </div>


          </div>

          {/* Mobile Illustration (Hidden in mobile view, preserved for tablet/desktop responsive) */}
          <div className="hidden md:block lg:hidden mt-6 rounded-2xl overflow-hidden border border-sky-200/80 shadow-md">
            <img
              src="/traning/training.png"
              alt="Clinical Research Training & Development"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* ── 3 Pill Feature Cards (Matching Bottom of Reference Image 2) ── */}
          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 relative z-10 max-w-[90%]">
            {/* Card 1: Roles, roles and responsibilities */}
            <div className="td-hero-pill-card rounded-xl p-3 bg-gradient-to-r from-sky-50/95 to-blue-50/80 border border-sky-200/80 flex items-center gap-2.5 shadow-xs hover:shadow-sm hover:border-sky-300 transition-all">
              <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#0078B8] shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="font-bold text-[11px] sm:text-xs text-slate-800 leading-snug">
                Roles, roles and responsibilities
              </span>
            </div>

            {/* Card 2: SOP implementation and process adherence */}
            <div className="td-hero-pill-card rounded-xl p-3 bg-gradient-to-r from-rose-50/95 to-pink-50/80 border border-rose-200/80 flex items-center gap-2.5 shadow-xs hover:shadow-sm hover:border-rose-300 transition-all">
              <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#CF3838] shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="font-bold text-[11px] sm:text-xs text-slate-800 leading-snug">
                SOP implementation and process adherence
              </span>
            </div>

            {/* Card 3: Identifying gaps and improvement opportunities */}
            <div className="td-hero-pill-card rounded-xl p-3 bg-gradient-to-r from-sky-50/95 to-cyan-50/80 border border-sky-200/80 flex items-center gap-2.5 shadow-xs hover:shadow-sm hover:border-sky-300 transition-all">
              <div className="w-8 h-8 rounded-lg bg-white shadow-xs flex items-center justify-center text-[#0078B8] shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <span className="font-bold text-[11px] sm:text-xs text-slate-800 leading-snug">
                Identifying gaps and improvement opportunities
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflows & Operational Excellence Section ── */}
      <section className="td-section-workflows relative overflow-hidden min-h-[440px] md:min-h-[480px] lg:min-h-[500px] flex items-center bg-[#07172E]">
        {/* Background Image - Positioned to show the full left-side gear graphic & vibrant high-tech details */}
        <div className="absolute inset-0 z-0">
          <img
            src="/traning/workflow.png"
            alt="Workflows & Operational Excellence"
            className="w-full h-full object-cover object-left lg:object-left-bottom"
          />
          {/* Subtle vignette for contrast behind text while keeping all visuals 100% bright */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06172E]/10 to-[#06172E]/35 pointer-events-none" />
          {/* Mobile contrast overlay (Hidden on tablet/desktop) */}
          <div className="absolute inset-0 bg-[#07172E]/60 sm:hidden pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2 sm:pt-3 lg:pt-4 pb-8 sm:pb-10 lg:pb-12">
          {/* Header - Centered on mobile, shifted on desktop */}
          <div className="td-workflows-header text-center max-w-5xl mx-auto mb-6 sm:mb-8 lg:mb-10 flex flex-col items-center px-4 sm:px-0 sm:pl-28 md:pl-40 lg:pl-56 xl:pl-68 sm:translate-x-5 lg:translate-x-8">
            {/* Headline - Responsive wrap on mobile, single line on desktop */}
            <h2 className="text-[20px] min-[390px]:text-[22px] sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[36px] font-bold font-serif tracking-tight text-center mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:whitespace-nowrap">
              <span className="text-white">Workflows &amp; </span>
              <span className="text-[#00C4FF]">Operational Excellence</span>
            </h2>

            {/* Subtitle - Website theme paragraph styling with increased size */}
            <p className="text-xs min-[380px]:text-sm sm:text-[15px] lg:text-base text-slate-200/90 font-sans leading-relaxed text-center max-w-xl mx-auto mb-2 drop-shadow-sm font-normal px-2 sm:px-0">
              Improving coordination, productivity and operational effectiveness.
            </p>
          </div>

          {/* Cards Grid - Centered on mobile, aligned on desktop */}
          <div className="flex justify-center sm:justify-end w-full px-3 sm:px-0 sm:pl-10 md:pl-16 lg:pl-24 sm:pr-11 md:pr-18 lg:pr-26 xl:pr-32">
            <div className="w-full max-w-sm min-[420px]:max-w-md sm:max-w-xl lg:max-w-2xl lg:w-[60%] xl:w-[54%]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4.5">
                {/* Card 1: Role-based workflows (Blue Circular Icon Badge) */}
                <div className="td-workflows-card bg-[#061C3D]/90 sm:bg-[#061C3D]/85 backdrop-blur-md rounded-2xl p-3.5 sm:p-5 min-h-[84px] sm:min-h-[100px] flex items-center gap-3 sm:gap-4 border border-[#00C4FF]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(0,196,255,0.2)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.6),0_0_24px_rgba(0,196,255,0.4)] hover:border-[#00C4FF] hover:bg-[#08244D] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0078B8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md text-white">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-[12.5px] min-[380px]:text-[13px] sm:text-[14px] lg:text-[14.5px] font-medium sm:font-semibold text-white leading-snug drop-shadow-xs">
                    Role-based workflows and task management
                  </p>
                </div>

                {/* Card 2: Cross-functional coordination (Red Circular Icon Badge) */}
                <div className="td-workflows-card bg-[#061C3D]/90 sm:bg-[#061C3D]/85 backdrop-blur-md rounded-2xl p-3.5 sm:p-5 min-h-[84px] sm:min-h-[100px] flex items-center gap-3 sm:gap-4 border border-[#00C4FF]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(0,196,255,0.2)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.6),0_0_24px_rgba(0,196,255,0.4)] hover:border-[#00C4FF] hover:bg-[#08244D] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#CF3838] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md text-white">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-[12.5px] min-[380px]:text-[13px] sm:text-[14px] lg:text-[14.5px] font-medium sm:font-semibold text-white leading-snug drop-shadow-xs">
                    Cross-functional coordination and communication
                  </p>
                </div>

                {/* Card 3: Risk identification (Blue Circular Icon Badge) */}
                <div className="td-workflows-card bg-[#061C3D]/90 sm:bg-[#061C3D]/85 backdrop-blur-md rounded-2xl p-3.5 sm:p-5 min-h-[84px] sm:min-h-[100px] flex items-center gap-3 sm:gap-4 border border-[#00C4FF]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(0,196,255,0.2)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.6),0_0_24px_rgba(0,196,255,0.4)] hover:border-[#00C4FF] hover:bg-[#08244D] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#0078B8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md text-white">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-[12.5px] min-[380px]:text-[13px] sm:text-[14px] lg:text-[14.5px] font-medium sm:font-semibold text-white leading-snug drop-shadow-xs">
                    Risk identification and issue resolution
                  </p>
                </div>

                {/* Card 4: Resource utilisation (Red Circular Icon Badge) */}
                <div className="td-workflows-card bg-[#061C3D]/90 sm:bg-[#061C3D]/85 backdrop-blur-md rounded-2xl p-3.5 sm:p-5 min-h-[84px] sm:min-h-[100px] flex items-center gap-3 sm:gap-4 border border-[#00C4FF]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(0,196,255,0.2)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.6),0_0_24px_rgba(0,196,255,0.4)] hover:border-[#00C4FF] hover:bg-[#08244D] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#CF3838] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md text-white">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <p className="text-[12.5px] min-[380px]:text-[13px] sm:text-[14px] lg:text-[14.5px] font-medium sm:font-semibold text-white leading-snug drop-shadow-xs">
                    Resource utilisation and continuous improvement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── Section 3: Quality in Everyday Clinical Trials (Unified Design Matching Reference) ── */}
      <section id="clinical-trials" className="td-section-quality relative overflow-hidden py-6 sm:py-8 lg:py-10 bg-[#F2F8FD] border-b border-sky-100/80">
        {/* Background Image: quality.png showing test tubes, pipette and DNA graphic on the right */}
        <div className="absolute inset-0 z-0">
          <img
            src="/traning/quality.png"
            alt="Quality in Everyday Clinical Trials"
            className="w-full h-full object-cover object-right"
          />
          {/* Subtle mobile overlay for optimal text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent md:hidden pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Top Part: Header + 5 Quality Points */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="td-quality-header lg:col-span-7 xl:col-span-6 pl-2 sm:pl-3 lg:pl-4 pr-0 lg:pr-6">
              {/* Title - Signature Website Heading Theme with Gradient Accent */}
              <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-bold font-serif text-[#061C3D] tracking-tight leading-tight mb-2 sm:mb-2.5">
                Quality in Everyday{' '}
                <span className="bg-gradient-to-r from-[#0078B8] via-[#0094C6] to-[#00A8CC] bg-clip-text text-transparent">
                  Clinical Trials
                </span>
              </h2>

              {/* Subtitle - Website Signature Section Subtitle Theme */}
              <p className="text-sm sm:text-[15px] lg:text-base text-slate-600 font-sans leading-relaxed font-normal max-w-xl mb-5 sm:mb-6">
                Embedding quality and compliance into everyday clinical trial activities.
              </p>

              {/* 5 Quality Cards in 2 Columns with Colored Borders & Proper Design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-2xl">
                {/* Point 1: ICH-GCP (Blue) */}
                <div className="td-quality-point-card bg-white/95 backdrop-blur-xs rounded-xl sm:rounded-2xl border border-sky-200/80 hover:border-[#0078B8] shadow-[0_2px_8px_rgba(0,120,184,0.04)] hover:shadow-md transition-all duration-200 p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3 group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] border-[#0078B8] bg-sky-50/80 text-[#0078B8] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0078B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <span className="font-bold text-[11.5px] sm:text-xs lg:text-[12.5px] text-slate-800 leading-snug group-hover:text-[#0078B8] transition-colors pr-1">
                    ICH-GCP principles and regulatory compliance
                  </span>
                </div>

                {/* Point 2: Protocol Adherence (Red) */}
                <div className="td-quality-point-card bg-white/95 backdrop-blur-xs rounded-xl sm:rounded-2xl border border-rose-200/80 hover:border-[#CF3838] shadow-[0_2px_8px_rgba(207,56,56,0.04)] hover:shadow-md transition-all duration-200 p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3 group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] border-[#CF3838] bg-rose-50/80 text-[#CF3838] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#CF3838]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <span className="font-bold text-[11.5px] sm:text-xs lg:text-[12.5px] text-slate-800 leading-snug group-hover:text-[#CF3838] transition-colors pr-1">
                    Protocol adherence and informed consent
                  </span>
                </div>

                {/* Point 3: Source Documentation (Blue) */}
                <div className="td-quality-point-card bg-white/95 backdrop-blur-xs rounded-xl sm:rounded-2xl border border-sky-200/80 hover:border-[#0078B8] shadow-[0_2px_8px_rgba(0,120,184,0.04)] hover:shadow-md transition-all duration-200 p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3 group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] border-[#0078B8] bg-sky-50/80 text-[#0078B8] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0078B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <span className="font-bold text-[11.5px] sm:text-xs lg:text-[12.5px] text-slate-800 leading-snug group-hover:text-[#0078B8] transition-colors pr-1">
                    Source documentation and data integrity
                  </span>
                </div>

                {/* Point 4: AE/SAE Reporting (Red) */}
                <div className="td-quality-point-card bg-white/95 backdrop-blur-xs rounded-xl sm:rounded-2xl border border-rose-200/80 hover:border-[#CF3838] shadow-[0_2px_8px_rgba(207,56,56,0.04)] hover:shadow-md transition-all duration-200 p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3 group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] border-[#CF3838] bg-rose-50/80 text-[#CF3838] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#CF3838]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <span className="font-bold text-[11.5px] sm:text-xs lg:text-[12.5px] text-slate-800 leading-snug group-hover:text-[#CF3838] transition-colors pr-1">
                    AE/SAE reporting and deviation management
                  </span>
                </div>

                {/* Point 5: Audit Readiness (Blue) */}
                <div className="td-quality-point-card bg-white/95 backdrop-blur-xs rounded-xl sm:rounded-2xl border border-sky-200/80 hover:border-[#0078B8] shadow-[0_2px_8px_rgba(0,120,184,0.04)] hover:shadow-md transition-all duration-200 p-2 sm:p-2.5 flex items-center gap-2.5 sm:gap-3 group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-[1.5px] border-[#0078B8] bg-sky-50/80 text-[#0078B8] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0078B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="6.5" />
                      <line x1="16" y1="16" x2="20.5" y2="20.5" />
                    </svg>
                  </div>
                  <span className="font-bold text-[11.5px] sm:text-xs lg:text-[12.5px] text-slate-800 leading-snug group-hover:text-[#0078B8] transition-colors pr-1">
                    Audit and inspection readiness
                  </span>
                </div>
              </div>
            </div>

            {/* Right Spacer Column (Allows test tubes, pipette & DNA graphic in quality.png to show) */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />
          </div>

          {/* Middle Divider Pill */}
          <div className="td-babe-banner relative flex items-center justify-center mt-3 sm:mt-4 lg:mt-5 mb-7 sm:mb-8 lg:mb-9">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sky-300/70" />
            </div>
            <div className="relative z-10 px-5 sm:px-7 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#005285] via-[#0078B8] to-[#005285] text-white font-bold text-xs sm:text-[13px] lg:text-sm tracking-wide shadow-md">
              Quality is Everyday BABE
            </div>
          </div>

          {/* Bottom 5 Cards in a Single Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3 lg:gap-3.5 max-w-6xl mx-auto pt-2 sm:pt-2.5">
            {qualityCards.map((card) => {
              const isRed = card.color === 'red';
              return (
                <div
                  key={card.title}
                  className="td-quality-bottom-card bg-white/95 backdrop-blur-xs rounded-xl sm:rounded-2xl border border-sky-100/90 shadow-[0_3px_10px_rgba(0,120,184,0.05)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center px-3 py-2.5 sm:px-3.5 sm:py-3 pt-0 group cursor-default min-h-[94px] sm:min-h-[102px] justify-start"
                >
                  {/* Floating Bookmark Flag Badge at Top */}
                  <div
                    className={`w-9.5 h-8.5 sm:w-10 sm:h-9 -mt-3.5 sm:-mt-4 rounded-t-lg rounded-b-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-4.5 sm:[&>svg]:h-4.5 ${
                      isRed
                        ? 'bg-gradient-to-b from-[#CF3838] to-[#A82525]'
                        : 'bg-gradient-to-b from-[#0078B8] to-[#005B94]'
                    }`}
                  >
                    {card.icon}
                  </div>

                  {/* Title */}
                  <span className="text-[11px] sm:text-[11.5px] lg:text-[12px] font-bold text-slate-800 leading-snug mt-2 sm:mt-2.5 group-hover:text-[#0078B8] transition-colors">
                    {card.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>






      {/* ── Section 5: Role-Specific Training Modules (Matching Reference Design) ── */}
      <section id="role-modules" className="td-section-roles relative py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-[#F7FAFD] via-white to-[#F5FAFD] border-b border-slate-200/80 overflow-hidden">
        {/* Soft Background Accent Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Section Header Matching Website Theme */}
          <div className="td-roles-header mb-6 sm:mb-7 lg:mb-8 max-w-6xl mx-auto pl-2 sm:pl-3 lg:pl-4">
            {/* Title - Signature Website Heading Theme with Gradient Accent */}
            <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[36px] font-bold font-serif text-[#061C3D] tracking-tight leading-tight mb-2.5 sm:mb-3">
              Role-Specific Training{' '}
              <span className="bg-gradient-to-r from-[#0078B8] via-[#0094C6] to-[#00A8CC] bg-clip-text text-transparent">
                Modules
              </span>
            </h2>

            {/* Subtitle - Website Signature Section Subtitle Theme */}
            <p className="text-sm sm:text-[15px] lg:text-base text-slate-600 font-sans leading-relaxed font-normal max-w-3xl">
              Structured clinical research training programmes designed around functional responsibilities, practical knowledge and competency development.
            </p>
          </div>

          {/* 6 Photo Cards Grid (3 Columns x 2 Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
            {roleModules.map((role) => {
              const isRed = role.color === 'red';
              return (
                <div
                  key={role.title}
                  className={`td-role-card bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-[0_3px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group border-b-[3.5px] ${
                    isRed ? 'border-b-[#CF3838]' : 'border-b-[#0078B8]'
                  }`}
                >
                  {/* Top Photo with Bottom Curved Wave Mask */}
                  <div className="h-40 sm:h-44 w-full relative overflow-hidden bg-slate-100">
                    <img
                      src={role.img}
                      alt={role.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/35 via-transparent to-transparent pointer-events-none" />

                    {/* Fluid Curved Wave & Colored Swoop at Bottom */}
                    <div className="absolute -bottom-px left-0 right-0 h-9 pointer-events-none">
                      <svg viewBox="0 0 400 40" preserveAspectRatio="none" className="w-full h-full">
                        {/* Colored swoop on the left */}
                        <path
                          d="M0,0 C30,24 60,40 120,40 L0,40 Z"
                          fill={isRed ? '#CF3838' : '#0078B8'}
                        />
                        {/* White bottom slope */}
                        <path
                          d="M0,40 C70,40 110,24 200,20 C300,16 350,26 400,10 L400,40 L0,40 Z"
                          fill="#ffffff"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Circular White Floating Badge with Colored Border */}
                  <div className="relative -mt-5 sm:-mt-5.5 ml-4 sm:ml-5 mb-2 z-10">
                    <div
                      className={`w-10.5 h-10.5 sm:w-11 sm:h-11 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110 border-[2px] [&>svg]:w-4.5 [&>svg]:h-4.5 sm:[&>svg]:w-5 sm:[&>svg]:h-5 ${
                        isRed ? 'border-[#CF3838] text-[#CF3838]' : 'border-[#0078B8] text-[#0078B8]'
                      }`}
                    >
                      {role.icon}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="px-4.5 sm:px-5 pb-4.5 sm:pb-5 pt-0.5 flex-1 flex flex-col justify-start">
                    <h3 className="text-[14.5px] sm:text-[15.5px] font-bold text-[#061C3D] leading-snug mb-1.5 group-hover:text-[#0078B8] transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-[11.5px] sm:text-xs lg:text-[12.5px] text-slate-600 leading-relaxed font-sans">
                      {role.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 6: Need-Based Training Programmes (With need.png Background) ── */}
      <section id="need-based" className="td-section-need relative overflow-hidden py-6 sm:py-8 lg:py-10 bg-[#F4F9FD] border-b border-sky-100/80">
        {/* Background Image - need.png showing 3D cubes on left (Hidden on mobile view, shown on tablet/desktop) */}
        <div className="hidden md:block absolute inset-0 z-0">
          <img
            src="/traning/need.png"
            alt="Need-Based Training Programmes"
            className="w-full h-full object-cover object-left md:object-center"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Left Column: Space for the 3D Cubes graphic from need.png */}
            <div className="hidden md:block md:col-span-4 lg:col-span-4" />

            {/* Right Column: Content from Reference Design */}
            <div className="md:col-span-8 lg:col-span-8 md:pl-3 lg:pl-13">
              {/* Section Header Matching Website Theme */}
              <div className="td-need-header mb-4 sm:mb-5">
                {/* Title - Signature Website Heading Theme with Gradient Accent */}
                <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-bold font-serif text-[#061C3D] tracking-tight leading-tight mb-2 sm:mb-2.5">
                  Need-Based Training{' '}
                  <span className="bg-gradient-to-r from-[#0078B8] via-[#0094C6] to-[#00A8CC] bg-clip-text text-transparent">
                    Programmes
                  </span>
                </h2>

                {/* Subtitle - Website Signature Section Subtitle Theme */}
                <p className="text-sm sm:text-[15px] lg:text-base text-slate-600 font-sans leading-relaxed font-normal max-w-2xl mb-4 sm:mb-5">
                  Every organisation has different learning requirements. Our customised training programmes address specific competency gaps, operational challenges and evolving regulatory expectations.
                </p>
              </div>

              {/* Blue Pill: "Our interventions include:" */}
              <div className="td-need-pill mb-3 sm:mb-3.5 mt-1 sm:mt-1.5">
                <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-[#005285] via-[#0078B8] to-[#005285] text-white font-bold text-xs sm:text-[13px] tracking-wide shadow-md">
                  Our interventions include:
                </span>
              </div>

              {/* 6 Intervention Capsule Cards in 2 Columns x 3 Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3 max-w-2xl">
                {needInterventions.map((item) => {
                  const isRed = item.color === 'red';
                  return (
                    <div
                      key={item.title}
                      className={`td-need-card bg-white/95 backdrop-blur-xs rounded-full border transition-all duration-200 flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-1.5 sm:py-2 group cursor-default ${
                        isRed
                          ? 'border-rose-200/80 hover:border-[#CF3838] shadow-[0_2px_8px_rgba(207,56,56,0.04)] hover:shadow-md'
                          : 'border-sky-200/80 hover:border-[#0078B8] shadow-[0_2px_8px_rgba(0,120,184,0.04)] hover:shadow-md'
                      }`}
                    >
                      {/* Icon Circle Badge */}
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-200 group-hover:scale-105 border-[1.5px] ${
                          isRed
                            ? 'border-[#CF3838] text-[#CF3838] bg-rose-50/80'
                            : 'border-[#0078B8] text-[#0078B8] bg-sky-50/80'
                        }`}
                      >
                        {item.icon}
                      </div>

                      {/* Text Label */}
                      <span
                        className={`text-[11.5px] sm:text-xs lg:text-[12.5px] font-bold text-slate-800 leading-snug transition-colors pr-2 ${
                          isRed ? 'group-hover:text-[#CF3838]' : 'group-hover:text-[#0078B8]'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Budgeting & Project Finance Management (One-Liner Banner Similar to CTA Section) ── */}
      <section className="td-section-budget relative py-4 sm:py-5 bg-white border-b border-sky-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="td-budget-card bg-gradient-to-r from-[#EBF5FA] via-white to-[#EBF5FA] border border-sky-200/90 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xs hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
              {/* Financial Management Icon in Circle */}
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-sky-100 border border-sky-200/70 text-[#0078B8] flex items-center justify-center shrink-0 shadow-xs">
                <svg className="w-6 h-6 sm:w-6.5 sm:h-6.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div>
                <h3 className="text-base sm:text-lg lg:text-[19px] font-bold font-serif text-[#061C3D] tracking-tight">
                  Budgeting &amp; Project Finance Management
                </h3>
                <p className="text-xs sm:text-[13.5px] text-slate-600 mt-0.5 sm:mt-1 font-sans leading-relaxed">
                  Building practical skills in clinical trial budgeting, cost estimation, financial planning and project cost control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Flexible Training Delivery ── */}
      <section id="flexible-delivery" className="td-section-delivery relative overflow-hidden py-7 sm:py-9 lg:py-10 bg-gradient-to-b from-[#F2F8FD] via-white to-[#F2F8FD] border-b border-sky-100/80">
        {/* Soft Background Accent Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Title & Target Motto */}
            <div className="td-delivery-header lg:col-span-5 flex flex-col justify-center pl-1.5 sm:pl-2 lg:pl-3">
              {/* Title - Signature Website Heading Theme with Gradient Accent in One Line */}
              <h2 className="text-2xl sm:text-3xl lg:text-[29px] xl:text-[33px] font-bold font-serif text-[#061C3D] tracking-tight leading-tight mb-3 sm:mb-4 sm:whitespace-nowrap">
                Flexible{' '}
                <span className="bg-gradient-to-r from-[#0078B8] via-[#0094C6] to-[#00A8CC] bg-clip-text text-transparent">
                  Training Delivery
                </span>
              </h2>

              {/* Bottom Target / Bullseye Motto with Website Theme Styling */}
              <div className="flex items-center gap-3 sm:gap-3.5 mt-1 sm:mt-1.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[1.5px] border-[#0078B8] bg-sky-50/80 text-[#0078B8] flex items-center justify-center shrink-0 shadow-2xs">
                  <svg className="w-4.5 h-4.5 text-[#0078B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <path d="M15.5 8.5l4-4m0 0h-3m3 0v3" />
                  </svg>
                </div>
                <div className="h-7 sm:h-8 w-px bg-slate-300" />
                <p className="text-xs sm:text-[13px] lg:text-[13.5px] text-slate-700 font-sans leading-relaxed">
                  <span className="font-semibold text-slate-800">Building Competence. Embedding Quality.</span><br />
                  <span className="font-bold text-[#0078B8]">Improving Performance.</span>
                </p>
              </div>
            </div>

            {/* Right Column: 4 Delivery Cards in a 2x2 Grid */}
            <div className="lg:col-span-7 pr-0 sm:pr-6 lg:pr-10 xl:pr-14">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 w-full max-w-xl lg:max-w-[530px]">
                
                {/* Card 1: Instructor-Led Training */}
                <div className="td-delivery-card bg-white/95 backdrop-blur-xs rounded-xl border border-sky-100/90 shadow-[0_2px_10px_rgba(0,120,184,0.06)] hover:shadow-md hover:border-sky-300 transition-all duration-200 p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 relative overflow-hidden group cursor-default">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EBF5FA] border border-sky-200/70 flex items-center justify-center shrink-0 text-[#0078B8] group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="12" height="9" rx="1" />
                      <circle cx="19" cy="5" r="2" />
                      <path d="M16 13v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                      <path d="M16 9.5l-3-.5" />
                      <circle cx="5" cy="18" r="1.5" />
                      <circle cx="9" cy="18" r="1.5" />
                      <circle cx="13" cy="18" r="1.5" />
                      <path d="M3 21h12" />
                    </svg>
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0078B8] transition-colors">
                      Instructor-Led
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0078B8] transition-colors">
                      Training
                    </span>
                  </div>
                  {/* Bottom-Right Curved Blue Wave Accent */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none">
                    <svg viewBox="0 0 32 32" className="w-full h-full text-[#0078B8] fill-current">
                      <path d="M32 0 C32 17.673 17.673 32 0 32 H32 V0 Z" />
                    </svg>
                  </div>
                </div>

                {/* Card 2: Virtual Training */}
                <div className="td-delivery-card bg-white/95 backdrop-blur-xs rounded-xl border border-sky-100/90 shadow-[0_2px_10px_rgba(0,120,184,0.06)] hover:shadow-md hover:border-sky-300 transition-all duration-200 p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 relative overflow-hidden group cursor-default">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EBF5FA] border border-sky-200/70 flex items-center justify-center shrink-0 text-[#0078B8] group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="12" rx="2" />
                      <path d="M2 18h20" />
                      <path d="M9 21h6" />
                      <circle cx="12" cy="9" r="2" />
                      <path d="M8.5 14a3.5 3.5 0 0 1 7 0" />
                    </svg>
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0078B8] transition-colors">
                      Virtual
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0078B8] transition-colors">
                      Training
                    </span>
                  </div>
                  {/* Bottom-Right Curved Blue Wave Accent */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none">
                    <svg viewBox="0 0 32 32" className="w-full h-full text-[#0078B8] fill-current">
                      <path d="M32 0 C32 17.673 17.673 32 0 32 H32 V0 Z" />
                    </svg>
                  </div>
                </div>

                {/* Card 3: Practical & Case-Based Learning */}
                <div className="td-delivery-card bg-white/95 backdrop-blur-xs rounded-xl border border-sky-100/90 shadow-[0_2px_10px_rgba(0,120,184,0.06)] hover:shadow-md hover:border-sky-300 transition-all duration-200 p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 relative overflow-hidden group cursor-default">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EBF5FA] border border-sky-200/70 flex items-center justify-center shrink-0 text-[#0078B8] group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 12l10 5 10-5" />
                      <path d="M2 17l10 5 10-5" />
                    </svg>
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0078B8] transition-colors">
                      Practical &amp; Case-Based
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0078B8] transition-colors">
                      Learning
                    </span>
                  </div>
                  {/* Bottom-Right Curved Blue Wave Accent */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none">
                    <svg viewBox="0 0 32 32" className="w-full h-full text-[#0078B8] fill-current">
                      <path d="M32 0 C32 17.673 17.673 32 0 32 H32 V0 Z" />
                    </svg>
                  </div>
                </div>

                {/* Card 4: Workshops & Refresher Sessions */}
                <div className="td-delivery-card bg-white/95 backdrop-blur-xs rounded-xl border border-sky-100/90 shadow-[0_2px_10px_rgba(0,120,184,0.06)] hover:shadow-md hover:border-sky-300 transition-all duration-200 p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 relative overflow-hidden group cursor-default">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EBF5FA] border border-sky-200/70 flex items-center justify-center shrink-0 text-[#0078B8] group-hover:scale-105 transition-transform duration-200">
                    <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="7" r="3" />
                      <path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                      <circle cx="5" cy="9" r="2.2" />
                      <path d="M1 20v-1.5a3.5 3.5 0 0 1 3.5-3.5" />
                      <circle cx="19" cy="9" r="2.2" />
                      <path d="M23 20v-1.5a3.5 3.5 0 0 0-3.5-3.5" />
                    </svg>
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0078B8] transition-colors">
                      Workshops &amp; Refresher
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0078B8] transition-colors">
                      Sessions
                    </span>
                  </div>
                  {/* Bottom-Right Curved Blue Wave Accent */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 pointer-events-none">
                    <svg viewBox="0 0 32 32" className="w-full h-full text-[#0078B8] fill-current">
                      <path d="M32 0 C32 17.673 17.673 32 0 32 H32 V0 Z" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 6: Performance & Competence Excellence (With performance.png Background) ── */}
      <section id="performance-excellence" className="td-section-performance relative overflow-hidden py-5 sm:py-6 lg:py-7 bg-[#F2F7FC] border-b border-sky-100/80">
        {/* Background Image Container (Hidden on mobile view, shown on tablet/desktop) */}
        <div className="hidden md:block absolute inset-0 z-0">
          <img
            src="/traning/performance.png"
            alt="Building Competence, Embedding Quality, Improving Performance"
            className="w-full h-full object-cover object-right"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[220px] sm:min-h-[250px]">
            {/* Left Content Area */}
            <div className="td-performance-content lg:col-span-7 xl:col-span-6 pr-0 lg:pr-6 pt-1 sm:pt-1.5 pl-1 sm:pl-2 lg:pl-3">
              {/* Title - Signature Website Heading Theme with Gradient Accent in Two Lines */}
              <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[35px] font-bold font-serif text-[#061C3D] tracking-tight leading-tight mb-3 sm:mb-3.5">
                <span className="block sm:whitespace-nowrap">Building Competence. Embedding Quality.</span>
                <span className="block bg-gradient-to-r from-[#0078B8] via-[#0094C6] to-[#00A8CC] bg-clip-text text-transparent">
                  Improving Performance.
                </span>
              </h2>

              {/* Description Paragraph 1 - Website Theme */}
              <p className="text-sm sm:text-[15px] lg:text-base font-medium text-slate-800 font-sans leading-relaxed mb-2 sm:mb-2.5 max-w-xl">
                At <strong className="font-bold text-[#002B49]">kRa Life Sciences</strong>, we believe training should create a measurable difference in how clinical research teams work.
              </p>

              {/* Description Paragraph 2 - Website Theme */}
              <p className="text-sm sm:text-[14.5px] lg:text-[15px] text-slate-600 font-sans leading-relaxed font-normal max-w-xl">
                Our programmes help organisations develop skilled professionals, strengthen regulatory compliance and establish a culture of quality and operational excellence.
              </p>
            </div>

            {/* Right Spacer Column (Allows the Competence, Quality, Performance graphic & vials in performance.png to shine) */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6" />
          </div>
        </div>
      </section>











      {/* ── Section 6: Bottom Callout Banner (Matching Reference Design) ── */}
      <section className="td-section-cta relative pt-6 sm:pt-8 pb-10 sm:pb-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="td-cta-box bg-gradient-to-r from-[#EBF5FA] via-white to-[#EBF5FA] border border-sky-200/90 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Handshake Icon in Circle */}
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-sky-100 text-[#0078B8] flex items-center justify-center shrink-0 shadow-xs">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>

              <div>
                <h3 className="text-base sm:text-xl font-bold font-serif text-slate-900 tracking-tight">
                  Looking to strengthen your clinical research team&apos;s capabilities?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Connect with us to design a Training &amp; Development programme aligned with your organisational needs.
                </p>
              </div>
            </div>

            {/* Action Button - Signature Website Button.tsx Design */}
            <div className="shrink-0 w-full md:w-auto">
              <Button
                id="cta-training-get-in-touch"
                size="compact"
                variant="primary"
                onClick={onOpenContactModal}
              >
                Get in Touch
              </Button>
            </div>

          </div>
        </div>
      </section>


    </div>
  );
}
