import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../lib/motion';

export default function HeroSection() {
  const contentRef = useRef(null);
  const videoRef   = useRef(null);

  // Parallax + fade on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const y = window.scrollY;
      contentRef.current.style.transform = `translateY(${y * 0.3}px)`;
      contentRef.current.style.opacity   = Math.max(0, 1 - y / 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-black overflow-hidden">

      {/* ── VIDEO / ANIMATED BG ─── */}
      <div className="absolute inset-0 z-0">
        {/* Try loading real video — fallback to animated mesh */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          poster="/assets/hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => { if(videoRef.current) videoRef.current.style.display='none'; }}
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Animated gradient mesh fallback / always-on overlay */}
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 65% 35%, rgba(232,77,28,0.10) 0%, transparent 65%),
              radial-gradient(ellipse 50% 80% at 15% 70%, rgba(232,77,28,0.05) 0%, transparent 55%),
              #000000
            `,
            animationDuration: '8s',
          }}
        />

        {/* Grid overlay — addepto signature subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#ffffff 1px, transparent 1px),
              linear-gradient(90deg, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          }}
        />

        {/* Dark overlay on top of everything */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ── CONTENT ─── */}
      <div ref={contentRef} className="relative z-10 content-wrap section-pad w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-[820px]"
        >
          {/* Scroll indicator dot */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#e84d1c] animate-pulse" />
            <span className="eyebrow text-[#e84d1c]">AI Solution Provider</span>
          </motion.div>

          {/* H1 — exact addepto structure */}
          <motion.h1
            variants={fadeUp}
            className="hero-title text-white mb-0 font-display"
          >
            AI Solution provider &amp;
            <br />
            Agentic Automation
            <br />
            Experts Company
          </motion.h1>

          {/* Accent divider — addepto's signature element */}
          <motion.div variants={fadeUp} className="accent-divider my-6" />

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-[rgba(255,255,255,0.65)] text-lg leading-relaxed max-w-[480px] mb-6 font-light"
          >
            Driving changes through
            <br />
            AI &amp; Agentic Automation solutions
          </motion.p>

          <motion.div variants={fadeUp} className="accent-divider mb-8" />

          {/* CTAs — ghost first, accent second (exact addepto order) */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link to="/case-studies" className="btn-ghost">
              Read case studies →
            </Link>
            <Link to="/contact" className="btn-accent">
              Let's talk →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── SCROLL INDICATOR ─── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10
                      flex flex-col items-center gap-2 animate-bounce"
           style={{ animationDuration: '2s' }}>
        <div className="w-px h-10 bg-gradient-to-b from-[#e84d1c] to-transparent" />
        <span className="eyebrow text-[#555] text-[10px]">scroll</span>
      </div>
    </section>
  );
}
