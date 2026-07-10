import {
  SiOpenai, SiAnthropic, SiGooglegemini, SiMeta, SiMistralai, SiPerplexity,
  SiHuggingface, SiLangchain, SiNvidia, SiGooglecloud, SiN8N, SiZapier, SiSlack, SiHubspot,
} from 'react-icons/si'
import { platforms } from '../../data/home'

// Official brand marks (Simple Icons via react-icons) — inline SVG, no image
// assets, crisp at any DPI. Default muted monochrome; each lights up in its brand
// colour on hover. AWS / Azure / Groq were removed from Simple Icons upstream —
// add local SVGs to this list later if needed.
const LOGOS = [
  { name: 'OpenAI', Icon: SiOpenai, color: '#412991' },
  { name: 'Anthropic', Icon: SiAnthropic, color: '#CC785C' },
  { name: 'Google Gemini', Icon: SiGooglegemini, color: '#4285F4' },
  { name: 'Meta AI', Icon: SiMeta, color: '#0081FB' },
  { name: 'Mistral AI', Icon: SiMistralai, color: '#FA520F' },
  { name: 'Perplexity', Icon: SiPerplexity, color: '#20808D' },
  { name: 'Hugging Face', Icon: SiHuggingface, color: '#FF9D00' },
  { name: 'LangChain', Icon: SiLangchain, color: '#1C3C3C' },
  { name: 'NVIDIA', Icon: SiNvidia, color: '#76B900' },
  { name: 'Google Cloud', Icon: SiGooglecloud, color: '#4285F4' },
  { name: 'n8n', Icon: SiN8N, color: '#EA4B71' },
  { name: 'Zapier', Icon: SiZapier, color: '#FF4F00' },
  { name: 'Slack', Icon: SiSlack, color: '#4A154B' },
  { name: 'HubSpot', Icon: SiHubspot, color: '#FF7A59' },
]

function LogoItem({ name, Icon, color }) {
  return (
    <span
      title={name}
      style={{ color }}
      className="flex shrink-0 items-center transition-transform duration-300 hover:scale-110"
    >
      <Icon aria-label={name} className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
    </span>
  )
}

export default function PlatformMarquee() {
  // Track = two identical halves; each half repeats the list so it is always wider
  // than the viewport (seamless -50% loop with no gap, even on ultra-wide / 4K).
  const half = [...LOGOS, ...LOGOS]
  const row = [...half, ...half]

  return (
    <section className="bg-surface py-12 md:py-14">
      <div className="container-x flex flex-col items-center gap-6 md:flex-row md:gap-10">
        <p className="shrink-0 text-center text-sm font-semibold text-heading md:max-w-[200px] md:text-left">
          {platforms.label}
        </p>

        <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max items-center gap-10 pr-10 will-change-transform animate-marquee-slow group-hover:[animation-play-state:paused] sm:gap-12 sm:pr-12">
            {row.map((logo, i) => (
              <LogoItem key={`${logo.name}-${i}`} {...logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
