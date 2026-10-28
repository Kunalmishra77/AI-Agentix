import { SiWhatsapp } from 'react-icons/si'
import { contactInfo, whatsappLink } from '../../data/site'

/** Bottom-left WhatsApp button — opens a chat with the AI Agentix WhatsApp number. */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with AI Agentix on WhatsApp (${contactInfo.whatsappDisplay})`}
      title="Chat on WhatsApp"
      className="agx-float fixed left-4 z-[55] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,.4)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-heading focus-visible:ring-offset-2 active:scale-95 sm:left-5 sm:h-14 sm:w-14"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <SiWhatsapp className="h-7 w-7" aria-hidden />
    </a>
  )
}
