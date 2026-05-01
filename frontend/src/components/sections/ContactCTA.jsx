import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ContactCTA() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && agreed) setSubmitted(true);
  };

  return (
    <>
      {/* ── Top banner — background image + content ── */}
      <section
        ref={ref}
        className="relative w-full overflow-hidden"
        style={{ minHeight: '320px' }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/Contact%20Us.webp')",
            backgroundColor: '#0A1628',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 z-[1] bg-black/50" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-[1240px] mx-auto px-12 py-20 grid items-center"
          style={{ gridTemplateColumns: '38% 1fr', gap: '4rem' }}
        >
          {/* Left — "Contact us" */}
          <h2
            className="font-display font-black text-white leading-tight"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', letterSpacing: '-0.025em' }}
          >
            Contact us
          </h2>

          {/* Right — subtitle + CTA */}
          <div>
            <p
              className="text-white font-medium leading-relaxed mb-8"
              style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
            >
              Schedule an intro call to get know each other better and understand the way we work
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-7 py-3 bg-[#F26522] text-white font-semibold text-[15px] rounded-full hover:bg-[#E05A1A] transition-colors duration-200"
            >
              Let's talk
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Bottom — Newsletter signup ── */}
      <section className="bg-white border-t border-[#e5e5e5] py-14">
        <div className="max-w-[1240px] mx-auto px-12">
          <div className="grid items-center gap-16" style={{ gridTemplateColumns: '45% 1fr' }}>

            {/* Left */}
            <div>
              <h3
                className="font-display font-black text-[#0D1E3A] mb-2"
                style={{ fontSize: '1.5rem' }}
              >
                Join our newsletter!
              </h3>
              <p className="text-[#38BDF8] font-medium text-[15px]">
                AI News, Client Stories &amp; Resources Each Month
              </p>
            </div>

            {/* Right — form */}
            {submitted ? (
              <p className="text-[#F26522] font-semibold text-[15px]">
                Thank you for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-[#d1d5db] rounded-md px-4 py-3 text-[15px] text-[#0D1E3A] placeholder-[#aaa] outline-none focus:border-[#F26522] transition-colors"
                />
                <label className="flex items-center gap-3 cursor-pointer text-[14px] text-[#555]">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 accent-[#F26522]"
                  />
                  I agree to receive Newsletter. *
                </label>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#F26522] text-white font-semibold text-[15px] rounded-md hover:bg-[#E05A1A] transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
