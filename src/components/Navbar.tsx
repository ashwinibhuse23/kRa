import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import Logo from './Logo';

const NAV_ITEMS = [
  {name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Why kRa', href: '#why-kra' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Experience', href: '#experience' },
  { name: 'Leadership', href: '#leadership' },
 
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash;
      if (NAV_ITEMS.some((item) => item.href === hash)) {
        return hash;
      }
    }
    return '#home';
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightOffset, setRightOffset] = useState(0);

  const isManuallyExpanded = useRef(false);
  const expandScrollY = useRef(0);
  const isCollapsedRef = useRef(false);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const pillNavWrapperRef = useRef<HTMLDivElement>(null);

  // Calculate top-right offset using clientWidth (excludes Windows scrollbar to prevent edge clipping)
  const updateRightOffset = useCallback(() => {
    const clientWidth = document.documentElement.clientWidth || window.innerWidth;
    const padding = clientWidth >= 1536 ? 56 : 36;
    const collapsedWidth = 48;
    const offset = clientWidth / 2 - collapsedWidth / 2 - padding;
    setRightOffset(Math.max(0, offset));
  }, []);

  useEffect(() => {
    updateRightOffset();
    window.addEventListener('resize', updateRightOffset, { passive: true });
    return () => window.removeEventListener('resize', updateRightOffset);
  }, [updateRightOffset]);

  // Scroll listener for collapse / expand behavior & active section tracking (ScrollSpy)
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;

      // Active section detection (ScrollSpy)
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveItem('#contact');
      } else {
        let current = '#home';
        for (const item of NAV_ITEMS) {
          const el = document.querySelector(item.href);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              current = item.href;
            }
          }
        }
        setActiveItem(current);
      }

      // Logo visibility (visible at top of page)
      const shouldShowLogo = scrollY <= 60;
      setShowLogo(shouldShowLogo);

      // Pill collapse behavior
      if (scrollY > 140) {
        if (!isCollapsedRef.current) {
          if (!isManuallyExpanded.current) {
            isCollapsedRef.current = true;
            setIsCollapsed(true);
          } else if (Math.abs(scrollY - expandScrollY.current) > 40) {
            isManuallyExpanded.current = false;
            isCollapsedRef.current = true;
            setIsCollapsed(true);
          }
        }
      } else if (scrollY <= 30) {
        isManuallyExpanded.current = false;
        if (isCollapsedRef.current) {
          isCollapsedRef.current = false;
          setIsCollapsed(false);
        }
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavPillClick = (e: React.MouseEvent) => {
    if (isCollapsed) {
      e.preventDefault();
      e.stopPropagation();
      isManuallyExpanded.current = true;
      expandScrollY.current = window.scrollY;
      isCollapsedRef.current = false;
      setIsCollapsed(false);
    }
  };

  // GSAP Entrance Animation on initial mount (Modern Slow Cinematic Blur-to-Focus)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Logo entrance: slow glide down with soft blur clearing
      if (logoWrapperRef.current) {
        gsap.fromTo(
          logoWrapperRef.current,
          {
            y: -32,
            opacity: 0,
            filter: 'blur(8px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.35,
            ease: 'power4.out',
            delay: 0.1,
            clearProps: 'all',
          }
        );
      }

      // 2. Pill Navigation entrance: slow floating glide down with blur unmasking
      if (pillNavWrapperRef.current) {
        gsap.fromTo(
          pillNavWrapperRef.current,
          {
            y: -40,
            opacity: 0,
            filter: 'blur(10px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.45,
            ease: 'power4.out',
            delay: 0.18,
            clearProps: 'all',
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Fixed Floating Logo at Top Left ── */}
      <div className="fixed top-3 sm:top-4 left-0 right-0 z-50 pointer-events-none flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div
            ref={logoWrapperRef}
            className={`pointer-events-auto transition-all duration-300 ${
              showLogo
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <a
              href="#home"
              id="nav-logo"
              className="flex items-center group transition-transform duration-300 hover:scale-[1.03]"
              title="kRa Life Sciences"
            >
              <Logo
                height={84}
                theme="dark"
                className="drop-shadow-[0_0_16px_rgba(0,120,184,0.35)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
            </a>
          </div>
        </div>
      </div>

      {/* ── Desktop: Centered Floating Pill Navigation ── */}
      <div
        ref={pillNavWrapperRef}
        className="hidden lg:block fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
      >
        <nav
          id="desktop-pill-nav"
          onClick={handleNavPillClick}
          style={{
            transform: isCollapsed ? `translateX(${rightOffset}px)` : 'translateX(0)',
          }}
          className={`relative flex items-center rounded-full border transition-all duration-300 ease-out backdrop-blur-xl select-none ${
            isCollapsed
              ? 'w-12 h-12 cursor-pointer justify-center px-0 border-[#0078B8]/80 bg-[#030E1F]/95 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_18px_rgba(0,120,184,0.35)] hover:border-[#00C4FF] hover:shadow-[0_0_24px_rgba(0,196,255,0.45)]'
              : 'px-2 py-1.5 h-12 border-[#0078B8]/50 bg-[#030E1F]/75 shadow-[0_8px_32px_rgba(0,0,0,0.45),0_0_24px_rgba(0,120,184,0.2)]'
          }`}
        >
          {/* Expanded Menu Items */}
          <div
            className={`flex items-center gap-1 transition-all duration-300 ${
              isCollapsed ? 'opacity-0 scale-90 pointer-events-none hidden' : 'opacity-100 scale-100'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  id={`pill-nav-${item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                  onClick={() => setActiveItem(item.href)}
                  className={`relative text-[13.5px] font-medium transition-all duration-200 px-3 py-1.5 rounded-full flex items-center justify-center whitespace-nowrap ${
                    isActive
                      ? 'text-[#00C4FF] font-semibold bg-[#0078B8]/30 border border-[#00C4FF]/50 shadow-[0_0_16px_rgba(0,196,255,0.3)]'
                      : 'text-white/80 hover:text-[#00C4FF] hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Collapsed Pill Menu Icon (Steady, cursor pointer, no lag or clipping) */}
          {isCollapsed && (
            <div className="flex items-center justify-center text-[#00C4FF] pointer-events-none cursor-pointer">
              <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
          )}
        </nav>
      </div>

      {/* ── Mobile: Floating Pill Trigger & Mobile Menu ── */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          id="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="w-11 h-11 rounded-full flex items-center justify-center border border-[#0078B8]/60 bg-[#030E1F]/90 backdrop-blur-xl text-white shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_16px_rgba(0,120,184,0.3)]"
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

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-14 right-0 w-64 rounded-2xl border border-[#0078B8]/40 bg-[#030E1F]/95 backdrop-blur-2xl p-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.8),0_0_24px_rgba(0,120,184,0.25)] flex flex-col gap-1 animate-fade-in">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActiveItem(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0078B8]/30 text-[#00C4FF] border border-[#00C4FF]/40'
                      : 'text-slate-200 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#00C4FF] shadow-[0_0_8px_#00C4FF]" />}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
