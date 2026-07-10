import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardCheck, MonitorPlay, Handshake, Check, Loader2, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import { types, forms, success, details } from '../../data/contact'
import { cn } from '../../lib/cn'

const TYPE_ICONS = { audit: ClipboardCheck, demo: MonitorPlay, partner: Handshake }
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

function Field({ f, value, error, onChange }) {
  const base =
    'w-full rounded-xl border bg-white px-4 py-3 text-sm text-heading transition-colors placeholder:text-body-soft focus:outline-none focus:ring-2 focus:ring-accent/20'
  const border = error ? 'border-red-400 focus:border-red-400' : 'border-line focus:border-accent'

  return (
    <div className={cn(!f.half && 'sm:col-span-2')}>
      <label htmlFor={`f-${f.key}`} className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-heading">
        {f.label}
        {f.required && <span className="text-accent">*</span>}
        {f.hint && <span className="text-xs font-normal text-body-soft">· {f.hint}</span>}
      </label>

      {f.type === 'select' ? (
        <select id={`f-${f.key}`} value={value || ''} onChange={(e) => onChange(e.target.value)} className={cn(base, border, !value && 'text-body-soft')}>
          <option value="">{f.placeholder}</option>
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : f.type === 'textarea' ? (
        <textarea id={`f-${f.key}`} rows={4} value={value || ''} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} className={cn(base, border, 'resize-none')} />
      ) : f.type === 'chips' ? (
        <div className="flex flex-wrap gap-2">
          {f.options.map((o) => {
            const arr = Array.isArray(value) ? value : []
            const on = arr.includes(o)
            return (
              <button
                type="button"
                key={o}
                onClick={() => onChange(on ? arr.filter((x) => x !== o) : [...arr, o])}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-pill border px-4 py-2.5 text-sm font-medium transition-all',
                  on ? 'border-accent bg-accent text-white shadow-orange' : 'border-line bg-white text-body hover:border-accent/50 hover:text-heading',
                )}
              >
                {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                {o}
              </button>
            )
          })}
        </div>
      ) : (
        <input id={`f-${f.key}`} type={f.type} value={value || ''} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} className={cn(base, border)} />
      )}

      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
}

export default function ContactForms() {
  const [active, setActive] = useState('audit')
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const form = forms[active]

  const switchType = (key) => {
    setActive(key); setData({}); setErrors({}); setSubmitted(false)
  }
  const setField = (key, val) => {
    setData((d) => ({ ...d, [key]: val }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const errs = {}
    form.fields.forEach((f) => {
      const v = data[f.key]
      if (f.required && (!v || (typeof v === 'string' && !v.trim()))) errs[f.key] = 'This field is required'
      else if (f.type === 'email' && v && !isEmail(v)) errs[f.key] = 'Enter a valid email address'
    })
    return errs
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      const first = document.getElementById(`f-${Object.keys(errs)[0]}`)
      first?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      first?.focus?.()
      return
    }
    setSubmitting(true)
    // No backend — simulate submission, then show success.
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1300)
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
      {/* type selector */}
      <div className="grid gap-2.5 sm:grid-cols-3">
        {types.map((t) => {
          const Icon = TYPE_ICONS[t.key]
          const on = active === t.key
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => switchType(t.key)}
              className={cn(
                'flex flex-col rounded-2xl border p-4 text-left transition-all',
                on ? 'border-accent bg-accent-soft' : 'border-line bg-white hover:border-accent/40',
              )}
            >
              <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', on ? 'bg-accent text-white' : 'bg-surface-alt text-accent')}>
                <Icon className="h-5 w-5" strokeWidth={1.9} />
              </span>
              <span className={cn('mt-3 text-sm font-bold', on ? 'text-accent' : 'text-heading')}>{t.label}</span>
              <span className="mt-1 text-xs leading-snug text-body">{t.desc}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 border-t border-line pt-6">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-10 text-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
                <CheckCircle2 className="h-9 w-9" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-heading">{success.heading}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-body">{success.body}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={details.whatsapp} target="_blank" rel="noreferrer" className="btn-primary">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
                <button type="button" onClick={() => switchType(active)} className="btn-outline">Send another</button>
              </div>
            </motion.div>
          ) : (
            <motion.form key={active} onSubmit={onSubmit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} noValidate>
              <p className="mb-5 rounded-xl bg-surface-alt px-4 py-3 text-sm leading-relaxed text-body">{form.note}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {form.fields.map((f) => (
                  <Field key={f.key} f={f} value={data[f.key]} error={errors[f.key]} onChange={(v) => setField(f.key, v)} />
                ))}
              </div>
              <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full justify-center disabled:opacity-70 sm:w-auto">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> {form.loading}</> : <>{form.submit} <ArrowRight className="h-4 w-4" /></>}
              </button>
              <p className="mt-3 text-xs text-body-soft">By submitting, you agree to be contacted about your enquiry. We never share your data.</p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
