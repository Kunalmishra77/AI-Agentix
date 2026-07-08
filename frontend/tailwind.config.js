/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand
        accent:         '#F26522',   // primary orange
        'accent-hover': '#D4541A',
        'accent-soft':  '#FFF3EC',   // orange tint surface
        'accent-ring':  '#FCE0D0',
        // Ink / dark (ADDEPTO-style near-black for dark sections + footer)
        ink:            '#12141A',
        'ink-800':      '#1A1D25',
        'ink-700':      '#242833',
        'ink-muted':    '#9AA3B2',   // muted text on dark
        // Text (light theme)
        heading:        '#12141A',   // black headings
        body:           '#4A5261',   // dark gray body
        'body-soft':    '#6B7280',
        // Surfaces
        surface:        '#FFFFFF',
        'surface-alt':  '#F6F6F6',   // ADDEPTO light-gray alt sections
        'surface-2':    '#F1F3F6',
        line:           '#E7EAF0',   // hairline borders
        'line-dark':    '#252A35',   // borders on dark
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        body:    ['Poppins', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero':    ['clamp(2.6rem, 6vw, 5rem)',  { lineHeight: '1.06', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.1',  letterSpacing: '-0.015em', fontWeight: '700' }],
        'h2':      ['clamp(1.75rem, 3vw, 2.5rem)',{ lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'eyebrow': ['0.8125rem', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '600' }],
      },
      maxWidth: {
        container: '1280px',
      },
      spacing: {
        section: '90px',
      },
      borderRadius: {
        card: '16px',
        pill: '999px',
      },
      boxShadow: {
        card:       '0 1px 2px rgba(18,20,26,0.04), 0 8px 30px rgba(18,20,26,0.06)',
        'card-hover':'0 12px 44px rgba(18,20,26,0.12)',
        float:      '0 20px 60px rgba(18,20,26,0.16)',
        orange:     '0 10px 30px rgba(242,101,34,0.28)',
      },
      keyframes: {
        marquee:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'pulse-dot': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
      animation: {
        'marquee-slow': 'marquee 40s linear infinite',
        'marquee-fast': 'marquee 28s linear infinite',
        'fade-up':      'fade-up 0.6s ease forwards',
        'pulse-dot':    'pulse-dot 1.6s ease-in-out infinite',
        blink:          'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
};
