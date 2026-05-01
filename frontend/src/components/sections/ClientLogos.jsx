const CLIENTS = [
  { name: 'Volvo',               src: '/assets/clients/volvo.png' },
  { name: 'Nexteer Automotive',  src: '/assets/clients/nexteer.png' },
  { name: 'MSG',                 src: '/assets/clients/msg.png' },
  { name: 'BMW',                 src: '/assets/clients/bmw.png' },
  { name: 'WGU',                 src: '/assets/clients/wgu.png' },
  { name: 'Hertz',               src: '/assets/clients/hertz.png' },
  { name: 'Nissan',              src: '/assets/clients/nissan.png' },
  { name: 'SITA',                src: '/assets/clients/sita.png' },
];

export default function ClientLogos() {
  return (
    <section className="bg-[#f9f9f7] border-t border-[#e5e5e5] py-6">
      <div className="max-w-[1240px] mx-auto px-12 flex items-center gap-10">
        {/* Label */}
        <p className="flex-shrink-0 text-[15px] font-medium text-[#0D1E3A] whitespace-nowrap">
          Our clients
        </p>

        {/* Divider */}
        <div className="w-px h-8 bg-[#ddd] flex-shrink-0" />

        {/* Logos */}
        <div className="flex items-center justify-between flex-1 gap-6 flex-wrap">
          {CLIENTS.map(({ name, src }) => (
            <img
              key={name}
              src={src}
              alt={name}
              className="h-8 object-contain"
              style={{ filter: 'grayscale(100%)', opacity: 0.75 }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
