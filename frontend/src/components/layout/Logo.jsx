import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/**
 * Real AGENTiX brand logo.
 * `dark` = sitting on a DARK background -> use the light/white logo.
 * `dark={false}` = on a LIGHT background -> use the dark logo.
 */
export default function Logo({ dark = true, className = '', imgClassName = 'h-11' }) {
  const src = dark ? '/agentix-logo-white.png' : '/agentix-logo-dark.png'
  return (
    <Link to="/" aria-label="AGENTiX Home" className={cn('inline-flex items-center', className)}>
      <img src={src} alt="AGENTiX" className={cn('w-auto', imgClassName)} />
    </Link>
  )
}
