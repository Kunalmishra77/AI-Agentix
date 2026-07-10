import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Section from '../common/Section'
import { channels } from '../../data/aiStudio'
import { STUDIO_ICONS } from './icons'

export default function AIStudioChannels() {
  return (
    <Section tone="white">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* left: heading + body + bullets */}
        <div>
          <span className="eyebrow mb-4"><span className="h-px w-6 bg-accent" aria-hidden /> {channels.eyebrow}</span>
          <h2 className="text-h2 max-w-md text-heading">{channels.heading}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-body">{channels.body}</p>
          <ul className="mt-6 grid gap-3">
            {channels.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm font-medium text-heading">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Check className="h-3 w-3" strokeWidth={3.5} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* right: platform cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {channels.platforms.map((p, i) => {
            const Icon = STUDIO_ICONS[p.icon]
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
                className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {Icon && <Icon className="h-5 w-5" strokeWidth={1.9} />}
                </span>
                <div>
                  <div className="text-sm font-bold text-heading">{p.name}</div>
                  <div className="text-xs text-body-soft">{p.role}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
