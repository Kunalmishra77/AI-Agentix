export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent:         '#F26522',
        'accent-hover': '#D4541A',
        'accent-light': '#FFF5F0',
        navy:           '#0D1E3A',
        'navy-deep':    '#070D1A',
        'border-ui':    '#E8EDF3',
        'text-muted':   '#6B7280',
        'text-sub':     '#9CA3AF',
        'bg-surface':   '#F8FAFC',
        // Category colors
        'cat-content':  '#7C3AED',
        'cat-sales':    '#F26522',
        'cat-research': '#0EA5E9',
        'cat-business': '#059669',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body:    ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem,7vw,6rem)',   { lineHeight: '1.03', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.8rem,5.5vw,4.5rem)',{ lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem,4vw,3rem)',      { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
        'display-sm': ['clamp(1.4rem,2.5vw,2rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        content: '1240px',
        wide:    '1440px',
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.14)',
        'bento-lg': '0 2px 8px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.1)',
      },
      keyframes: {
        marquee:    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'fade-up':  { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'pulse-dot':{ '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        'count-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'gradient-shift': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        marquee:         'marquee 35s linear infinite',
        'marquee-slow':  'marquee 55s linear infinite',
        'fade-up':       'fade-up 0.6s ease forwards',
        'pulse-dot':     'pulse-dot 1.8s ease-in-out infinite',
        'gradient-shift':'gradient-shift 6s ease infinite',
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
};
