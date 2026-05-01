import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SERVICE_CARDS = [
  {
    title: 'AI Consulting',
    desc: "Discover AI's practical advantages with custom solutions",
    href: '/services/ai-consulting',
  },
  {
    title: 'Generative AI',
    desc: 'Adapt cutting-edge Generative AI to your business needs',
    href: '/services/generative-ai',
  },
  {
    title: 'Big Data Consulting',
    desc: 'Transform your data into actionable business insights',
    href: '/services/big-data',
  },
];

export default function HeroSection() {
  const contentRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!contentRef.current) return;
      const y = window.scrollY;
      contentRef.current.style.transform = `translateY(${y * 0.18}px)`;
      contentRef.current.style.opacity   = String(Math.max(0, 1 - y / 500));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0A1628]" style={{ minHeight: '100vh' }}>

      {/* VIDEO — full bleed */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Scrim */}
      <div className="absolute inset-0 z-[1] bg-black/35" />

      {/* CONTENT — pushed to upper portion of hero */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-start"
        style={{ minHeight: '100vh', paddingTop: '110px', paddingBottom: '220px' }}
      >
        <div className="max-w-[1240px] mx-auto w-full px-12">

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-white/75 font-medium mb-5 leading-relaxed"
            style={{ fontSize: '1.0625rem' }}
          >
            AI Solution provider &amp; Big Data Experts Company
          </motion.p>

          {/* Heading — exactly 2 lines, big and bold */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="font-display font-black text-white leading-[1.04] mb-10 whitespace-nowrap"
            style={{
              fontSize: 'clamp(2.4rem, 4.6vw, 4.6rem)',
              letterSpacing: '-0.025em',
            }}
          >
            Driving changes through
            <br />
            AI &amp; Agentic Automation
          </motion.h1>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center px-8 py-4
                         border border-white/50 text-white font-semibold text-[15px]
                         hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              Read case studies
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4
                         bg-[#F26522] text-white font-semibold text-[15px]
                         hover:bg-[#FF7A3D] transition-colors duration-200"
            >
              Let's talk
            </Link>
          </motion.div>

        </div>
      </div>

      {/* SERVICE CARDS — right-aligned, left-border separator style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.45 }}
        className="absolute right-0 bottom-0 z-20"
        style={{ width: '62%' }}
      >
        <div
          className="grid grid-cols-3"
          style={{
            background: 'linear-gradient(135deg, rgba(28,32,26,0.97) 0%, rgba(36,40,33,0.97) 100%)',
          }}
        >
          {SERVICE_CARDS.map((card, i) => (
            <Link
              key={i}
              to={card.href}
              className="group relative px-10 py-10
                         border-l border-white/[0.15]
                         hover:border-l-[#F26522]
                         transition-all duration-200
                         hover:bg-white/[0.04]"
            >
              <h3
                className="text-white font-display font-bold leading-snug mb-5
                           group-hover:text-[#F26522] transition-colors duration-200"
                style={{ fontSize: '1.2rem' }}
              >
                {card.title}
              </h3>
              <p className="text-white/50 leading-relaxed" style={{ fontSize: '0.875rem' }}>
                {card.desc}
              </p>
            </Link>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
