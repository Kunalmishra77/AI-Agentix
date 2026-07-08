import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/** Real AGENTiX brand logo (light/orange variant, for dark backgrounds). */
export default function Logo({ className = '', imgClassName = 'h-11' }) {
  return (
    <Link to="/" aria-label="AGENTiX Home" className={cn('inline-flex items-center', className)}>
      <img src="/agentix-logo-white.png" alt="AGENTiX" className={cn('w-auto', imgClassName)} />
    </Link>
  )
}
