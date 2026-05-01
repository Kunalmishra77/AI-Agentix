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
      if (!contentRef.current || window.innerWidth < 768) return;
      const y = window.scrollY;
      contentRef.current.style.transform = `translateY(${y * 0.18}px)`;
      contentRef.current.style.opacity   = String(Math.max(0, 1 - y / 500));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0A1628] min-h-[600px] lg:h-screen">

      {/* VIDEO — full bleed */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Scrim */}
      <div className="absolute inset-0 z-[1] bg-black/45" />

      {/* CONTENT — pushed to upper portion of hero */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col justify-center lg:justify-start py-20 lg:pt-[160px] lg:pb-[240px]"
        style={{ height: '100%' }}
      >
        <div className="max-w-[1240px] mx-auto w-full px-6 sm:px-12">

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-white/80 font-medium mb-4 sm:mb-5 leading-relaxed text-[0.9rem] sm:text-[1.0625rem]"
          >
            AI Solution provider &amp; Big Data Experts Company
          </motion.p>

          {/* Heading — exactly 2 lines, big and bold */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="font-display font-black text-white leading-[1.1] sm:leading-[1.04] mb-8 sm:mb-10 lg:whitespace-nowrap"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4.6rem)',
              letterSpacing: '-0.025em',
            }}
          >
            Driving changes through
            <br className="hidden sm:block" />
            AI &amp; Agentic Automation
          </motion.h1>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4
                         border border-white/50 text-white font-semibold text-[14px] sm:text-[15px]
                         hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              Read case studies
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 sm:py-4
                         bg-[#F26522] text-white font-semibold text-[14px] sm:text-[15px]
                         hover:bg-[#FF7A3D] transition-colors duration-200"
            >
              Let's talk
            </Link>
          </motion.div>

        </div>
      </div>

      {/* SERVICE CARDS — stacked on mobile, grid on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.45 }}
        className="relative lg:absolute lg:right-0 lg:bottom-0 z-20 w-full lg:w-[62%]"
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            background: 'linear-gradient(135deg, rgba(28,32,26,0.97) 0%, rgba(36,40,33,0.97) 100%)',
          }}
        >
          {SERVICE_CARDS.map((card, i) => (
            <Link
              key={i}
              to={card.href}
              className={`group relative px-6 py-8 sm:px-10 sm:py-10
                         border-b lg:border-b-0 border-white/[0.1]
                         md:border-r md:border-white/[0.1]
                         lg:border-l lg:border-r-0
                         hover:border-l-[#F26522]
                         transition-all duration-200
                         hover:bg-white/[0.04]`}
            >
              <h3
                className="text-white font-display font-bold leading-snug mb-3 sm:mb-5
                           group-hover:text-[#F26522] transition-colors duration-200 text-[1.1rem] sm:text-[1.2rem]"
              >
                {card.title}
              </h3>
              <p className="text-white/50 leading-relaxed text-[0.8rem] sm:text-[0.875rem]">
                {card.desc}
              </p>
            </Link>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
