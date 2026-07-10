import { cn } from '../../lib/cn'

/**
 * Section wrapper — enforces the ADDEPTO 90px vertical rhythm and 1280px
 * container. `tone` sets the surface: white | alt (light gray) | dark (ink).
 */
const TONES = {
  white: 'bg-surface text-body',
  alt: 'bg-surface-alt text-body',
  dark: 'bg-ink text-ink-muted',
}

export default function Section({ id, tone = 'white', className = '', containerClassName = '', children, full = false }) {
  return (
    <section id={id} className={cn('py-[70px] md:py-section 2xl:py-[112px]', TONES[tone], className)}>
      {full ? children : <div className={cn('container-x', containerClassName)}>{children}</div>}
    </section>
  )
}
