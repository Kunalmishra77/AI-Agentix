import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { submitContact } from '../lib/api.js';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaEnvelope,
  FaCircleCheck,
  FaShieldHalved,
  FaHandshake,
  FaArrowRight,
  FaLock,
  FaMoneyBillWave,
} from 'react-icons/fa6';

/* ─── Validation schema (unchanged) ─────────────────────────────────────────── */
const schema = z.object({
  name:    z.string().min(2, 'Name is required'),
  email:   z.string().email('Valid email required'),
  company: z.string().optional(),
  phone:   z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  budget:  z.string().optional(),
});

const SERVICES = [
  'AI Consulting & Strategy',
  'AI Agents Development',
  'n8n Workflow Automation',
  'LLM Integration',
  'Generative AI Development',
  'Custom AI Chatbots',
  'Data Engineering',
  'AI Integration Services',
  'MLOps Consulting',
  'Other',
];

/* ─── Input/label style tokens ───────────────────────────────────────────────── */
const inputClass =
  'w-full border border-[#e5e5e5] rounded-lg px-4 py-3 text-[#0D1E3A] ' +
  'focus:border-[#F26522] focus:outline-none text-[15px] bg-white placeholder:text-[#bbb] transition-colors duration-200';

const labelClass = 'text-[11px] uppercase tracking-wide text-[#777] font-semibold mb-2 block';

const selectClass =
  'w-full border border-[#e5e5e5] rounded-lg px-4 py-3 text-[#555] ' +
  'focus:border-[#F26522] focus:outline-none text-[15px] bg-white transition-colors duration-200';

/* ─── Bottom feature data ────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: FaLock,
    title: 'No Lock-in Contracts',
    desc: 'Cancel any engagement after the first milestone. Zero vendor lock-in, always.',
  },
  {
    icon: FaMoneyBillWave,
    title: 'Fixed-Price PoC',
    desc: 'Every project starts with a scoped proof-of-concept at a fixed, agreed price.',
  },
  {
    icon: FaShieldHalved,
    title: 'Money-Back Guarantee',
    desc: "If the PoC doesn't meet agreed specs, you get a full refund. No questions asked.",
  },
];

/* ─── Page ───────────────────────────────────────────────────────────────────── */
export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => reset(),
  });

  const { ref: bottomRef, inView: bottomInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: splitRef,  inView: splitInView }  = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Helmet>
        <title>Contact AI Agentix — Start Your AI Project</title>
        <meta
          name="description"
          content="Talk to the AI Agentix team about your AI agents, automation, or LLM integration project. We respond within 1–2 business days."
        />
        <link rel="canonical" href="https://ai-agentix.com/contact" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative bg-[#0A1628] pt-[120px] pb-16 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(242,101,34,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(242,101,34,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      >
        {/* Glow blobs */}
        <div
          className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #F26522 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 right-0 w-[350px] h-[350px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-4"
            >
              Get In Touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-display font-black text-white leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
            >
              Let&rsquo;s Build{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #F26522 0%, #FF9A5C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Something
              </span>
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.3, transformOrigin: 'left' }}
              className="w-12 h-1 bg-[#F26522] rounded-full mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-[17px] text-[#888] leading-relaxed max-w-lg"
            >
              Tell us about your project. We design tailored AI solutions and move fast
              from discovery to deployment.
            </motion.p>
          </div>

          {/* Right — trust badges */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {[
              { label: 'Reply in 24h',      sub: 'Guaranteed response on business days', icon: FaEnvelope },
              { label: 'NDA Available',     sub: 'Strict confidentiality from day one',  icon: FaLock },
              { label: 'Fixed-price PoC',   sub: 'Scoped, budgeted, no surprises',       icon: FaHandshake },
            ].map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4 bg-[#0D1E3A] border border-[#1A3050] rounded-xl px-6 py-4"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F26522]/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon className="text-[#F26522]" size={17} />
                </div>
                <div>
                  <p className="text-[14px] font-display font-bold text-white leading-tight">{badge.label}</p>
                  <p className="text-[12px] text-[#666] mt-0.5">{badge.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Split layout contact section ──────────────────────────────────────── */}
      <section ref={splitRef} className="bg-[#0A1628]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={splitInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 lg:px-12 pb-0"
        >
          <div className="grid lg:grid-cols-[38%_1fr] rounded-2xl overflow-hidden border border-[#1A3050] shadow-2xl">

            {/* ── LEFT PANEL ────────────────────────────────────────────────── */}
            <div className="bg-[#0D1E3A] border-r border-[#1A3050] p-10 lg:p-12 flex flex-col gap-10">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-5">
                  Contact Information
                </p>

                <a
                  href="mailto:hello@ai-agentix.com"
                  className="flex items-center gap-3 group mb-6"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#F26522]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F26522]/20 transition-colors duration-200">
                    <FaEnvelope className="text-[#F26522]" size={15} />
                  </div>
                  <span className="text-[15px] text-[#aaa] group-hover:text-white transition-colors duration-200 font-medium">
                    hello@ai-agentix.com
                  </span>
                </a>

                <div className="flex items-center gap-2 bg-[#0A1628]/60 rounded-lg px-4 py-2.5 border border-[#1A3050] w-fit">
                  <FaCircleCheck className="text-[#38BDF8]" size={13} />
                  <span className="text-[12px] text-[#888]">We respond within 1–2 business days</span>
                </div>
              </div>

              {/* What happens next */}
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#555] font-semibold mb-5">
                  What Happens Next
                </p>
                <div className="space-y-5">
                  {[
                    { num: '01', text: 'Tell us your challenge' },
                    { num: '02', text: 'We design a solution'  },
                    { num: '03', text: 'We start building'     },
                  ].map((step) => (
                    <div key={step.num} className="flex items-start gap-4">
                      <span
                        className="text-[11px] font-display font-black text-[#F26522] leading-none mt-0.5 flex-shrink-0"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {step.num}
                      </span>
                      <p className="text-[14px] text-[#888] leading-snug">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric pills */}
              <div className="mt-auto pt-8 border-t border-[#1A3050]">
                <div className="flex flex-wrap gap-2">
                  {['50+ Projects', '3.9× ROI', '30+ Industries'].map((pill) => (
                    <span
                      key={pill}
                      className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#0A1628] border border-[#1A3050] text-[#888]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL — Form ─────────────────────────────────────────── */}
            <div className="bg-white p-10 lg:p-12">
              {/* Success state */}
              {mutation.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20 px-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <FaCircleCheck className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-[22px] font-display font-black text-[#0A1628] mb-3">
                    Message Received!
                  </h3>
                  <p className="text-[15px] text-[#777] max-w-sm leading-relaxed">
                    Thank you for reaching out. We'll review your message and get back
                    to you within 1–2 business days.
                  </p>
                </motion.div>
              )}

              {/* Error state */}
              {mutation.isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-5 py-4 mb-6 text-red-600 text-[14px]">
                  Something went wrong. Please try again or email us directly at{' '}
                  <a href="mailto:hello@ai-agentix.com" className="underline font-semibold">
                    hello@ai-agentix.com
                  </a>
                </div>
              )}

              {/* Form */}
              {!mutation.isSuccess && (
                <form onSubmit={handleSubmit((d) => mutation.mutate(d))} noValidate>
                  <p className="text-[11px] uppercase tracking-widest text-[#F26522] font-semibold mb-7">
                    Send Us a Message
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Name *</label>
                      <input
                        {...register('name')}
                        className={inputClass}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[12px] mt-1.5">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input
                        {...register('email')}
                        type="email"
                        className={inputClass}
                        placeholder="you@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[12px] mt-1.5">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className={labelClass}>Company</label>
                      <input
                        {...register('company')}
                        className={inputClass}
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone</label>
                      <input
                        {...register('phone')}
                        className={inputClass}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Service of Interest</label>
                    <select {...register('service')} className={selectClass}>
                      <option value="">Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className={labelClass}>Budget Range</label>
                    <select {...register('budget')} className={selectClass}>
                      <option value="">Select budget range…</option>
                      {['Under $10k', '$10k – $25k', '$25k – $50k', '$50k – $100k', '$100k+'].map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-7">
                    <label className={labelClass}>Message *</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className={inputClass + ' resize-none'}
                      placeholder="Tell us about your project, goals, and timeline…"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-[12px] mt-1.5">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="inline-flex items-center gap-2.5 bg-[#F26522] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#FF7A3D] transition-colors duration-200 text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>Send Message <FaArrowRight size={13} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Bottom feature strip ──────────────────────────────────────────────── */}
      <section ref={bottomRef} className="bg-[#F8FBFF] border-t border-[#e8edf4] py-20 mt-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 22 }}
                animate={bottomInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F26522]/10 flex items-center justify-center">
                  <f.icon className="text-[#F26522]" size={19} />
                </div>
                <div>
                  <h3 className="text-[15px] font-display font-bold text-[#0A1628] mb-1.5">{f.title}</h3>
                  <p className="text-[13px] text-[#777] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
