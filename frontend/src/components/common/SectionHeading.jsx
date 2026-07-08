import { cn } from '../../lib/cn'
import Reveal from './Reveal'

/**
 * ADDEPTO-style section header: small orange eyebrow, large black heading,
 * optional dark-gray sub. Left-aligned by default (ADDEPTO convention).
 */
export default function SectionHeading({ eyebrow, heading, sub, align = 'left', tone = 'light', className = '', max = 'max-w-3xl' }) {
  const dark = tone === 'dark'
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
