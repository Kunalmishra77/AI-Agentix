import { ImageIcon, PlayCircle, Sparkles } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * Labeled asset placeholder — keeps correct dimensions so real images/videos
 * drop in later without redesign. Every instance names the required asset.
 * kind: image | video | illustration | logo
 */
const ICONS = { image: ImageIcon, video: PlayCircle, illustration: Sparkles, logo: ImageIcon }

export default function Placeholder({ label, kind = 'image', className = '', dark = false, ratio }) {
  const Icon = ICONS[kind] || ImageIcon
  return (
    <div
      data-asset={label}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-card',
        dark
          ? 'border border-dashed border-white/15 bg-white/[0.04] text-white/55'
          : 'border border-dashed border-line bg-surface-2 text-body-soft',
        className,
      )}
    >
      {/* subtle hatch so placeholders read as intentional, not broken */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(242,101,34,0.05) 0 10px, transparent 10px 20px)',
        }}
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <Icon className="h-6 w-6 text-accent/70" strokeWidth={1.6} />
        <span className="text-[11px] font-medium uppercase tracking-wider">{label}</span>
      </div>
    </div>
  )
}
