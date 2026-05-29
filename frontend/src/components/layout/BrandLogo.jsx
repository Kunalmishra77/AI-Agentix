import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

// Renders the AGENTiX wordmark inline (no PNG dependency).
// variant='original'    → brain=orange, A=orange, GENT=white, i=orange, X=white  (default, dark bg)
// variant='alt'         → brain=orange, A=orange, GENT=white, i=white,  X=white
// variant='white'       → all parts white (for dark backgrounds, no orange)
// variant='white-brain' → brain=white,  A=orange, GENT=white, i=orange, X=white  (dark bg, white brain)
export default function BrandLogo({
  height    = 38,
  variant   = 'original',
  style     = {},
  className = '',
  as        = 'link',
}) {
  const isWhite      = variant === 'white';
  const isWhiteBrain = variant === 'white-brain';
  const orange       = isWhite ? '#ffffff' : '#E8631A';
  const white        = '#ffffff';
  const iColor       = (variant === 'alt' || isWhite) ? '#ffffff' : '#E8631A';
  const brainColor   = (isWhite || isWhiteBrain) ? '#ffffff' : '#E8631A';

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
        filter:         (isWhite || isWhiteBrain) ? 'none' : 'drop-shadow(0 0 6px rgba(232,99,26,0.3))',
        transition:     'filter 0.3s ease',
        ...style,
      }}
    >
      {/* Brain icon */}
      <Brain size={brainSize} color={brainColor} strokeWidth={2.2} />

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
        <span style={{ color: iColor }}>i</span>
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
