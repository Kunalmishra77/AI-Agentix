import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Circle, TrendingUp, Activity } from 'lucide-react'
import { dashboard as d } from '../../data/home'
import { cn } from '../../lib/cn'

// Decorative activity bars (illustrative chart — no invented data claims).
const BARS = [38, 52, 44, 61, 55, 72, 64, 80, 70, 88, 76, 94]

export default function DashboardMock() {
  const [range, setRange] = useState('Today')
  const [count, setCount] = useState(d.counterStart)
  const [eventIdx, setEventIdx] = useState(0)

  useEffect(() => {
    const c = setInterval(() => setCount((n) => n + Math.floor(Math.random() * 4) + 1), 1800)
    const e = setInterval(() => setEventIdx((i) => (i + 1) % d.events.length), 2600)
    return () => { clearInterval(c); clearInterval(e) }
  }, [])

  const kpis = d.kpis[range]

  return (
    <section className="bg-surface pt-28 pb-[70px] md:pt-32 md:pb-section">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.5, 0.25, 1] }}
          className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-line bg-white shadow-float"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-2 border-b border-line bg-surface-alt px-4 py-3">
            <span className="flex gap-1.5">
              <Circle className="h-2.5 w-2.5 fill-[#FF5F57] text-[#FF5F57]" />
              <Circle className="h-2.5 w-2.5 fill-[#FEBC2E] text-[#FEBC2E]" />
              <Circle className="h-2.5 w-2.5 fill-[#28C840] text-[#28C840]" />
            </span>
            <div className="ml-2 flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-xs text-body-soft">
              {d.url}
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-soft px-2 py-1 text-[10px] font-bold tracking-wide text-accent">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              {d.liveLabel}
            </span>
          </div>

          {/* header */}
          <div className="flex flex-col gap-3 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-heading">{d.panelTitle}</h3>
              <p className="text-xs text-body-soft">
                <span className="font-semibold text-heading">{count.toLocaleString('en-IN')}</span> {d.statusText}
              </p>
            </div>
            <div className="flex gap-1 rounded-lg bg-surface-alt p-1">
              {d.ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                    range === r ? 'bg-white text-heading shadow-sm' : 'text-body-soft hover:text-heading',
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 p-5 lg:grid-cols-[1.5fr_1fr]">
            {/* left: KPIs + chart */}
            <div>
              <div className="grid grid-cols-3 gap-3">
                {kpis.map((kpi, i) => (
                  <div key={kpi.k} className="rounded-xl border border-line bg-surface-alt/60 p-3.5">
                    <p className="text-[11px] text-body-soft">{kpi.k}</p>
                    <p className="mt-1 text-xl font-extrabold text-heading">{kpi.v}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold text-accent">
                      <TrendingUp className="h-3 w-3" /> {d.trends[i]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-line p-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-heading">
                  <Activity className="h-3.5 w-3.5 text-accent" />
                  {d.chartLabel}
                </div>
                <div className="flex h-28 items-end gap-1.5">
                  {BARS.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.04 }}
                      className="flex-1 rounded-t bg-gradient-to-t from-accent/40 to-accent"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* right: agents + events */}
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-line p-4">
                <p className="mb-3 text-xs font-semibold text-heading">Active Agents</p>
                <ul className="space-y-2.5">
                  {d.agents.map((a) => (
                    <li key={a.name} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-body">
                        <span className={cn('h-1.5 w-1.5 rounded-full', a.status === 'on' ? 'bg-[#28C840] animate-pulse-dot' : 'bg-body-soft/50')} />
                        {a.name}
                      </span>
                      <span className={cn('text-[10px] font-medium uppercase', a.status === 'on' ? 'text-[#1a9c34]' : 'text-body-soft')}>
                        {a.status === 'on' ? 'active' : 'idle'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 rounded-xl border border-line bg-ink p-4">
                <p className="mb-3 text-xs font-semibold text-white">Live Events</p>
                <div className="space-y-2">
                  {d.events.map((ev, i) => (
                    <div
                      key={ev.text}
                      className={cn(
                        'rounded-lg border border-white/5 bg-white/[0.04] px-3 py-2 transition-all duration-500',
                        i === eventIdx ? 'opacity-100 ring-1 ring-accent/40' : 'opacity-50',
                      )}
                    >
                      <p className="text-[11px] leading-snug text-white/85">{ev.text}</p>
                      <span className="mt-1 inline-block rounded bg-accent/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
                        {ev.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
