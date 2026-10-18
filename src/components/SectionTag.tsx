import React from 'react';

interface SectionTagProps {
  text?: string;
  children?: React.ReactNode;
  variant?: 'red' | 'blue' | 'white';
  className?: string;
  lineWidth?: string;
}

export default function SectionTag({
  text,
  children,
  variant = 'red',
  className = '',
  lineWidth = 'w-6 sm:w-7',
}: SectionTagProps) {
  const content = text || children;

  const colorStyles = {
    red: {
      text: 'text-[#CF3838]',
      line: 'bg-[#CF3838]',
    },
    blue: {
      text: 'text-[#0078B8]',
      line: 'bg-[#0078B8]',
    },
    white: {
      text: 'text-white',
      line: 'bg-white',
    },
  }[variant];

  return (
    <div
      className={`inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider font-sans ${colorStyles.text} ${className}`}
    >
      <span className={`${lineWidth} h-[2px] rounded-full ${colorStyles.line} shrink-0`} />
      <span>{content}</span>
    </div>
  );
}

export { SectionTag };
