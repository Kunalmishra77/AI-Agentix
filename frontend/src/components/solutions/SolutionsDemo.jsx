import { useState } from 'react'
import { Play, ArrowRight } from 'lucide-react'
import Section from '../common/Section'
import SectionHeading from '../common/SectionHeading'
import Reveal from '../common/Reveal'
import { cn } from '../../lib/cn'
import { demo } from '../../data/solutions'

export default function SolutionsDemo() {
  const [active, setActive] = useState(0)
  const flow = demo.flows[active]

  return (
    <Section tone="alt" id="demo" className="scroll-mt-20">
      <SectionHeading
        eyebrow={demo.eyebrow}
        heading={demo.heading}
        sub={demo.body}
        align="center"
        max="max-w-2xl"
        className="mx-auto"
      />

      {/* ── Video showcase ──────────────────────────────────────────────
          Premium placeholder. When the final demo video is delivered, replace
          the inner "placeholder" block with:
            <video className="absolute inset-0 h-full w-full object-cover"
                   src="/…mp4" poster="/…" controls playsInline />
          The 16:9 container, framing, and layout stay identical — no redesign. */}
      <Reveal className="mt-12">
        <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-ink shadow-float">
          {/* placeholder visuals */}
          <div className="absolute inset-0" aria-hidden>
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)', backgroundSize: '48px 48px' }}
            />
            <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'radial-gradient(50% 55% at 50% 45%, rgba(242,101,34,0.22) 0%, transparent 62%)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <span className="group inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white shadow-orange transition-transform duration-300 hover:scale-105">
              <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" strokeWidth={0} />
            </span>
            <p className="mt-6 text-lg font-bold text-white md:text-xl">{demo.videoNote}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
              A full walkthrough of AI Agentix automating a real business — end to end.
            </p>
          </div>

          {/* badge */}
          <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-pill border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {demo.videoBadge}
          </span>
        </div>
      </Reveal>

      {/* ── Demo workflow showcase (what the video will walk through) ── */}
      <div className="mx-auto mt-12 max-w-5xl">
        {/* flow selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {demo.flows.map((f, i) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'rounded-pill px-4 py-2 text-sm font-semibold transition-all duration-200',
                i === active
                  ? 'bg-ink text-white shadow-card'
                  : 'border border-line bg-white text-body hover:border-accent/40 hover:text-heading',
              )}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* active flow */}
        <Reveal key={flow.key} className="mt-8">
          <div className="rounded-card border border-line bg-white p-6 md:p-8">
            <div className="flex flex-col gap-1 border-b border-line pb-5 md:flex-row md:items-center md:justify-between">
              <h3 className="text-xl font-bold text-heading md:text-2xl">{flow.name}</h3>
              <p className="text-sm text-body-soft">{flow.summary}</p>
            </div>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {flow.steps.map((s, i) => (
                <li key={s} className="relative flex items-start gap-3 rounded-xl bg-surface-alt p-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-xs font-bold text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pt-0.5 text-sm font-medium leading-snug text-heading">{s}</span>
                </li>
              ))}
            </ol>

            {active < demo.flows.length - 1 && (
              <button
                type="button"
                onClick={() => setActive((a) => a + 1)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
              >
                Next: {demo.flows[active + 1].name}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
