import type { ReactNode } from 'react';
import { Atom } from 'lucide-react';

interface SectionTagProps {
  text?: string;
  children?: ReactNode;
  variant?: 'green' | 'red' | 'blue' | 'white';
  isDark?: boolean;
  className?: string;
  lineWidth?: string;
}

export default function SectionTag({
  text,
  children,
  variant = 'green',
  isDark = false,
  className = '',
}: SectionTagProps) {
  const content = text || children;

  const lightStyles = {
    green: {
      pill: 'bg-transparent border-emerald-300 text-emerald-800',
      icon: 'text-emerald-600',
    },
    red: {
      pill: 'bg-transparent border-rose-300 text-rose-800',
      icon: 'text-[#CF3838]',
    },
    blue: {
      pill: 'bg-transparent border-sky-300 text-sky-800',
      icon: 'text-[#0078B8]',
    },
    white: {
      pill: 'bg-transparent border-white/30 text-white',
      icon: 'text-emerald-500',
    },
  }[variant];

  const darkStyles = {
    green: {
      pill: 'bg-transparent border-emerald-500/50 text-emerald-300',
      icon: 'text-emerald-400',
    },
    red: {
      pill: 'bg-transparent border-rose-500/50 text-rose-300',
      icon: 'text-[#CF3838]',
    },
    blue: {
      pill: 'bg-transparent border-sky-500/50 text-sky-300',
      icon: 'text-[#00C4FF]',
    },
    white: {
      pill: 'bg-transparent border-white/30 text-white',
      icon: 'text-emerald-400',
    },
  }[variant];

  const currentStyles = isDark ? darkStyles : lightStyles;

  return (
    <div
      className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 rounded-full border text-[11px] sm:text-xs font-semibold tracking-wide uppercase transition-colors ${currentStyles.pill} ${className}`}
    >
      <Atom
        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${currentStyles.icon}`}
        strokeWidth={2.2}
        aria-hidden="true"
      />
      <span>{content}</span>
    </div>
  );
}

export { SectionTag };
