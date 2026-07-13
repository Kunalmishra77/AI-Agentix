import { clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Register the theme's custom font-size utilities so tailwind-merge treats them
// as font sizes (not colors). Without this, `cn('text-h2', 'text-heading')`
// wrongly drops `text-h2`, collapsing section headings to the base 16px.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['hero', 'display', 'h2', 'eyebrow'] }],
    },
  },
})

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
