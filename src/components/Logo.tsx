interface LogoProps {
  className?: string;
  height?: number;
  theme?: 'dark' | 'light';
  alt?: string;
}

const HEIGHT_CLASSES: Record<number, string> = {
  32: 'h-8',
  36: 'h-9',
  40: 'h-10',
  44: 'h-11',
  48: 'h-12',
  54: 'h-[54px]',
  60: 'h-[60px]',
  64: 'h-16',
  72: 'h-[72px]',
  75: 'h-[75px]',
  80: 'h-20',
  84: 'h-[84px]',
  96: 'h-24',
  112: 'h-28',
  128: 'h-32',
};

export default function Logo({
  className = '',
  height = 75,
  theme = 'dark',
  alt = 'kRa Life Sciences',
}: LogoProps) {
  // SVG Logo from the public 'KRa Logo' directory
  const src = '/KRa%20Logo/KRa%20Logo.svg';
  const hasCustomHeight = /\bh-\S+/.test(className);
  const heightClass = hasCustomHeight ? '' : (HEIGHT_CLASSES[height] || 'h-[75px]');

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      decoding="async"
      className={`w-auto object-contain transition-all duration-300 select-none ${heightClass} ${
        theme === 'light' ? 'brightness-0 contrast-200' : ''
      } ${className}`}
    />
  );
}
