import { Phone, Mail, MapPin, Check } from 'lucide-react'
import { details, nextSteps } from '../../data/contact'

export default function ContactAside() {
  const rows = [
    { icon: Phone, label: 'Call / WhatsApp', value: details.phone, href: details.whatsapp },
    { icon: Mail, label: 'Email', value: details.email, href: `mailto:${details.email}` },
    { icon: MapPin, label: 'Office', value: details.office, href: null },
  ]
  return (
    <div className="space-y-6">
      {/* reach us directly */}
      <div className="rounded-3xl border border-line bg-surface-alt/50 p-6 md:p-7">
        <h3 className="text-lg font-bold text-heading">Reach Us Directly</h3>
        <div className="mt-5 space-y-4">
          {rows.map((r) => {
            const Inner = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                  <r.icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <span>
                  <span className="block text-xs text-body-soft">{r.label}</span>
                  <span className="block text-sm font-semibold text-heading">{r.value}</span>
                </span>
              </>
            )
            return r.href ? (
              <a key={r.label} href={r.href} target={r.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex items-center gap-3.5">
                {Inner}
              </a>
            ) : (
              <div key={r.label} className="group flex items-center gap-3.5">{Inner}</div>
            )
          })}
        </div>
      </div>

      {/* what happens next */}
      <div className="rounded-3xl bg-ink p-6 text-white md:p-7">
        <h3 className="text-lg font-bold">What Happens Next?</h3>
        <ol className="mt-5 space-y-4">
          {nextSteps.map((s, i) => (
            <li key={s} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">{i + 1}</span>
              <span className="text-sm leading-relaxed text-ink-muted">{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-semibold text-accent">
          <Check className="h-4 w-4" /> No commitment required
        </div>
      </div>
    </div>
  )
}
