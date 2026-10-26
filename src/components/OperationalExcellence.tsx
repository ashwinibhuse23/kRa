import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from './Button';

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

              // 1. Perspective Depth & Parallax Glide for Visual Montage
              if (imageWrapperRef.current) {
                tl.fromTo(
                  imageWrapperRef.current,
                  {
                    opacity: 0,
                    x: 65,
                    rotateY: -7,
                    transformPerspective: 1100,
                    scale: 0.93,
                    filter: 'blur(16px)',
                  },
                  {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 2.2,
                    ease: 'power3.out',
                    clearProps: 'all',
                    onComplete: () => {
                      if (imageWrapperRef.current) {
                        gsap.to(imageWrapperRef.current, {
                          y: -6,
                          duration: 4.8,
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
      className="relative w-full overflow-hidden min-h-[520px] lg:min-h-[580px] flex items-center bg-[#F8FAF9] border-t border-emerald-900/10"
    >
      {/* ── Soft Ambient Medical Glow ── */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* ── Full-Bleed Background Image (operationback.png) ── */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden will-change-transform"
      >
        <img
          src="/operationback.png"
          alt="Operational Excellence Clinical Research Laboratory"
          className="w-full h-full object-cover object-right md:object-right lg:object-right scale-[0.92] lg:scale-[0.90] origin-right -translate-x-2 sm:-translate-x-3 lg:-translate-x-4 xl:-translate-x-11 translate-y-0 sm:-translate-y-1 lg:-translate-y-2"
        />
        {/* Soft edge blend so background transitions seamlessly */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F8FAF9] to-transparent pointer-events-none" />
        {/* Mobile readability gradient fade so text is 100% crystal clear on small screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAF9] via-[#F8FAF9]/95 to-transparent md:hidden pointer-events-none" />
      </div>

      {/* ── Main Section Content Container ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-10 sm:pt-12 lg:pt-14 pb-12 sm:pb-14 lg:pb-16">
        {/* Left Column Text & Action */}
        <div className="max-w-xl lg:max-w-[56%] xl:max-w-[53%] pl-2 sm:pl-5 lg:pl-6 xl:pl-4">
          {/* Eyebrow Clinical Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-800 text-[11px] sm:text-xs font-semibold tracking-wide uppercase mb-3 shadow-2xs backdrop-blur-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span>Clinical Operations & Strategic Delivery</span>
          </div>

          {/* Heading: "Operational Excellence" with Medical Green */}
          <h2
            ref={titleRef}
            className="font-serif text-3xl sm:text-4xl lg:text-[45px] xl:text-[48px] font-bold tracking-tight leading-[1.12] mb-3.5 sm:mb-4 flex flex-wrap items-baseline gap-x-3.5 overflow-hidden py-1"
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
          <div className="space-y-2.5 text-slate-600 text-sm sm:text-[14.5px] lg:text-[15px] leading-[1.62] mb-4.5 font-sans">
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
          <div ref={buttonRef} className="pt-2 sm:pt-3">
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
