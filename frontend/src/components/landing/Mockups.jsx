import { motion } from 'framer-motion'
import { Phone, CheckCheck, Zap, FileText, IndianRupee, TrendingUp, Bell, UserRound } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import { cn } from '../../lib/cn'

// Illustrations for the landing page feature blocks. Sample data, labelled on the page.

const appear = (i) => ({ initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.4 }, transition: { delay: 0.15 + i * 0.35, duration: 0.35 } })

export function PhoneFrame({ name, sub = 'online', children, className }) {
  return (
    <div className={cn('relative mx-auto w-full max-w-[300px] rounded-[44px] border-[10px] border-ink bg-ink shadow-[0_30px_70px_-15px_rgba(18,20,26,0.45)]', className)}>
      <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" aria-hidden />
      <div className="overflow-hidden rounded-[34px] bg-[#EFE7DE]">
        <div className="flex items-center gap-2.5 bg-[#F7F7F7] px-4 pb-2.5 pt-9">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-[11px] font-bold text-accent-strong">{name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-heading">{name}</p>
            <p className="text-[10px] text-body-soft">{sub}</p>
          </div>
          <Phone className="h-4 w-4 text-body-soft" aria-hidden />
        </div>
        {children}
      </div>
    </div>
  )
}

export function Bubble({ dir, children, time = '10:41 PM' }) {
  const out = dir === 'out'
  return (
    <div className={cn('flex', out ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[82%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug text-heading shadow-sm', out ? 'rounded-tr-sm bg-[#D9FDD3]' : 'rounded-tl-sm bg-white')}>
        {children}
        <span className="ml-2 inline-flex items-center gap-0.5 align-bottom text-[9px] text-body-soft">
          {time}{out && <CheckCheck className="h-3 w-3 text-sky-500" aria-hidden />}
        </span>
      </div>
    </div>
  )
}

export function ChatMock() {
  const msgs = [
    ['in', 'Hi, is the 3BHK in Sector 150 still available?'],
    ['out', 'Hi Priya! Yes 🙂 3BHK homes start at ₹1.45 Cr. Would you like a site visit this weekend?'],
    ['in', 'Saturday 11 works'],
    ['out', 'Booked ✅ Saturday, 11:00 AM. Location pin 📍 below.'],
  ]
  return (
    <div className="flex items-start justify-center gap-5">
      <PhoneFrame name="Priya Nair" className="mx-0 shrink-0">
        <div className="flex min-h-[340px] flex-col justify-end gap-2 p-3">
          <p className="mx-auto mb-1 rounded-md bg-[#FFF5C4] px-2 py-1 text-center text-[9.5px] text-body">🔒 Replies are sent by the business’s AI assistant</p>
          {msgs.map(([d, t], i) => (
            <motion.div key={t} {...appear(i)}><Bubble dir={d}>{t}</Bubble></motion.div>
          ))}
          <motion.p {...appear(4)} className="mx-auto mt-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-accent-strong">✦ Lead created · visit Sat 11 AM</motion.p>
        </div>
      </PhoneFrame>
      <motion.div {...appear(2)} className="mt-24 hidden w-52 shrink-0 rounded-2xl border border-line bg-white p-3.5 shadow-float sm:block lg:hidden xl:block">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#25D366] text-white"><SiWhatsapp className="h-4 w-4" aria-hidden /></span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-body-soft">WhatsApp AI</p>
            <p className="text-[13px] font-semibold text-heading">Replied in 4 sec</p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-body">3BHK · budget ₹1.5 Cr · lead created</p>
      </motion.div>
    </div>
  )
}

export function CallMock() {
  const bars = [6, 14, 9, 22, 12, 28, 16, 10, 24, 14, 30, 12, 18, 26, 9, 20, 13, 7]
  const lines = [
    ['AI', 'Namaste Imran ji, aapne showroom ke liye fleet tracking ke baare mein enquiry ki thi. Abhi baat ho sakti hai?'],
    ['Imran', 'Haan, hamare paas 12 gaadiyan hain. Demo dikha sakte ho?'],
    ['AI', 'Bilkul. Thursday 3:30 PM theek rahega?'],
  ]
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-line bg-white shadow-float">
      <div className="flex items-start gap-3 border-b border-line p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong"><Phone className="h-5 w-5" aria-hidden /></span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-heading">AI call · Imran Shaikh</p>
          <p className="text-xs text-body-soft">Outbound · 2 min 14 sec · lead from Google Ads</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">Completed</span>
      </div>
      <div className="flex h-16 items-center justify-center gap-[5px] px-5" aria-hidden>
        {bars.map((h, i) => (
          <motion.span key={i} className={cn('w-[7px] rounded-full', i % 3 === 0 ? 'bg-accent' : 'bg-accent/30')}
            initial={{ height: 6 }} whileInView={{ height: [6, h * 1.4, h * 0.6, h * 1.2] }} viewport={{ once: false }}
            transition={{ duration: 1.6, repeat: Infinity, repeatType: 'mirror', delay: i * 0.05 }} />
        ))}
      </div>
      <div className="space-y-2.5 px-5 pb-5 text-[13px] leading-relaxed">
        {lines.map(([who, t], i) => (
          <motion.p key={t} {...appear(i)}><span className={cn('font-semibold', who === 'AI' ? 'text-accent-strong' : 'text-heading')}>{who}:</span> <span className="text-body">{t}</span></motion.p>
        ))}
      </div>
      <dl className="grid grid-cols-3 divide-x divide-line border-t border-line text-center">
        {[['Interest', 'High'], ['Fleet size', '12'], ['Demo', 'Thu 3:30 PM']].map(([k, v]) => (
          <div key={k} className="py-3">
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-body-soft">{k}</dt>
            <dd className="mt-0.5 text-sm font-bold text-heading">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function PipelineMock() {
  const cols = [
    { t: 'New', n: 2, cards: [['Priya Nair', 'Google Ads', '₹1.2L'], ['Arjun Mehta', 'IndiaMART', '₹85K']] },
    { t: 'Contacted', n: 2, cards: [['Sneha Reddy', 'Meta Ads', '₹2.4L'], ['Imran Shaikh', 'AI call', '₹60K']] },
    { t: 'Meeting', n: 1, cards: [['Kavya Iyer', 'WhatsApp', '₹3.1L']] },
  ]
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-float">
        <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-2.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span className="ml-3 text-[11px] text-body-soft">Pipeline · all sources</span>
        </div>
        <div className="grid grid-cols-3 gap-2.5 p-3.5">
          {cols.map((c, ci) => (
            <div key={c.t} className="rounded-2xl bg-surface-2 p-2">
              <p className="flex items-center justify-between px-1 pb-2 text-[11px] font-bold text-heading">{c.t} <span className="rounded-full bg-white px-1.5 text-body-soft">{c.n}</span></p>
              <div className="space-y-2">
                {c.cards.map(([n, s, v], i) => (
                  <motion.div key={n} {...appear(ci + i)} className={cn('rounded-xl border bg-white p-2', ci === 2 ? 'border-accent/50 ring-2 ring-accent/15' : 'border-line')}>
                    <p className="truncate text-[11.5px] font-semibold text-heading">{n}</p>
                    <div className="mt-1 flex items-center justify-between gap-1">
                      <span className="truncate rounded-md bg-surface-2 px-1.5 py-0.5 text-[9.5px] text-body">{s}</span>
                      <span className="text-[10.5px] font-bold text-heading">{v}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <motion.div {...appear(3)} className="relative z-10 -mt-6 ml-auto mr-2 w-64 max-w-[85%] rounded-2xl border border-line bg-white p-3.5 shadow-float">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-accent-strong"><Zap className="h-3.5 w-3.5" aria-hidden /> Automation</p>
        <p className="mt-1.5 text-[12px] text-body">When stage → <b className="text-heading">Meeting booked</b></p>
        <ul className="mt-1.5 space-y-1 text-[12px] text-heading">
          <li className="flex items-center gap-1.5"><Bell className="h-3.5 w-3.5 text-accent-strong" aria-hidden /> Send WhatsApp reminder</li>
          <li className="flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5 text-accent-strong" aria-hidden /> Assign by round-robin</li>
        </ul>
      </motion.div>
    </div>
  )
}

export function OpsMock() {
  const inv = [['INV-0142', 'Mehta Exports', '₹84,200', 'Paid'], ['INV-0143', 'Shree Traders', '₹1,12,500', 'Reminder sent'], ['INV-0144', 'Kavya Foods', '₹46,900', 'Sent']]
  const tone = { Paid: 'bg-emerald-50 text-emerald-700', 'Reminder sent': 'bg-amber-50 text-amber-700', Sent: 'bg-sky-50 text-sky-700' }
  const chart = [38, 52, 44, 61, 58, 72, 80]
  return (
    <div className="mx-auto grid w-full max-w-lg gap-3">
      <div className="rounded-3xl border border-line bg-white p-4 shadow-float">
        <p className="flex items-center gap-2 text-[13px] font-semibold text-heading"><FileText className="h-4 w-4 text-accent-strong" aria-hidden /> Invoices · this week</p>
        <ul className="mt-3 divide-y divide-line">
          {inv.map(([no, who, amt, st], i) => (
            <motion.li key={no} {...appear(i)} className="flex items-center gap-3 py-2.5 text-[12.5px]">
              <span className="w-[68px] shrink-0 font-mono text-[11px] text-body-soft">{no}</span>
              <span className="min-w-0 flex-1 truncate font-medium text-heading">{who}</span>
              <span className="font-semibold text-heading">{amt}</span>
              <span className={cn('hidden rounded-full px-2 py-0.5 text-[10.5px] font-semibold sm:inline', tone[st])}>{st}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <motion.div {...appear(2)} className="rounded-3xl border border-line bg-white p-4 shadow-card">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-body-soft"><IndianRupee className="h-3.5 w-3.5" aria-hidden /> Collected</p>
          <p className="mt-1 text-xl font-bold text-heading">₹8.4L</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-700"><TrendingUp className="h-3.5 w-3.5" aria-hidden /> on time this month</p>
        </motion.div>
        <motion.div {...appear(3)} className="rounded-3xl border border-line bg-ink p-4 text-white shadow-card">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Morning MIS · 7:00 AM</p>
          <div className="mt-3 flex h-12 items-end gap-1.5" aria-hidden>
            {chart.map((h, i) => <span key={i} className={cn('flex-1 rounded-t', i === chart.length - 1 ? 'bg-accent' : 'bg-white/25')} style={{ height: `${h}%` }} />)}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export const MOCKS = { chat: ChatMock, call: CallMock, pipeline: PipelineMock, ops: OpsMock }
