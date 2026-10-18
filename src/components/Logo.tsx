interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
  height?: number;
  theme?: 'dark' | 'light';
}

export default function Logo({
  className = '',
  style = {},
  height = 75,
  theme = 'dark',
}: LogoProps) {
  const src = theme === 'dark' ? '/logo-transparent-dark.png' : '/logo-transparent-light.png';

  return (
    <img
      src={src}
      alt="kRa Life Sciences"
      className={`w-auto object-contain transition-all duration-300 ${className}`}
      style={{ height: `${height}px`, ...style }}
    />
  );
}
