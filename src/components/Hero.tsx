import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from './Button';

export default function Hero() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subheadingsRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Modern Cinematic Blur-to-Focus Slow Entrance
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        delay: 0.15,
      });

      // 1. Slow atmospheric fade of dark gradient overlay
      if (overlayRef.current) {
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.8,
            ease: 'power2.out',
            clearProps: 'opacity',
          },
          0
        );
      }

      // 2. Main Title: slow glide into sharp focus
      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          {
            y: 45,
            opacity: 0,
            filter: 'blur(12px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power4.out',
            clearProps: 'all',
          },
          0.1
        );
      }

      // 3. Subheading lines: gentle drift into focus
      if (subheadingsRef.current) {
        tl.fromTo(
          subheadingsRef.current,
          {
            y: 35,
            opacity: 0,
            filter: 'blur(8px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'power4.out',
            clearProps: 'all',
          },
          '-=1.1'
        );
      }

      // 4. Capabilities divider strip
      if (capabilitiesRef.current) {
        tl.fromTo(
          capabilitiesRef.current,
          {
            y: 25,
            opacity: 0,
            filter: 'blur(6px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.3,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.95'
        );
      }

      // 5. CTA Buttons container: gentle lift into view
      if (buttonsRef.current) {
        tl.fromTo(
          buttonsRef.current,
          {
            y: 24,
            opacity: 0,
            filter: 'blur(6px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.25,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.85'
        );
      }
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="home"
      className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center overflow-hidden text-white pt-28 pb-18 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* ── Background Video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-[center_right] pointer-events-none"
      >
        <source src="/herovideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* ── Left-to-Right Dark Navy Gradient Overlay ── */}
      {/* Keeps text contrast crystal clear on the left, while revealing the dynamic video with the holographic map and scientist on the right */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(90deg, rgba(2, 7, 20, 0.96) 0%, rgba(2, 7, 20, 0.88) 36%, rgba(2, 7, 20, 0.52) 58%, rgba(2, 7, 20, 0.15) 78%, transparent 100%)',
        }}
      />



      {/* ── Main Hero Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -translate-y-3 sm:-translate-y-4 lg:-translate-y-5">
        <div className="max-w-2xl lg:max-w-3xl pl-4 sm:pl-8 lg:pl-4">
          {/* Main Brand Title */}
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl lg:text-[52px] font-semibold text-white tracking-tight leading-[1.12] mb-3.5"
          >
            kRa Life Sciences
          </h1>

          {/* Subheading lines */}
          <div ref={subheadingsRef} className="mb-5 space-y-0.5">
            <p className="text-xl sm:text-2xl lg:text-[27px] font-light text-slate-100 tracking-tight leading-snug">
             Clinical Trials That Move Forward.
            </p>
            <p className="text-xl sm:text-2xl lg:text-[27px] font-medium text-white tracking-tight leading-snug">
             Walking With You to Project Completion
            </p>
          </div>

          {/* Capabilities strip with divider bars - single line on desktop */}
          <div
            ref={capabilitiesRef}
            className="flex flex-wrap lg:flex-nowrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-xs sm:text-sm lg:text-[14.5px] text-slate-300 font-normal mb-8"
          >
            <span className="hover:text-white transition-colors whitespace-nowrap">Clinical Trial Consulting</span>
            <span className="text-sky-400 font-light select-none">|</span>
            <span className="hover:text-white transition-colors whitespace-nowrap">Clinical Development</span>
            <span className="text-sky-400 font-light select-none">|</span>
            <span className="hover:text-white transition-colors whitespace-nowrap">Global Trial Management</span>
            <span className="text-sky-400 font-light select-none">|</span>
            <span className="hover:text-white transition-colors whitespace-nowrap">Operational Excellence</span>
          </div>

          {/* Call-to-Action Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-3 sm:gap-3.5">
            {/* Primary CTA: Get in Touch */}
            <Button
              href="#contact"
              id="hero-cta-get-in-touch"
              size="compact"
              variant="primary"
            >
              Get in Touch
            </Button>

            {/* Secondary CTA: Our Services */}
            <Button
              href="#services"
              id="hero-cta-our-services"
              size="compact"
              variant="secondary"
            >
              Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
