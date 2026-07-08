import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, RotateCcw, Bot } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import { cn } from '../../lib/cn'

/**
 * Animated conversation demo — the "signature" block for the AI Voice & Chat page.
 * Plays a scripted transcript (typing indicator + staggered bubbles), then checks
 * off the conversation outcomes. Data-driven via `signature.messages` / `.outcomes`.
 */
export default function SignatureChat({ signature }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const total = signature.messages.length
  const outcomeCount = signature.outcomes.length

  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const [outcomes, setOutcomes] = useState(0)
  const [playId, setPlayId] = useState(0)

  const reduce =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setShown(total)
      setOutcomes(outcomeCount)
      return
    }
    setShown(0)
    setOutcomes(0)
    setTyping(false)
    const timers = []
    let delay = 500
    for (let i = 0; i < total; i++) {
      const isAI = signature.messages[i].from === 'ai'
      if (isAI) {
        timers.push(setTimeout(() => setTyping(true), delay))
        delay += 1000
        timers.push(
          setTimeout(() => {
            setTyping(false)
            setShown(i + 1)
          }, delay),
        )
        delay += 500
      } else {
        timers.push(setTimeout(() => setShown(i + 1), delay))
        delay += 1000
      }
    }
    for (let k = 0; k < outcomeCount; k++) {
      timers.push(setTimeout(() => setOutcomes(k + 1), delay))
      delay += 550
    }
    return () => timers.forEach(clearTimeout)
  }, [inView, playId, reduce, total, outcomeCount, signature.messages])

  return (
    <section ref={ref} className="relative overflow-hidden bg-accent-soft py-section">
      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" aria-hidden />
      <div className="container-x relative">
        <SectionHeading eyebrow={signature.eyebrow} heading={signature.heading} sub={signature.body} align="center" max="max-w-2xl" className="mx-auto" />

        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* chat window */}
          <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            {/* header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-hover text-white">
                  <Bot className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <div className="text-sm font-bold text-heading">{signature.agentName}</div>
                  <div className="flex items-center gap-1.5 text-xs text-body-soft">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    {signature.status}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPlayId((n) => n + 1)}
                className="inline-flex items-center gap-1.5 rounded-pill border border-line px-3 py-1.5 text-xs font-semibold text-body transition-colors hover:border-accent/50 hover:text-accent"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Replay
              </button>
            </div>

            {/* messages */}
            <div className="flex min-h-[320px] flex-col gap-3 bg-surface-alt/40 p-5">
              {signature.messages.slice(0, shown).map((m, i) => (
                <motion.div
                  key={`${playId}-${i}`}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn('flex', m.from === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm',
                      m.from === 'user'
                        ? 'rounded-br-sm bg-accent text-white'
                        : 'rounded-bl-sm border border-line bg-white text-heading',
                    )}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-line bg-white px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* outcomes panel */}
          <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-float md:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-[90px]" aria-hidden />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90">
                <Check className="h-3.5 w-3.5 text-accent" /> Conversation outcome
              </span>
              <div className="mt-6 space-y-3">
                {signature.outcomes.map((o, i) => {
                  const done = i < outcomes
                  return (
                    <motion.div
                      key={o}
                      animate={{ opacity: done ? 1 : 0.35 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors',
                          done ? 'bg-accent text-white' : 'bg-white/10 text-white/40',
                        )}
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-sm font-semibold">{o}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {signature.note && <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-body-soft">{signature.note}</p>}
      </div>
    </section>
  )
}
