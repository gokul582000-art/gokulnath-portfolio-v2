'use client';

interface ScrollFadeProps {
  position?: 'top' | 'bottom';
  height?: string;
  color?: string;
  className?: string;
}

/**
 * Reliable scroll-hint overlay using a CSS gradient from transparent → bg color.
 * Works on any background, with Lenis, and with overflow:hidden parents.
 */
export default function ScrollFade({
  position = 'bottom',
  height = '10rem',
  color = '#080808',
  className = '',
}: ScrollFadeProps) {
  const gradient =
    position === 'bottom'
      ? `linear-gradient(to bottom, transparent 0%, ${color} 100%)`
      : `linear-gradient(to top, transparent 0%, ${color} 100%)`;

  return (
    <div
      aria-hidden="true"
      className={`absolute left-0 right-0 pointer-events-none z-10 ${className}`}
      style={{
        [position]: 0,
        height,
        background: gradient,
      }}
    />
  );
}
