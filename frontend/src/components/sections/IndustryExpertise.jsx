import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Icon from '../../utils/icons.jsx';

const INDUSTRIES = [
  {
    tab: 'Aviation',
    title: 'AI for Aviation Industry',
    content: [
      'We have extensive experience developing AI solutions tailored for the aviation industry, focusing on enhancing passenger experiences, optimising operations, and leveraging data analytics to align with your business goals.',
      'Our advanced technologies address unique challenges through digital twins for predictive maintenance, computer vision for improved baggage handling and security, and AI-driven analytics for personalised passenger services and operational efficiency.',
    ],
    href: '/industries/aviation',
    bg: '#0a0f1a',
    icon: 'plane',
    image: '/assets/images/Industry%20expertise1.webp',
  },
  {
    tab: 'Private Investments',
    title: 'AI for Private Investments',
    content: [
      'We build AI-powered platforms for deal sourcing, portfolio monitoring, and predictive valuation — giving investment professionals real-time intelligence across their entire fund.',
      'Our solutions automate financial document extraction, generate investor reports, and surface risk signals using LLMs trained on financial data.',
    ],
    href: '/industries/finance',
    bg: '#0d1a0f',
    icon: 'chart-line',
    image: '/assets/images/Industry%20expertise2.webp',
  },
  {
    tab: 'Finance & Insurance',
    title: 'AI for Finance & Insurance',
    content: [
      'We build real-time fraud detection platforms, intelligent document verification systems, and compliance monitoring solutions for financial institutions and insurtech companies.',
      'Our AI systems handle REC validation in 15 seconds, automate contract analysis with 99.2% accuracy, and replace weeks of manual review with intelligent agentic pipelines.',
    ],
    href: '/industries/finance',
    bg: '#0f0a1a',
    icon: 'money-bill',
    image: '/assets/images/Industry%20expertise3.jpg',
  },
  {
    tab: 'Manufacturing',
    title: 'AI-Driven Manufacturing Intelligence',
    content: [
      'Manufacturers use our AI solutions for quality control, predictive maintenance, CAD standardisation, traceability, and supply chain optimisation.',
      'Our computer vision and MLOps solutions help manufacturers reduce manual work by up to 30% and catch defects before they reach the assembly line.',
    ],
    href: '/industries/manufacturing',
    bg: '#1a0f0a',
    icon: 'industry',
    image: '/assets/images/Industry%20expertise4.webp',
  },
  {
    tab: 'Retail',
    title: 'Retail AI & E-Commerce Automation',
    content: [
      'Retailers use AI Agentix for AI-powered image quality detection, store compliance analysis, demand forecasting, and intelligent customer experience automation.',
      'Our computer vision and ML solutions process thousands of product images, enforce merchandising standards, and predict demand with accuracy that directly reduces inventory costs.',
    ],
    href: '/industries/retail',
    bg: '#1a1a0a',
    icon: 'cart-shopping',
    image: '/assets/images/Industry%20expertise5.jpeg',
  },
  {
    tab: 'Logistics',
    title: 'Intelligent Logistics & Supply Chain',
    content: [
      'Logistics operators leverage our AI for intermodal transportation data platforms, AI-based demand forecasting in parcel delivery, and unified supply chain management.',
      'We unify aviation, maritime, and rail data to enable real-time disruption management and build AI systems that continuously optimise shipping and inventory decisions.',
    ],
    href: '/industries/logistics',
    bg: '#0a1a1a',
    icon: 'truck',
    image: '/assets/images/Industry%20expertise6.webp',
  },
];

export default function IndustryExpertise() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const ind = INDUSTRIES[active];

  return (
    <section ref={ref} className="bg-white py-12 sm:py-20 border-t border-[#e5e5e5]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12"
        >
          <h2
            className="font-display font-black text-[#0D1E3A] leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            Industry expertise
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-[14px] sm:text-[15px] text-[#555]">Your industry isn't here? That's not a problem!</span>
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-[#F26522] text-white font-semibold text-[14px] hover:bg-[#FF7A3D] transition-colors whitespace-nowrap text-center"
            >
              Let's talk
            </Link>
          </div>
        </motion.div>

        {/* ── Main: image | content — stacked on mobile ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr] items-stretch">

          {/* LEFT — image panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden min-h-[280px] sm:min-h-[360px] lg:min-h-[460px]"
              style={{ background: ind.bg }}
            >
              <img
                src={ind.image}
                alt={ind.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          </AnimatePresence>

          {/* RIGHT — text content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${active}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-8 sm:py-12 bg-white border border-[#e5e5e5] lg:border-l-0"
            >
              <h3
                className="font-display font-bold text-[#0D1E3A] mb-4 sm:mb-6 leading-snug text-[1.4rem] sm:text-[1.75rem]"
              >
                {ind.title}
              </h3>
              {ind.content.map((p, i) => (
                <p key={i} className="text-[14px] sm:text-[15px] text-[#555] leading-relaxed mb-4 sm:mb-5">
                  {p}
                </p>
              ))}
              <div className="mt-auto pt-4 sm:pt-6 flex justify-end">
                <Link
                  to={ind.href}
                  className="text-[14px] font-semibold text-[#F26522] hover:text-[#FF7A3D] transition-colors"
                >
                  read more →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* ── Tabs ── */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-[#e5e5e5]"
        >
          {INDUSTRIES.map((item, i) => (
            <button
              key={item.tab}
              onClick={() => setActive(i)}
              className={`py-6 sm:py-8 px-4 sm:px-5 text-left border-r border-b transition-all duration-200
                ${active === i
                  ? 'bg-[#0D1E3A] border-[#0D1E3A]'
                  : 'bg-white border-[#e5e5e5] hover:bg-[#f7f7f5]'
                }`}
            >
              <span
                className={`font-semibold text-[13px] sm:text-[14px] leading-snug block
                  ${active === i ? 'text-[#F26522]' : 'text-[#333]'}`}
              >
                {item.tab}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
