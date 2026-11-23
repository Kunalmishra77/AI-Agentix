import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Loader2, Lock, MessageCircle } from 'lucide-react'
import ConsentCheckbox from '../common/ConsentCheckbox'
import { consent as consentText } from '../../data/consent'
import { CALL_SLOTS, NEEDS, LP_THANKS } from '../../data/landing'
import { submitLead, trackLead, LeadError, isEmail, isPhone } from '../../lib/leads'
import { track } from '../../lib/analytics'
import { whatsappLink } from '../../data/site'
import { cn } from '../../lib/cn'

// ---- dates and slots in India time, whatever the visitor's clock says
const IST_OFFSET = 5.5 * 3600_000
const istNow = () => new Date(Date.now() + IST_OFFSET) // read with getUTC*
const iso = (d) => d.toISOString().slice(0, 10)
const slotMinutes = (s) => {
  const [, h, m, ap] = s.match(/^(\d+):(\d+) (AM|PM)$/)
  return ((Number(h) % 12) + (ap === 'PM' ? 12 : 0)) * 60 + Number(m)
}
const WD = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const LONG_WD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// Next 14 days; Sundays closed; today only if a slot ≥ 60 min away is left.
function buildDays() {
  const now = istNow()
  const nowMin = now.getUTCHours() * 60 + now.getUTCMinutes()
  const days = []
  for (let i = 0; i < 14; i++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + i))
    const closed = d.getUTCDay() === 0
    const minMin = i === 0 ? nowMin + 60 : -1
    const slots = CALL_SLOTS.map((s) => ({ s, ok: !closed && slotMinutes(s) >= minMin }))
    days.push({ key: iso(d), wd: WD[d.getUTCDay()], day: d.getUTCDate(), month: MONTHS[d.getUTCMonth()], long: `${LONG_WD[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`, closed, slots, open: slots.some((x) => x.ok) })
  }
  return days
}

const EMPTY = { name: '', phone: '', email: '', company: '' }

export default function BookingCard({ id = 'book', compact = false }) {
  const navigate = useNavigate()
  const days = useMemo(buildDays, [])
  const firstOpen = days.findIndex((d) => d.open)
  const [page, setPage] = useState(0) // 7 days per page
  const [day, setDay] = useState(days[firstOpen]?.key)
  const [slot, setSlot] = useState('')
  const [step, setStep] = useState(1)
  const [values, setValues] = useState(EMPTY)
  const [need, setNeed] = useState([])
  const [agree, setAgree] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [serverMsg, setServerMsg] = useState('')
  const startedAt = useRef(Date.now())
  const inFlight = useRef(false)
  const hp = useRef(null)
  const headingRef = useRef(null)

  const visible = days.slice(page * 7, page * 7 + 7)
  const current = days.find((d) => d.key === day)

  const pickDay = (d) => { if (!d.open) return; setDay(d.key); setSlot('') }
  const goDetails = () => {
    if (!slot) return
    setStep(2)
    track('lp_slot_selected', { slot })
    requestAnimationFrame(() => headingRef.current?.focus())
  }

  const set = (k) => (e) => { setValues((v) => ({ ...v, [k]: e.target.value })); if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined })) }
  const toggleNeed = (n) => setNeed((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]))

  function validate() {
    const e = {}
    if (!values.name.trim() || values.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!isPhone(values.phone)) e.phone = 'Please enter a valid mobile number.'
    if (!isEmail(values.email.trim())) e.email = 'Please enter a valid email address.'
    if (!values.company.trim()) e.company = 'Please enter your business name or website.'
    if (!agree) e.consent = consentText.required
    return e
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (inFlight.current) return
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0]
      document.getElementById(`${id}-${first}`)?.focus()
      return
    }
    inFlight.current = true
    setStatus('sending')
    setServerMsg('')
    try {
      const fields = { ...Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim()])), need, date: day, callSlot: slot }
      const phone = fields.phone.replace(/[\s\-().]/g, '')
      if (/^[6-9]\d{9}$/.test(phone)) fields.phone = `+91${phone}`
      const res = await submitLead('lp', fields, { consent: agree, startedAt: startedAt.current, hp: hp.current?.value || '' })
      trackLead('lp')
      try { sessionStorage.setItem('agx_lp_lead', JSON.stringify({ id: res.id, at: Date.now() })) } catch { /* conversion fires once anyway */ }
      const first = fields.name.split(/\s+/)[0]
      const q = new URLSearchParams({ n: first, d: current?.long || day, s: slot })
      navigate(`${LP_THANKS}?${q}`, { replace: true })
    } catch (err) {
      inFlight.current = false
      setStatus('error')
      if (err instanceof LeadError && err.fieldErrors) {
        const fe = { ...err.fieldErrors }
        if (fe.date || fe.callSlot) { setStep(1); setSlot('') }
        setErrors(fe)
      }
      setServerMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  const input = (k, label, props) => (
    <div className={props.half ? '' : 'sm:col-span-2'}>
      <label htmlFor={`${id}-${k}`} className="mb-1.5 block text-[13px] font-semibold text-heading">
        {label} <span className="text-danger" aria-hidden>*</span>
      </label>
      <div className={cn('flex overflow-hidden rounded-xl border bg-white transition-colors focus-within:border-accent-strong focus-within:ring-2 focus-within:ring-accent/20', errors[k] ? 'border-danger' : 'border-line')}>
        {props.prefix && <span className="flex items-center border-r border-line bg-surface-2 px-3 text-sm font-medium text-body">{props.prefix}</span>}
        <input
          id={`${id}-${k}`}
          name={k}
          value={values[k]}
          onChange={set(k)}
          required
          aria-invalid={errors[k] ? true : undefined}
          aria-describedby={errors[k] ? `${id}-${k}-err` : undefined}
          className="w-full min-w-0 bg-transparent px-3.5 py-3 text-[15px] text-heading outline-none placeholder:text-body-soft/70"
          {...props.attrs}
        />
      </div>
      {errors[k] && <p id={`${id}-${k}-err`} className="mt-1 text-xs font-medium text-danger">{errors[k]}</p>}
    </div>
  )

  return (
    <div id={id} className={cn('relative scroll-mt-24 rounded-[28px] border border-white/70 bg-white/80 p-2 shadow-[0_30px_80px_-20px_rgba(18,20,26,0.25)] backdrop-blur-xl', compact && 'shadow-card')}>
      <div className="rounded-[22px] border border-line bg-white p-5 sm:p-7">
        {/* stepper */}
        <ol className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.12em]" aria-label="Booking steps">
          <li className={cn(step === 1 ? 'text-heading' : 'text-body-soft')} aria-current={step === 1 ? 'step' : undefined}>1. Pick a time</li>
          <li aria-hidden className="h-px flex-1 bg-line" />
          <li className={cn(step === 2 ? 'text-heading' : 'text-body-soft')} aria-current={step === 2 ? 'step' : undefined}>2. Your details</li>
        </ol>

        <AnimatePresence mode="wait" initial={false}>
          {step === 1 ? (
            <motion.div key="s1" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}>
              <h2 className="mt-5 font-display text-[22px] font-bold leading-tight text-heading sm:text-2xl">Book your free AI call</h2>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-body">
                <Clock3 className="h-4 w-4 text-body-soft" aria-hidden /> 30 min · with our automation team · times in IST
              </p>

              <div className="mt-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-heading">{visible[0]?.month} {new Date().getFullYear()}</p>
                <div className="flex gap-1.5">
                  <button type="button" onClick={() => setPage(0)} disabled={page === 0} aria-label="Previous week" className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-heading transition hover:border-heading disabled:opacity-30">
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                  </button>
                  <button type="button" onClick={() => setPage(1)} disabled={page === 1} aria-label="Next week" className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-heading transition hover:border-heading disabled:opacity-30">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>

              <div role="radiogroup" aria-label="Day" className="mt-3 grid grid-cols-7 gap-1.5">
                {visible.map((d) => {
                  const on = d.key === day
                  return (
                    <button
                      key={d.key}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      aria-label={d.closed ? `${d.long}, closed` : d.open ? d.long : `${d.long}, no slots left`}
                      disabled={!d.open}
                      onClick={() => pickDay(d)}
                      className={cn(
                        'flex flex-col items-center rounded-xl border py-2 transition-all',
                        on ? 'border-accent-cta bg-accent-cta text-white shadow-orange' : 'border-line bg-white text-heading hover:border-heading',
                        !d.open && 'cursor-not-allowed border-dashed bg-surface-2 text-body-soft/60 hover:border-line',
                      )}
                    >
                      <span className={cn('text-[10px] font-semibold', on ? 'text-white/85' : 'text-body-soft')}>{d.wd}</span>
                      <span className="text-lg font-bold leading-tight">{d.day}</span>
                    </button>
                  )
                })}
              </div>

              <p className="mt-4 text-sm font-semibold text-heading">{current?.long}</p>
              <div role="radiogroup" aria-label="Time" className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {current?.slots.filter((x) => x.ok).map(({ s }) => {
                  const on = s === slot
                  return (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setSlot(s)}
                      className={cn('rounded-xl border py-2.5 text-sm font-semibold transition-all', on ? 'border-heading bg-heading text-white' : 'border-line bg-white text-heading hover:border-heading')}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>

              <button type="button" onClick={goDetails} disabled={!slot} className="btn-primary mt-5 w-full rounded-full py-3.5 text-[15px] disabled:bg-body-soft/40 disabled:shadow-none">
                {slot ? <>Continue — {current?.wd.charAt(0) + current?.wd.slice(1).toLowerCase()} {current?.day}, {slot} <ArrowRight className="h-4 w-4" aria-hidden /></> : 'Select a time to continue'}
              </button>
            </motion.div>
          ) : (
            <motion.form key="s2" noValidate onSubmit={onSubmit} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.22 }}>
              <button type="button" onClick={() => setStep(1)} className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent-strong transition hover:bg-accent-ring">
                <CalendarDays className="h-4 w-4" aria-hidden /> {current?.long}, {slot} IST · Change
              </button>
              <h2 ref={headingRef} tabIndex={-1} className="mt-3 font-display text-[22px] font-bold leading-tight text-heading outline-none">Where should we reach you?</h2>

              <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                {input('name', 'Full name', { half: true, attrs: { autoComplete: 'name', placeholder: 'Your name', maxLength: 100 } })}
                {input('phone', 'Mobile / WhatsApp', { half: true, prefix: '+91', attrs: { type: 'tel', inputMode: 'tel', autoComplete: 'tel-national', placeholder: '98XXX XXXXX', maxLength: 16 } })}
                {input('email', 'Work email', { attrs: { type: 'email', inputMode: 'email', autoComplete: 'email', placeholder: 'you@company.com', maxLength: 254 } })}
                {input('company', 'Business name or website', { attrs: { autoComplete: 'organization', placeholder: 'e.g. Sharma Realty or sharmarealty.in', maxLength: 150 } })}
              </div>

              <fieldset className="mt-4">
                <legend className="mb-2 text-[13px] font-semibold text-heading">What would you like to automate? <span className="font-normal text-body-soft">(optional)</span></legend>
                <div className="flex flex-wrap gap-2">
                  {NEEDS.map((n) => {
                    const on = need.includes(n)
                    return (
                      <button key={n} type="button" aria-pressed={on} onClick={() => toggleNeed(n)}
                        className={cn('rounded-full border px-3 py-1.5 text-[13px] font-medium transition-all', on ? 'border-accent-cta bg-accent-soft text-accent-strong' : 'border-line bg-white text-body hover:border-heading')}>
                        {n}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {/* bots fill hidden fields; people never see this */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${id}-site`}>Leave this empty</label>
                <input id={`${id}-site`} ref={hp} name="company_site" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="mt-4">
                <ConsentCheckbox id={`${id}-consent`} checked={agree} onChange={(v) => { setAgree(v); if (errors.consent) setErrors((x) => ({ ...x, consent: undefined })) }} label={consentText.enquiry} withdrawText={consentText.withdraw} error={errors.consent} small />
              </div>

              {status === 'error' && serverMsg && (
                <div role="alert" className="mt-4 rounded-xl border border-danger/30 bg-red-50 p-3 text-sm text-danger">
                  {serverMsg}{' '}
                  <a href={whatsappLink('Hi, I tried to book a free AI call on your website.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold underline">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Book on WhatsApp instead
                  </a>
                </div>
              )}

              <button type="submit" disabled={status === 'sending'} className="btn-primary mt-5 w-full rounded-full py-3.5 text-[15px]">
                {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Booking your call…</> : <>Confirm my free call <ArrowRight className="h-4 w-4" aria-hidden /></>}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-body-soft">
                <Lock className="h-3.5 w-3.5" aria-hidden /> We never share your details. No spam.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
