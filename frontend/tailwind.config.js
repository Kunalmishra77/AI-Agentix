export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        accent:        '#F26522',
        'accent-hover':'#FF7A3D',
        'blue-ai':     '#38BDF8',
        'blue-ai-deep':'#0EA5E9',
        navy:          '#0D1E3A',
        'bg-dark':     '#0A1628',
        'bg-card':     '#0D1E3A',
        'bg-light':    '#F0F7FF',
        'border-dark': '#1A3050',
        'border-light':'#E5E5E5',
        'text-muted':  '#999999',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(3rem,6.5vw,5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'section': ['clamp(2rem,4vw,3.2rem)',   { lineHeight: '1.1',  letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        content: '1240px',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
