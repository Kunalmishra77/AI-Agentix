import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Linkedin, Instagram, Facebook, Twitter, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import { footer } from '../../data/site'
import Logo from './Logo'

const SOCIAL_ICONS = { LinkedIn: Linkedin, Instagram, Facebook, Twitter, WhatsApp: MessageCircle }

export default function SiteFooter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const partners = [...footer.partners, ...footer.partners]

  return (
    <footer className="border-t border-line bg-surface-alt text-body">
      {/* partner marquee */}
      <div className="border-b border-line py-10">
        <p className="container-x mb-6 text-center text-eyebrow uppercase text-body-soft">{footer.partnersCaption}</p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee-slow items-center gap-12 pr-12">
            {partners.map((p, i) => (
              <span key={`${p}-${i}`} data-asset={`partner-logo: ${p}`} className="whitespace-nowrap text-lg font-bold text-heading/30">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* main */}
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr]">
        {/* brand */}
        <div className="min-w-0">
          <Logo dark={false} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-body">{footer.brandBlurb}</p>
          <div className="mt-6 flex gap-3">
            {footer.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label] || MessageCircle
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-body transition-colors hover:border-accent hover:bg-accent hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>

        {/* link cols */}
        {footer.cols.map((col) => (
          <div key={col.title} className="min-w-0">
            <h4 className="text-sm font-bold text-heading">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-body transition-colors hover:text-accent">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* newsletter + contact */}
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-heading">{footer.newsletter.title}</h4>
          <p className="mt-4 text-sm text-body">{footer.newsletter.blurb}</p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => { e.preventDefault(); if (email) setSent(true) }}
          >
            <label className="sr-only" htmlFor="footer-email">Email</label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={footer.newsletter.placeholder}
              className="min-w-0 flex-1 rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-heading placeholder:text-body-soft focus:border-accent focus:outline-none"
            />
            <button type="submit" className="btn-primary shrink-0 px-4 py-2.5">{footer.newsletter.submit}</button>
          </form>
          {sent && <p className="mt-2 text-xs font-semibold text-accent">{footer.newsletter.success}</p>}

          <h4 className="mt-8 text-sm font-bold text-heading">{footer.contact.title}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-body">
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-accent" /><a href={`mailto:${footer.contact.email}`} className="hover:text-accent">{footer.contact.email}</a></li>
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-accent" /><a href={`tel:${footer.contact.phone.replace(/\s/g, '')}`} className="hover:text-accent">{footer.contact.phone}</a></li>
            <li className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-accent" />{footer.contact.address}</li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-4 py-6 text-xs text-body-soft md:flex-row md:items-center md:justify-between">
          <div>
            <p>© {new Date().getFullYear()} {footer.copyright}</p>
            <p className="mt-1 text-body-soft/70">{footer.entity}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footer.legal.map((l) => (
              <Link key={l.label} to={l.to} className="transition-colors hover:text-accent">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
