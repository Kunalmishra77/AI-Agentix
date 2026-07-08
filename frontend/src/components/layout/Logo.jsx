import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/** AGENTiX wordmark — A + i in orange, GENT + X in white/ink (per brand). */
export default function Logo({ dark = true, className = '' }) {
  const base = dark ? 'text-white' : 'text-heading'
  return (
    <Link to="/" aria-label="AGENTiX Home" className={cn('inline-flex items-center', className)}>
      <span className={cn('font-display text-xl font-extrabold tracking-tight', base)}>
        <span className="text-accent">A</span>GENT<span className="text-accent">i</span>X
      </span>
    </Link>
  )
}
