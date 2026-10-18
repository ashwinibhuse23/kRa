import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from './Button';

export default function OperationalExcellence() {
  const sectionRef = useRef<HTMLElement>(null);
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

              // 1. New 3D Perspective Depth & Parallax Glide for Laboratory Visual Montage
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
                      // Ambient slow floating breathing wave
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

              // 2. Heading: Luxury masked word-by-word rise from baseline
              const words = titleRef.current?.querySelectorAll('.title-word');
              if (words && words.length > 0) {
                tl.fromTo(
                  words,
                  {
                    y: '125%',
                    rotateZ: 4,
                    opacity: 0,
                    filter: 'blur(8px)',
                  },
                  {
                    y: '0%',
                    rotateZ: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.6,
                    stagger: 0.16,
                    ease: 'power4.out',
                    clearProps: 'all',
                  },
                  0.15
                );
              }

              // 3. Paragraph 1: slow cinematic glide into crystal clarity
              if (p1Ref.current) {
                tl.fromTo(
                  p1Ref.current,
                  {
                    y: 34,
                    opacity: 0,
                    filter: 'blur(10px)',
                  },
                  {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.7,
                    ease: 'power3.out',
                    clearProps: 'all',
                  },
                  0.4
                );
              }

              // 4. Paragraph 2: staggered arrival with depth fade
              if (p2Ref.current) {
                tl.fromTo(
                  p2Ref.current,
                  {
                    y: 28,
                    opacity: 0,
                    filter: 'blur(8px)',
                  },
                  {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 1.7,
                    ease: 'power3.out',
                    clearProps: 'all',
                  },
                  0.6
                );
              }

              // 5. Signature CTA Button: smooth luxury scale & floating entrance
              if (buttonRef.current) {
                tl.fromTo(
                  buttonRef.current,
                  {
                    y: 26,
                    opacity: 0,
                    scale: 0.92,
                    filter: 'blur(10px)',
                  },
                  {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    duration: 1.6,
                    ease: 'power4.out',
                    clearProps: 'all',
                  },
                  0.8
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
      className="relative w-full overflow-hidden min-h-[500px] lg:min-h-[550px] flex items-center bg-[#F4F9FD] border-t border-slate-100"
    >
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
        <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#F4F9FD] to-transparent pointer-events-none" />
        {/* Mobile readability gradient fade so text is 100% crystal clear on small screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F9FD] via-[#F4F9FD]/95 to-transparent md:hidden pointer-events-none" />
      </div>

      {/* ── Main Section Content Container (Full width, refined generous vertical spacing) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-14 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24">
        {/* Left Column Text & Action - with elegant left padding and proper spacing */}
        <div className="max-w-xl lg:max-w-[54%] xl:max-w-[52%] pl-3 sm:pl-6 lg:pl-8 xl:pl-5">
          {/* Heading: "Operational Excellence" with masked word-by-word reveal */}
          <h2
            ref={titleRef}
            className="font-serif text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-tight leading-[1.12] mb-4 sm:mb-5 flex flex-wrap gap-x-3.5 overflow-hidden py-1"
          >
            <span className="inline-block overflow-hidden">
              <span className="title-word inline-block text-[#0a192f] will-change-transform">
                Operational
              </span>
            </span>
            <span className="inline-block overflow-hidden">
              <span className="title-word inline-block text-[#0078B8] will-change-transform">
                Excellence
              </span>
            </span>
          </h2>

          {/* Core Descriptive Text */}
          <div className="space-y-3.5 text-slate-600 text-sm sm:text-[15px] lg:text-[15.5px] leading-[1.65] mb-4 sm:mb-5 font-sans">
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
          <div ref={buttonRef} className="pt-0.5 pb-2 sm:pb-3">
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
