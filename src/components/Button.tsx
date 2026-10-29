import type { ReactNode, MouseEvent } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'red';
export type ButtonSize = 'sm' | 'compact' | 'md' | 'lg';

export interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  hasArrow?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
  title?: string;
  target?: string;
  rel?: string;
}

export default function Button({
  children,
  icon,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  hasArrow = true,
  disabled = false,
  fullWidth = false,
  className = '',
  id,
  title,
  target,
  rel,
}: ButtonProps) {
  // Size specific styles
  const sizeStyles = {
    sm: 'pl-4 pr-1.5 py-1.5 text-xs sm:text-sm gap-2.5',
    compact: 'pl-5 sm:pl-5.5 pr-2 sm:pr-2 py-2 sm:py-2 text-[13px] sm:text-[14px] gap-2.5 sm:gap-3',
    md: 'pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2.5 sm:py-3 text-sm sm:text-base gap-3 sm:gap-3.5',
    lg: 'pl-7 sm:pl-8 pr-2.5 sm:pr-3 py-3 sm:py-3.5 text-base sm:text-lg gap-3.5 sm:gap-4',
  }[size];

  const arrowCircleSizes = {
    sm: 'w-6 h-6',
    compact: 'w-7 h-7 sm:w-7.5 sm:h-7.5',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
  }[size];

  const arrowIconSizes = {
    sm: 'w-3 h-3',
    compact: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5',
  }[size];

  // Variant specific styling
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#002e52] via-[#004a7a] to-[#0070a7] text-white shadow-[0_6px_22px_rgba(0,120,184,0.35)] hover:shadow-[0_10px_28px_rgba(0,120,184,0.55)]',
    secondary:
      'bg-[#051226]/80 backdrop-blur-md border border-white/25 text-white hover:bg-white/10 hover:border-white/40 shadow-[0_4px_18px_rgba(2,7,20,0.4)] hover:shadow-[0_8px_24px_rgba(0,120,184,0.3)]',
    red:
      'bg-gradient-to-r from-[#7a1818] via-[#a82525] to-[#CF3838] text-white shadow-[0_6px_22px_rgba(207,56,56,0.35)] hover:shadow-[0_10px_28px_rgba(207,56,56,0.55)]',
  }[variant];

  // Arrow badge background based on variant
  const arrowBadgeBg = {
    primary: 'bg-[#00A8CC]',
    secondary: 'bg-white/20',
    red: 'bg-[#00A8CC]',
  }[variant];

  const baseClasses = `group inline-flex items-center justify-between rounded-full font-serif font-medium tracking-normal transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer select-none ${fullWidth ? 'w-full' : 'w-auto'
    } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${variantStyles} ${sizeStyles} ${className}`;

  const content = (
    <>
      <span className="shrink-0">{children}</span>
      {hasArrow && (
        <span
          className={`${arrowCircleSizes} ${arrowBadgeBg} rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105 shadow-xs`}
        >
          {icon ?? (
            <svg
              className={`${arrowIconSizes} text-white transition-colors duration-300`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          )}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        id={id}
        title={title}
        target={target}
        rel={rel}
        onClick={onClick}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      id={id}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </button>
  );
}
