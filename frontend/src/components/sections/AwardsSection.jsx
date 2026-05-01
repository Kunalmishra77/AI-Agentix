import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AWARDS = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    issuer: 'FIRSTMARK',
    title: 'MAD\nLANDSCAPE',
    subtitle: 'MACHINE LEARNING, AI & DATA',
    year: '2023',
    dark: false,
  },
  {
    id: 2,
    bg: '#0a0a0a',
    issuer: 'Deloitte.',
    title: 'Fast 50',
    subtitle: '#20 Fast 50 category',
    year: 'Central Europe',
    dark: true,
    accent: '#F26522',
  },
  {
    id: 3,
    bg: 'linear-gradient(135deg, #1e3a5f 0%, #0ea5e9 100%)',
    issuer: 'Clutch',
    title: 'TOP AI\nAGENCY',
    subtitle: 'Global Leader',
    year: '2025',
    dark: true,
    accent: '#F26522',
  },
  {
    id: 4,
    bg: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
    issuer: 'GoodFirms',
    title: 'TOP AI &\nML COMPANY',
    subtitle: 'Verified Excellence',
    year: '2025',
    dark: true,
    accent: '#F26522',
  },
  {
    id: 5,
    bg: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
    issuer: 'Forbes',
    title: 'AI\nINNOVATOR',
    subtitle: 'Best in Class',
    year: '2024',
    dark: true,
    accent: '#F26522',
  },
  {
    id: 6,
    bg: 'linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)',
    issuer: 'G2',
    title: 'HIGH\nPERFORMER',
    subtitle: 'Enterprise AI',
    year: '2025',
    dark: true,
    accent: '#fbbf24',
  },
  {
    id: 7,
    bg: 'linear-gradient(135deg, #0c4a6e 0%, #38bdf8 100%)',
    issuer: 'Clutch',
    title: 'TOP 1000\nCOMPANIES',
    subtitle: 'Global Recognition',
    year: '2025',
    dark: true,
    accent: '#F26522',
  },
  {
    id: 8,
    bg: 'linear-gradient(135deg, #14532d 0%, #4ade80 100%)',
    issuer: 'GoodFirms',
    title: 'TOP BIG\nDATA FIRM',
    subtitle: 'Research & Analytics',
    year: '2024',
    dark: true,
    accent: '#fbbf24',
  },
];

// Split into pages of 2 (side by side)
const PAGES = [];
for (let i = 0; i < AWARDS.length; i += 2) {
  PAGES.push(AWARDS.slice(i, i + 2));
}

function AwardSquare({ award }) {
  return (
    <div
      className="relative overflow-hidden rounded-lg w-full"
      style={{ height: '260px', background: award.bg }}
    >
      <div className="absolute inset-0 p-5 flex flex-col justify-between">
        <span
          className="font-bold text-[13px] tracking-wide"
          style={{ color: award.dark ? '#fff' : '#0a0a0a' }}
        >
          {award.issuer}
        </span>

        <div>
          <p
            className="font-black leading-tight mb-1 whitespace-pre-line"
            style={{
              fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)',
              color: award.dark ? '#fff' : '#0a0a0a',
              letterSpacing: '-0.01em',
            }}
          >
            {award.title}
          </p>
          <p
            className="text-[11px] font-semibold"
            style={{ color: award.accent || (award.dark ? '#0a0a0a' : 'rgba(0,0,0,0.55)') }}
          >
            {award.subtitle}
          </p>
        </div>

        <span
          className="text-[12px] font-medium tracking-wider uppercase"
          style={{ color: award.dark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)' }}
        >
          {award.year}
        </span>
      </div>
    </div>
  );
}

export default function AwardsSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [page, setPage] = useState(0);

  // Auto-advance page every 2.5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setPage((p) => (p + 1) % PAGES.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const currentPage = PAGES[page];

  return (
    <section className="bg-white py-12 sm:py-20 border-t border-[#e5e5e5]">
      <div ref={ref} className="max-w-[1240px] mx-auto px-6 sm:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16 items-center">

          {/* LEFT — wider text block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-display font-black text-[#0D1E3A] leading-tight mb-6"
              style={{ fontSize: 'clamp(1.75rem, 3.2vw, 3.2rem)', letterSpacing: '-0.025em' }}
            >
              We are recognized as one of the best AI, BI, and Big Data consultants
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#666] leading-relaxed">
              We helped multiple companies achieve their goals, but — instead of making hollow
              marketing claims here — we encourage you to check our Clutch scoring.
            </p>
          </motion.div>

          {/* RIGHT — 2×2 auto-sliding award squares */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 gap-4"
                style={{ gridTemplateRows: '1fr' }}
              >
                {currentPage.map((award) => (
                  <AwardSquare key={award.id} award={award} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Page dots */}
            <div className="flex justify-center gap-2 mt-5">
              {PAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className="w-2 h-2 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: i === page ? '#F26522' : '#d1d5db' }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
