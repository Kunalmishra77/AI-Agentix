export default function AnnouncementBanner({ onDismiss }) {
  return (
    <div
      id="announcement-banner"
      className="relative w-full h-11 flex items-center justify-center px-10
                 bg-[#f5f5f5] border-b border-[#e0e0e0] text-[#1a1a1a] text-[13px] font-medium z-[110]"
    >
      <span>
        <strong>AI Agentix</strong> is now part of the next generation of Agentic AI —{' '}
        <a href="/contact" className="text-[#F26522] hover:underline font-semibold">
          read full press release →
        </a>
      </span>
      <button
        onClick={onDismiss}
        aria-label="Dismiss banner"
        className="absolute right-5 opacity-50 hover:opacity-100 text-lg leading-none text-[#1a1a1a]"
      >
        ×
      </button>
    </div>
  );
}
