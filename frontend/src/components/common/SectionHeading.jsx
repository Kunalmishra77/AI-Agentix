import { cn } from '../../lib/cn'
import Reveal from './Reveal'

/**
 * ADDEPTO-style section header: small orange eyebrow, large black heading,
 * optional dark-gray sub. Left-aligned by default (ADDEPTO convention).
 *
 * variant="stacked" (Homepage hierarchy): the label (`eyebrow`) becomes the
 * large primary title, and `heading` becomes the smaller supporting subtitle
 * directly below it, with any `sub` kept as fine supporting copy. Other pages
 * keep the default treatment untouched.
 */
export default function SectionHeading({ eyebrow, heading, sub, align = 'left', tone = 'light', variant = 'default', className = '', max = 'max-w-3xl' }) {
  const dark = tone === 'dark'

  if (variant === 'stacked') {
    return (
      <Reveal className={cn('flex flex-col', align === 'center' && 'items-center text-center', className)}>
        <span className={cn('mb-5 h-1 w-10 rounded-full bg-accent', align === 'center' && 'mx-auto')} aria-hidden />
        {eyebrow && (
          <h2 className={cn('text-h2', dark ? 'text-white' : 'text-heading', max)}>{eyebrow}</h2>
        )}
        {heading && (
          <p className={cn('mt-3 text-lg font-semibold md:text-xl', dark ? 'text-white/75' : 'text-body', max)}>
            {heading}
          </p>
        )}
        {sub && (
          <p className={cn('mt-3 text-sm leading-relaxed md:text-base', dark ? 'text-ink-muted' : 'text-body-soft', max)}>
            {sub}
          </p>
        )}
      </Reveal>
    )
  }

  return (
    <Reveal className={cn('flex flex-col', align === 'center' && 'items-center text-center', className)}>
      {eyebrow && (
        <span className="eyebrow mb-4">
          <span className="h-px w-6 bg-accent" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className={cn('text-h2', dark ? 'text-white' : 'text-heading', max)}>{heading}</h2>
      {sub && (
        <p className={cn('mt-4 text-base md:text-lg leading-relaxed', dark ? 'text-ink-muted' : 'text-body', max)}>
          {sub}
        </p>
      )}
    </Reveal>
  )
}
