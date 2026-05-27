import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

// Renders the AGENTiX wordmark inline (no PNG dependency).
// Colors: A = orange, GENT = white, i = orange, X = white.
// variant='white' → forces all parts to #fff (for use on non-dark bg).
export default function BrandLogo({
  height    = 38,
  variant   = 'original',
  style     = {},
  className = '',
  as        = 'link',
}) {
  const isWhite = variant === 'white';
  const orange  = isWhite ? '#ffffff' : '#E8631A';
  const white   = '#ffffff';

  // Proportions match the original PNG (brain ~48%, gap ~6%, text ~40%)
  const brainSize = Math.max(10, Math.round(height * 0.48));
  const fontSize  = Math.max(8,  Math.round(height * 0.38));
  const gap       = Math.max(2,  Math.round(height * 0.06));

  const logo = (
    <div
      className={className}
      style={{
        display:        'inline-flex',
        flexDirection:  'column',
        alignItems:     'center',
        gap,
        flexShrink:     0,
        lineHeight:     1,
        userSelect:     'none',
        filter:         isWhite ? 'none' : 'drop-shadow(0 0 6px rgba(232,99,26,0.3))',
        transition:     'filter 0.3s ease',
        ...style,
      }}
    >
      {/* Brain icon */}
      <Brain size={brainSize} color={orange} strokeWidth={2.2} />

      {/* Wordmark */}
      <div style={{
        display:     'flex',
        alignItems:  'baseline',
        fontFamily:  "'Poppins', sans-serif",
        fontWeight:  800,
        fontSize,
        letterSpacing: '-0.01em',
        whiteSpace:  'nowrap',
      }}>
        <span style={{ color: orange }}>A</span>
        <span style={{ color: white }}>GENT</span>
        <span style={{ color: orange }}>i</span>
        <span style={{ color: white }}>X</span>
      </div>
    </div>
  );

  if (as === 'div') return logo;

  return (
    <Link
      to="/"
      aria-label="AGENTiX Home"
      style={{ display: 'inline-flex', textDecoration: 'none', flexShrink: 0 }}
    >
      {logo}
    </Link>
  );
}
