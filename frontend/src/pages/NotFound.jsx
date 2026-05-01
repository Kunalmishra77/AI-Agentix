import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHouse } from 'react-icons/fa6';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-6">
      <Helmet>
        <title>404 — Page Not Found | AI Agentix</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-xl"
      >
        {/* Glowing 404 */}
        <div className="relative mb-6 select-none">
          <span
            className="font-display font-black text-white leading-none block"
            style={{
              fontSize: 'clamp(6rem, 18vw, 12rem)',
              textShadow: '0 0 80px rgba(242,101,34,0.35)',
              letterSpacing: '-0.05em',
            }}
          >
            404
          </span>
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #0A1628, transparent)' }}
          />
        </div>

        <div className="w-12 h-1 bg-[#F26522] rounded-full mx-auto mb-6" />

        <h1 className="font-display font-black text-white text-[2rem] mb-4 leading-tight">
          Page Not Found
        </h1>
        <p className="text-[#7A8FA6] text-[16px] leading-relaxed mb-10">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F26522] text-white font-display font-bold rounded-lg hover:bg-[#FF7A3D] transition-colors text-[15px]"
          >
            <FaHouse size={14} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#1A3050] text-[#94A3B8] font-semibold rounded-lg hover:border-[#F26522] hover:text-[#F26522] transition-all text-[15px]"
          >
            <FaArrowLeft size={14} />
            Go Back
          </button>
        </div>

        <p className="mt-10 text-[13px] text-[#4A6080]">
          Need help?{' '}
          <Link to="/contact" className="text-[#F26522] hover:underline font-semibold">
            Contact our team
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
