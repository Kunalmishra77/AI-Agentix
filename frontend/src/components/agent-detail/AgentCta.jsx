import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

// Closing CTA — orange band, consistent with the site's conversion sections.
export default function AgentCta({ agent }) {
  return (
    <section className="relative overflow-hidden bg-accent py-[70px] text-white md:py-section">
      <div className="absolute inset-0 opacity-[0.12]" aria-hidden style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.9) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden />

      <div className="container-x relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-bold leading-tight text-white">
            Put the {agent.name} to work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            Book a free scoping call. We'll map exactly how the {agent.name} fits your workflows and what it would automate first.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn bg-white text-accent hover:bg-white/90">
              Get a Free AI Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/contact" className="btn border border-white/40 text-white hover:bg-white/10">
              <Phone className="h-4 w-4" /> Talk to an Engineer
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
