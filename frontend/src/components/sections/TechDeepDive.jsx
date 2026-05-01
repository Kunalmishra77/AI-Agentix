import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TABS = [
  {
    label: 'Machine Learning Services',
    title: 'Machine Learning agency for enterprises',
    content: [
      "Artificial Intelligence is by far one of the most transformational technologies for companies regardless of their scale. AI Agentix helps businesses unlock the full potential of data they already have and generate new intelligence on a daily basis.",
      "As AI and Machine Learning are not just about automation but also about teaching computers how to handle tasks that simultaneously, the AI benefits are clear — better products, faster decisions, lower cost.",
    ],
  },
  {
    label: 'Deep Learning',
    title: 'Deep Learning solutions for complex problems',
    content: [
      "Deep learning powers the most accurate AI models available today — from computer vision to NLP to time-series forecasting. We design and train neural networks that solve real business problems, not benchmark datasets.",
      "Our deep learning practice spans convolutional networks for vision, transformer architectures for language, and hybrid models for multimodal data. Every model we train is evaluated on your production distribution.",
    ],
  },
  {
    label: 'Data Platform Building',
    title: 'The data foundation your AI depends on',
    content: [
      "No AI strategy succeeds without clean, connected, accessible data. We design and build data platforms that centralise your data assets, enforce governance, and make data available to AI systems in real time.",
      "From lakehouse architectures on Databricks and Snowflake to streaming pipelines with Kafka, we build data platforms that serve as the operating system for your AI organisation.",
    ],
  },
  {
    label: 'Generative AI',
    title: 'Generative AI that creates real business value',
    content: [
      "Generative AI is transforming how companies create content, automate knowledge work, and build products. We help you move beyond the demo stage and deploy generative AI that reliably performs in production.",
      "Our generative AI practice covers LLM integration, RAG pipelines, fine-tuning, prompt engineering, and agentic systems — built for your use case, your data, and your compliance requirements.",
    ],
  },
];

export default function TechDeepDive() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="bg-white section-pad border-t border-[#e5e5e5]">
      <div ref={ref} className="content-wrap">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="font-display font-black text-[#0D1E3A] leading-tight mb-12 sm:mb-16 w-full"
          style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.4rem)', letterSpacing: '-0.02em' }}
        >
          Outrun the competition with Artificial Intelligence solutions
          and Machine Learning services oiled with Big Data
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — service list */}
          <div className="lg:col-span-2 divide-y divide-[#e5e5e5]">
            {TABS.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActive(i)}
                className={`w-full text-left py-5 flex items-center justify-between gap-4 transition-all duration-200 group ${
                  active === i ? 'text-[#F26522]' : 'text-[#444] hover:text-[#0D1E3A]'
                }`}
              >
                <span className={`text-[15px] font-medium ${active === i ? 'font-semibold' : ''}`}>
                  {t.label}
                </span>
                <span className={`text-[18px] transition-all duration-200 flex-shrink-0 ${
                  active === i ? 'text-[#F26522]' : 'text-[#ccc] group-hover:text-[#999]'
                }`}>
                  +
                </span>
              </button>
            ))}
          </div>

          {/* Right — content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-[22px] font-display font-bold text-[#0D1E3A] mb-6">
                  {TABS[active].title}
                </h3>
                {TABS[active].content.map((p, i) => (
                  <p key={i} className="text-[15px] text-[#555] leading-relaxed mb-5">
                    {p}
                  </p>
                ))}
                <a href="/contact" className="btn-accent inline-flex mt-2 text-[14px] px-8 py-3">
                  Let's talk →
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
