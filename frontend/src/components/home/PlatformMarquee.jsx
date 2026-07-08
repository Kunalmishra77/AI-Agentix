import { platforms } from '../../data/home'

export default function PlatformMarquee() {
  const row = [...platforms.names, ...platforms.names]
  return (
    <section className="border-y border-line bg-surface-alt py-12">
      <div className="container-x">
        <p className="mb-8 text-center text-eyebrow uppercase text-body-soft">{platforms.label}</p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee-slow items-center gap-14 pr-14">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              data-asset={`partner-logo: ${name}`}
              className="whitespace-nowrap text-xl font-bold text-heading/35 transition-colors hover:text-heading/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
