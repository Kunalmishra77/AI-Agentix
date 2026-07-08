import { platforms } from '../../data/home'

export default function PlatformMarquee() {
  const row = [...platforms.names, ...platforms.names]
  return (
    <section className="bg-surface py-12">
      <div className="container-x flex flex-col items-center gap-6 md:flex-row md:gap-10">
        <p className="shrink-0 text-center text-sm font-semibold text-heading md:max-w-[200px] md:text-left">
          {platforms.label}
        </p>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="flex w-max animate-marquee-slow items-center gap-12 pr-12">
            {row.map((name, i) => (
              <span
                key={`${name}-${i}`}
                data-asset={`partner-logo: ${name}`}
                className="whitespace-nowrap text-lg font-bold text-heading/30 grayscale transition-colors hover:text-heading/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
