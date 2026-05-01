import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ProductSpotlight() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: '340px' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/images/ContextClue.webp')",
          backgroundColor: '#1a2035',
        }}
      />

      {/* Dark scrim */}
      <div className="absolute inset-0 z-[1] bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-[38%_1fr] items-center gap-16"
        >
          {/* Left — product name */}
          <h2
            className="font-display font-black text-white leading-tight"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.8rem)', letterSpacing: '-0.02em' }}
          >
            ContextClue
          </h2>

          {/* Right — description + CTA */}
          <div>
            <p
              className="text-white font-medium leading-relaxed mb-8"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
            >
              ContextClue is our innovative product powered by Generative AI that provides
              automated text analysis, document creation based on templates and information
              retrieval.
            </p>
            <Link
              to="/products/contextclue"
              className="inline-flex items-center px-7 py-3 bg-[#F26522] text-white font-semibold text-[15px] rounded-full hover:bg-[#E05A1A] transition-colors duration-200"
            >
              Learn more
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
