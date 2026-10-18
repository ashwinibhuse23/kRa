import { useState, useEffect, useCallback } from 'react';

interface ScrollToTopProps {
  /** Scroll distance threshold in px before the button appears */
  threshold?: number;
  /** Primary accent color (defaults to brand accent --color-accent: #CF3838) */
  color?: string;
  className?: string;
}

export default function ScrollToTop({
  threshold = 120,
  color = 'var(--color-accent, #CF3838)',
  className = '',
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Circle dimensions for SVG progress ring
  const radius = 20;
  const circumference = 2 * Math.PI * radius; // ~125.66
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Show/hide based on threshold
    setIsVisible(scrollTop > threshold);

    // Calculate percentage scrolled
    if (docHeight > 0) {
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    } else {
      setScrollProgress(0);
    }
  }, [threshold]);

  useEffect(() => {
    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll directly to top of page"
      title="Back to top"
      className={`group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 ease-out focus:outline-none focus:ring-0 focus-visible:outline-none select-none ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
      } hover:scale-110 active:scale-95 ${className}`}
      style={{
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* SVG Circular Progress & Upward Arrow */}
      <svg
        className="w-full h-full transform transition-transform duration-200"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        {/* White circle background to ensure clean contrast over any page background */}
        <circle cx="24" cy="24" r={radius} fill="#FFFFFF" />

        {/* Outer thin ring track */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          opacity="0.9"
        />

        {/* Scroll progress arc (fills clockwise from 12 o'clock, with flat butt cap matching reference) */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          transform="rotate(-90 24 24)"
          className="transition-[stroke-dashoffset] duration-150 ease-out"
        />

        {/* Upward Arrow */}
        <g
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
        >
          {/* Vertical stem */}
          <path d="M24 31V17" />
          {/* Arrowhead chevron */}
          <path d="M18 23L24 17L30 23" />
        </g>
      </svg>
    </button>
  );
}
