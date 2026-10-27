import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ClipboardCheck, MonitorPlay, Handshake, Check, Loader2, ArrowRight, AlertCircle, MessageCircle, Mail, RotateCcw } from 'lucide-react'
import { types, forms, details } from '../../data/contact'
import { consent as consentText } from '../../data/consent'
import { submitLead, trackLead, isEmail, isPhone, LeadError } from '../../lib/leads'
import ConsentCheckbox from '../common/ConsentCheckbox'
import { cn } from '../../lib/cn'

const TYPE_ICONS = { audit: ClipboardCheck, demo: MonitorPlay, partner: Handshake }
// URL hash → form tab, so /contact#partnerships or #demo opens the right form (AGX-017)
const HASH_TO_TYPE = { audit: 'audit', demo: 'demo', partner: 'partner', partnership: 'partner', partnerships: 'partner' }
const AUTOCOMPLETE = { name: 'name', phone: 'tel', email: 'email', company: 'organization', agency: 'organization', website: 'url' }

const todayLocal = () => {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

function Field({ f, value, error, onChange }) {
  const id = `f-${f.key}`
  const errId = error ? `${id}-error` : undefined
  const base =
    'w-full rounded-xl border bg-white px-4 py-3 text-base text-heading transition-colors placeholder:text-body-soft focus:outline-none focus:ring-2 focus:ring-accent/20 sm:text-sm'
  const border = error ? 'border-danger focus:border-danger' : 'border-line focus:border-accent'
  const common = { id, name: f.key, 'aria-invalid': error ? true : undefined, 'aria-describedby': errId, 'aria-required': f.required || undefined }

  return (
    <div className={cn(!f.half && 'sm:col-span-2')}>
      {f.type === 'chips' ? (
        <span id={`${id}-label`} className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-heading">
          {f.label}
          {f.hint && <span className="text-xs font-normal text-body-soft">· {f.hint}</span>}
        </span>
      ) : (
        <label htmlFor={id} className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-heading">
          {f.label}
          {f.required && <span className="text-accent" aria-hidden>*</span>}
          {f.required && <span className="sr-only">(required)</span>}
          {f.hint && <span className="text-xs font-normal text-body-soft">· {f.hint}</span>}
        </label>
      )}

      {f.type === 'select' ? (
        <select {...common} value={value || ''} onChange={(e) => onChange(e.target.value)} className={cn(base, border, !value && 'text-body-soft')}>
          <option value="">{f.placeholder}</option>
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : f.type === 'textarea' ? (
        <textarea {...common} rows={4} maxLength={2000} value={value || ''} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} className={cn(base, border, 'resize-none')} />
      ) : f.type === 'chips' ? (
        <div role="group" aria-labelledby={`${id}-label`} className="flex flex-wrap gap-2">
          {f.options.map((o) => {
            const arr = Array.isArray(value) ? value : []
            const on = arr.includes(o)
            return (
              <button
                type="button"
                key={o}
                aria-pressed={on}
                onClick={() => onChange(on ? arr.filter((x) => x !== o) : [...arr, o])}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-pill border px-4 py-2.5 text-sm font-medium transition-all',
                  on ? 'border-accent-cta bg-accent-cta text-white shadow-orange' : 'border-line bg-white text-body hover:border-accent/50 hover:text-heading',
                )}
              >
                {on && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
                {o}
              </button>
            )
          })}
        </div>
      ) : (
        <input
          {...common}
          type={f.type}
          value={value || ''}
          placeholder={f.placeholder}
          autoComplete={AUTOCOMPLETE[f.key] || 'off'}
          inputMode={f.type === 'tel' ? 'tel' : undefined}
          maxLength={f.type === 'url' ? 300 : 150}
          min={f.type === 'date' ? todayLocal() : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={cn(base, border)}
        />
      )}

      {error && <p id={errId} className="mt-1 text-xs font-medium text-danger">{error}</p>}
    </div>
  )
}

export default function ContactForms() {
  const { hash } = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState(() => HASH_TO_TYPE[hash.slice(1)] || 'audit')
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [agree, setAgree] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [failure, setFailure] = useState('')
  const inFlight = useRef(false)
  const startedAt = useRef(Date.now())
  const hpRef = useRef(null)
  const wrapRef = useRef(null)
  const summaryRef = useRef(null)

  const form = forms[active]

  // Follow hash changes (footer "Partner With Us" while already on /contact).
  useEffect(() => {
    const t = HASH_TO_TYPE[hash.slice(1)]
    if (!t) return
    setActive(t)
    const id = setTimeout(() => wrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120)
    return () => clearTimeout(id)
  }, [hash])

  const switchType = (key) => {
    if (key === active) return
    setActive(key); setData({}); setErrors({}); setFailure('')
  }
  const setField = (key, val) => {
    setData((d) => ({ ...d, [key]: val }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
    if (failure) setFailure('')
  }

  const validate = () => {
    const errs = {}
    form.fields.forEach((f) => {
      const v = data[f.key]
      const empty = !v || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && !v.length)
      if (f.required && empty) errs[f.key] = `Please enter your ${f.label.toLowerCase()}.`
      else if (empty) return
      else if (f.type === 'email' && !isEmail(v.trim())) errs[f.key] = 'Enter a valid email address, e.g. name@company.com'
      else if (f.type === 'tel' && !isPhone(v)) errs[f.key] = 'Enter a valid phone number with 7–15 digits, e.g. +91 98XXX XXXXX'
      else if (f.type === 'date' && v < todayLocal()) errs[f.key] = 'Please pick today or a future date.'
    })
    if (!agree) errs.consent = consentText.required
    return errs
  }

  const focusFirst = (errs) => {
    const key = Object.keys(errs).find((k) => errs[k])
    const el = document.getElementById(key === 'consent' ? 'consent-enquiry' : `f-${key}`)
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    el?.focus?.({ preventScroll: true })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (inFlight.current) return // double-click / double-tap guard
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      focusFirst(errs)
      return
    }
    const fields = {}
    for (const f of form.fields) {
      const v = data[f.key]
      if (v != null && v !== '' && !(Array.isArray(v) && !v.length)) fields[f.key] = typeof v === 'string' ? v.trim() : v
    }

    inFlight.current = true
    setSubmitting(true)
    setFailure('')
    try {
      await submitLead(active, fields, { consent: agree, marketing, startedAt: startedAt.current, hp: hpRef.current?.value || '' })
      trackLead(active)
      const first = (fields.name || '').split(/\s+/)[0]
      // Same tab; replace so Back/refresh never re-posts the form.
      navigate(`/thank-you?type=${active}${first ? `&n=${encodeURIComponent(first)}` : ''}`, { replace: true })
    } catch (err) {
      const fieldErrors = err instanceof LeadError && err.fieldErrors
      if (fieldErrors && Object.keys(fieldErrors).length) {
        setErrors(fieldErrors)
        focusFirst(fieldErrors)
      }
      setFailure(err.message || 'Something went wrong. Please try again.')
      requestAnimationFrame(() => summaryRef.current?.focus())
    } finally {
      inFlight.current = false
      setSubmitting(false)
    }
  }

  const errorList = Object.entries(errors).filter(([, v]) => v)

  return (
    <div ref={wrapRef} id="enquiry" className="scroll-mt-24 rounded-3xl border border-line bg-white p-6 shadow-card md:p-8">
      {/* form type selector */}
      <div role="radiogroup" aria-label="What would you like to do?" className="grid gap-2.5 sm:grid-cols-3">
        {types.map((t) => {
          const Icon = TYPE_ICONS[t.key]
          const on = active === t.key
          return (
            <button
              key={t.key}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => switchType(t.key)}
              className={cn(
                'flex flex-col rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                on ? 'border-accent bg-accent-soft' : 'border-line bg-white hover:border-accent/40',
              )}
            >
              <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', on ? 'bg-accent-cta text-white' : 'bg-surface-alt text-accent')}>
                <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />
              </span>
              <span className={cn('mt-3 text-sm font-bold', on ? 'text-accent' : 'text-heading')}>{t.label}</span>
              <span className="mt-1 text-xs leading-snug text-body">{t.desc}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 border-t border-line pt-6">
        <motion.form key={active} onSubmit={onSubmit} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} noValidate aria-busy={submitting}>
          <p className="mb-5 rounded-xl bg-surface-alt px-4 py-3 text-sm leading-relaxed text-body">{form.note}</p>

          {/* error summary (validation or server) */}
          <div ref={summaryRef} tabIndex={-1} role="alert" aria-live="assertive" className="outline-none">
            {(failure || errorList.length > 1) && (
              <div className="mb-5 rounded-xl border border-danger/30 bg-red-50 px-4 py-3 text-sm text-danger">
                <p className="flex items-start gap-2 font-semibold">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {failure || `Please fix ${errorList.length} fields below.`}
                </p>
                {failure && (
                  <div className="mt-3 flex flex-wrap gap-2 pl-6">
                    <button type="submit" disabled={submitting} className="inline-flex items-center gap-1.5 rounded-lg bg-danger px-3 py-1.5 text-xs font-semibold text-white">
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Try again
                    </button>
                    <a href={details.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-danger/30 bg-white px-3 py-1.5 text-xs font-semibold text-danger">
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden /> WhatsApp us
                    </a>
                    <a href={`mailto:${details.email}`} className="inline-flex items-center gap-1.5 rounded-lg border border-danger/30 bg-white px-3 py-1.5 text-xs font-semibold text-danger">
                      <Mail className="h-3.5 w-3.5" aria-hidden /> Email us
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {form.fields.map((f) => (
              <Field key={f.key} f={f} value={data[f.key]} error={errors[f.key]} onChange={(v) => setField(f.key, v)} />
            ))}
          </div>

          {/* honeypot — hidden from people, bots fill it */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="f-hp-company-site">Leave this empty</label>
            <input ref={hpRef} id="f-hp-company-site" name="company_site" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-6 space-y-3 rounded-xl border border-line bg-surface-alt/60 p-4">
            <ConsentCheckbox
              id="consent-enquiry"
              checked={agree}
              onChange={(v) => { setAgree(v); if (errors.consent) setErrors((e) => ({ ...e, consent: undefined })) }}
              label={<>{consentText.enquiry} <span className="text-accent" aria-hidden>*</span></>}
              withdrawText={consentText.withdraw}
              error={errors.consent}
            />
            <ConsentCheckbox id="consent-marketing" checked={marketing} onChange={setMarketing} label={consentText.marketing} small />
          </div>

          <button type="submit" disabled={submitting} aria-disabled={submitting} className="btn-primary mt-6 w-full justify-center disabled:opacity-80 sm:w-auto">
            {submitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {form.loading}</> : <>{form.submit} <ArrowRight className="h-4 w-4" aria-hidden /></>}
          </button>
          <p className="mt-3 text-xs leading-relaxed text-body-soft">
            We use your details only for this enquiry (and updates, if you opted in). We never sell your data.
          </p>
        </motion.form>
      </div>
    </div>
  )
}
