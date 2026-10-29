import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from './Button';
import SectionTag from './SectionTag';

export default function OperationalExcellence() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ctx = gsap.context(() => {
              const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
              });

              // 1. Smooth Fade-in for Visual Montage
              if (imageWrapperRef.current) {
                tl.fromTo(
                  imageWrapperRef.current,
                  {
                    opacity: 0,
                    filter: 'blur(10px)',
                  },
                  {
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.6,
                    ease: 'power2.out',
                    clearProps: 'all',
                  },
                  0
                );
              }

              // 2. Kicker Badge entrance
              if (badgeRef.current) {
                tl.fromTo(
                  badgeRef.current,
                  { opacity: 0, y: 16, filter: 'blur(6px)' },
                  { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', clearProps: 'all' },
                  0.1
                );
              }

              // 3. Heading: Luxury masked word-by-word rise
              const words = titleRef.current?.querySelectorAll('.title-word');
              if (words && words.length > 0) {
                tl.fromTo(
                  words,
                  {
                    y: '125%',
                    rotateZ: 3,
                    opacity: 0,
                    filter: 'blur(8px)',
                  },
                  {
                    y: '0%',
                    rotateZ: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.5,
                    stagger: 0.15,
                    ease: 'power4.out',
                    clearProps: 'all',
                  },
                  0.2
                );
              }

              // 4. Paragraphs entrance
              if (p1Ref.current) {
                tl.fromTo(
                  p1Ref.current,
                  { y: 24, opacity: 0, filter: 'blur(8px)' },
                  { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out', clearProps: 'all' },
                  0.4
                );
              }

              if (p2Ref.current) {
                tl.fromTo(
                  p2Ref.current,
                  { y: 22, opacity: 0, filter: 'blur(8px)' },
                  { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out', clearProps: 'all' },
                  0.55
                );
              }

              // 5. Signature CTA Button entrance
              if (buttonRef.current) {
                tl.fromTo(
                  buttonRef.current,
                  { y: 24, opacity: 0, scale: 0.92, filter: 'blur(8px)' },
                  { y: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power4.out', clearProps: 'all' },
                  0.7
                );
              }
            }, sectionRef);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="operational-excellence"
      className="relative w-full overflow-hidden min-h-[460px] lg:min-h-[500px] flex items-center bg-white border-t border-slate-100"
    >
      {/* ── Full-Bleed Background Image on Desktop (operationback.png) ── */}
      <div
        ref={imageWrapperRef}
        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      >
        <img
          src="/operationback.png"
          alt="Operational Excellence Clinical Research Laboratory"
          className="w-full h-full object-cover object-right"
        />
        {/* Soft edge blend so background transitions seamlessly to clean white on the left */}
        <div className="absolute inset-y-0 left-0 w-48 sm:w-72 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
      </div>

      {/* ── Main Section Content Container ── */}
      <div className="relative z-10 max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-9 sm:pt-10 lg:pt-12 pb-10 sm:pb-11 lg:pb-13">
        {/* Left Column Text & Action */}
        <div className="max-w-2xl lg:max-w-[62%] xl:max-w-[59%] pl-2 sm:pl-4 lg:pl-5 xl:pl-3">
          {/* Eyebrow Clinical Badge */}
          <div ref={badgeRef} className="mb-2.5 sm:mb-3">
            <SectionTag
              text="Clinical Operations & Strategic Delivery"
              variant="green"
            />
          </div>

          {/* Heading: "Operational Excellence" with Medical Green */}
          <h2
            ref={titleRef}
            className="font-serif text-3xl sm:text-4xl lg:text-[38px] xl:text-[40px] font-bold tracking-tight leading-[1.12] mb-3 sm:mb-3.5 flex flex-wrap items-baseline gap-x-3.5 overflow-hidden py-0.5"
          >
            <span className="inline-block overflow-hidden">
              <span className="title-word inline-block text-[#0a192f] will-change-transform">
                Operational
              </span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="bg-gradient-to-r from-[#0078B8] via-[#009BE5] to-[#00A8CC] bg-clip-text text-transparent">
                Excellence
              </span>
            </span>
          </h2>

          {/* Core Descriptive Text */}
          <div className="space-y-2.5 sm:space-y-3 text-slate-600 text-[13px] sm:text-[15px] lg:text-[15.5px] leading-[1.62] sm:leading-[1.68] tracking-tight text-justify mb-3.5 sm:mb-4 font-sans">
            <p ref={p1Ref}>
              From clinical development planning to study execution,{' '}
              <strong className="font-semibold text-slate-900">
                kRa Life Sciences
              </strong>{' '}
              helps pharmaceutical, biotechnology and clinical research
              organisations bring clarity, coordination and accountability to
              complex clinical trials.
            </p>
            <p ref={p2Ref}>
              We integrate clinical expertise, operational planning,
              cross-functional collaboration and execution oversight to help
              teams manage risks, meet study milestones and deliver quality
              outcomes keeping patient needs at the centre of clinical
              development.
            </p>
          </div>

          {/* Signature CTA Button */}
          <div ref={buttonRef} className="pt-3 sm:pt-3.5">
            <Button
              href="#contact"
              id="cta-operational-excellence"
              size="compact"
              variant="primary"
            >
              Discuss Your Clinical Development Needs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
