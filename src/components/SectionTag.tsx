import type { ReactNode } from 'react';

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
      dot: 'bg-emerald-600',
      ping: 'bg-emerald-400',
    },
    red: {
      pill: 'bg-transparent border-rose-300 text-rose-800',
      dot: 'bg-[#CF3838]',
      ping: 'bg-rose-400',
    },
    blue: {
      pill: 'bg-transparent border-sky-300 text-sky-800',
      dot: 'bg-[#0078B8]',
      ping: 'bg-sky-400',
    },
    white: {
      pill: 'bg-transparent border-white/30 text-white',
      dot: 'bg-emerald-400',
      ping: 'bg-emerald-300',
    },
  }[variant];

  const darkStyles = {
    green: {
      pill: 'bg-transparent border-emerald-500/50 text-emerald-300',
      dot: 'bg-emerald-400',
      ping: 'bg-emerald-400',
    },
    red: {
      pill: 'bg-transparent border-rose-500/50 text-rose-300',
      dot: 'bg-[#CF3838]',
      ping: 'bg-rose-400',
    },
    blue: {
      pill: 'bg-transparent border-sky-500/50 text-sky-300',
      dot: 'bg-[#00C4FF]',
      ping: 'bg-sky-400',
    },
    white: {
      pill: 'bg-transparent border-white/30 text-white',
      dot: 'bg-emerald-400',
      ping: 'bg-emerald-300',
    },
  }[variant];

  const currentStyles = isDark ? darkStyles : lightStyles;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full border text-[11px] sm:text-xs font-semibold tracking-wide uppercase transition-colors ${currentStyles.pill} ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentStyles.ping}`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${currentStyles.dot}`}
        />
      </span>
      <span>{content}</span>
    </div>
  );
}

export { SectionTag };
