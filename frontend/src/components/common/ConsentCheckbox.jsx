import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * Unticked-by-default consent checkbox (DPDP Act: clear affirmative action).
 * `withPolicy` appends the withdrawal + Privacy Policy line.
 */
export default function ConsentCheckbox({ id, checked, onChange, label, error, withdrawText, dark = false, small = false }) {
  const errId = error ? `${id}-error` : undefined
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <span className="relative mt-0.5 flex shrink-0">
          <input
            id={id}
            name={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={error ? true : undefined}
            aria-describedby={errId}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-body-soft bg-white transition-colors checked:border-accent-strong checked:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-1"
          />
          <Check className="pointer-events-none absolute inset-0 m-auto hidden h-3.5 w-3.5 text-white peer-checked:block" strokeWidth={3.5} aria-hidden />
        </span>
        <span className={cn(small ? 'text-xs' : 'text-[13px]', 'leading-relaxed', dark ? 'text-white/80' : 'text-body')}>
          {label}
          {withdrawText && (
            <>
              {' '}{withdrawText}{' '}
              <Link to="/privacy" className={cn('font-semibold underline underline-offset-2', dark ? 'text-white' : 'text-accent-strong')}>Privacy Policy</Link>.
            </>
          )}
        </span>
      </label>
      {error && <p id={errId} className="mt-1.5 pl-8 text-xs font-medium text-danger">{error}</p>}
    </div>
  )
}
