import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, RotateCcw, Sparkles, Info } from 'lucide-react'
import { demos } from '../../data/landing'
import { PhoneFrame, Bubble } from './Mockups'
import { cn } from '../../lib/cn'
import { track } from '../../lib/analytics'

// "Watch an enquiry become a booked meeting": plays a scripted chat for the chosen
// industry while the CRM card fills in. Starts when scrolled into view.
export default function LiveDemo() {
  const [tab, setTab] = useState(0)
  const [shown, setShown] = useState(0) // messages visible
  const [typing, setTyping] = useState(false)
  const [run, setRun] = useState(0)
  const ref = useRef(null)
  const scroller = useRef(null)
  const inView = useInView(ref, { amount: 0.35 })
  const reduce = useReducedMotion()
  const demo = demos[tab]
  const total = demo.chat.length
  const done = shown >= total

  useEffect(() => { setShown(reduce ? total : 0); setTyping(false) }, [tab, run, reduce, total])

  useEffect(() => {
    if (!inView || reduce || shown >= total) return
    const next = demo.chat[shown]
    const isOut = next[0] === 'out'
    let t2
    const t1 = setTimeout(() => {
      if (isOut) {
        setTyping(true)
        t2 = setTimeout(() => { setTyping(false); setShown((n) => n + 1) }, 1100)
      } else setShown((n) => n + 1)
    }, shown === 0 ? 500 : 900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [inView, shown, total, demo, reduce])

  useEffect(() => {
    const el = scroller.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? 'auto' : 'smooth' })
  }, [shown, typing, reduce])

  // fields appear progressively as the AI learns them
  const filled = Math.ceil((Math.min(shown, total) / total) * demo.fields.length)

  const choose = (i) => { setTab(i); setRun((r) => r + 1); track('lp_demo_tab', { industry: demos[i].id }) }
  const onKey = (e) => {
    if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return
    e.preventDefault()
    const i = (tab + (e.key === 'ArrowRight' ? 1 : demos.length - 1)) % demos.length
    choose(i)
    document.getElementById(`demo-tab-${i}`)?.focus()
  }

  return (
    <div ref={ref}>
      <div role="tablist" aria-label="Choose your business" onKeyDown={onKey} className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {demos.map((d, i) => (
          <button key={d.id} id={`demo-tab-${i}`} role="tab" aria-selected={i === tab} aria-controls="demo-panel" tabIndex={i === tab ? 0 : -1}
            onClick={() => choose(i)}
            className={cn('flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all', i === tab ? 'border-heading bg-heading text-white shadow-card' : 'border-line bg-white text-heading hover:border-heading')}>
            <span aria-hidden>{d.emoji}</span> {d.label}
          </button>
        ))}
      </div>

      <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${tab}`} className="mt-10 grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <PhoneFrame name={demo.lead} sub={demo.business + ' chat'} className="max-w-[310px]">
          <div ref={scroller} className="no-scrollbar flex h-[400px] flex-col gap-2 overflow-y-auto p-3" aria-live="polite">
            <p className="mx-auto mb-1 rounded-md bg-[#FFF5C4] px-2 py-1 text-center text-[9.5px] text-body">🔒 Replies from {demo.business} are sent by its AI assistant</p>
            <div className="flex-1" />
            {demo.chat.slice(0, shown).map(([d, t]) => (
              <motion.div key={`${run}-${t}`} initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25 }}>
                <Bubble dir={d}>{t}</Bubble>
              </motion.div>
            ))}
            {typing && (
              <div className="flex justify-end" aria-label="AI is typing">
                <span className="flex gap-1 rounded-2xl rounded-tr-sm bg-[#D9FDD3] px-3 py-2.5">
                  {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-heading/50" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </span>
              </div>
            )}
          </div>
        </PhoneFrame>

        <div>
          <div className="rounded-[28px] border border-line bg-white p-5 shadow-float sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-body-soft">AI Agentix CRM · new lead</p>
              <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700')}>
                {done ? 'Qualified ✓' : 'AI qualifying…'}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-cta text-base font-bold text-white">
                {demo.lead.split(' ').map((w) => w[0]).join('')}
              </span>
              <div>
                <p className="text-lg font-semibold text-heading">{demo.lead}</p>
                <p className="text-sm text-body-soft">{demo.source}</p>
              </div>
            </div>
            <dl className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {demo.fields.map(([k, v], i) => (
                <div key={k} className="rounded-2xl border border-line bg-surface-2/60 px-4 py-3">
                  <dt className="text-[11px] font-medium text-body-soft">{k}</dt>
                  <dd className="mt-1 h-5 text-sm font-semibold text-heading">
                    <AnimatePresence mode="wait" initial={false}>
                      {i < filled ? (
                        <motion.span key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="block truncate">{v}</motion.span>
                      ) : (
                        <motion.span key="s" exit={{ opacity: 0 }} className="mt-1.5 block h-2.5 w-3/4 animate-pulse rounded-full bg-line" aria-label="pending" />
                      )}
                    </AnimatePresence>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 flex items-start gap-2 rounded-2xl bg-accent-soft/70 px-4 py-3 text-sm text-heading">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" aria-hidden />
              <span><b>AI summary:</b> {done ? demo.summary : <span className="text-body-soft">writing as the chat happens…</span>}</span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#book" className="btn-primary rounded-full px-6 py-3.5 text-[15px]">Set this up for my business <ArrowRight className="h-4 w-4" aria-hidden /></a>
            <button type="button" onClick={() => setRun((r) => r + 1)} className="btn-outline rounded-full px-5 py-3.5">
              <RotateCcw className="h-4 w-4" aria-hidden /> Replay
            </button>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-body-soft">
            <Info className="h-3.5 w-3.5 shrink-0" aria-hidden /> Sample conversation for illustration. On the call we show it with your own prices and FAQs.
          </p>
        </div>
      </div>
    </div>
  )
}
