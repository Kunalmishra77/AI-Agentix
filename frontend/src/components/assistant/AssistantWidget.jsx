import { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SiWhatsapp } from 'react-icons/si'
import { X, Send, ArrowRight, Mic, Volume2, VolumeX } from 'lucide-react'

const WA_NUMBER = '919217064245' // real WhatsApp handoff
const GREETING = "Hi! I'm the Agentix Assistant. Ask me about our AI solutions, industries, technology or how to get started — I can also take you straight to the right page."

// Web Speech API (feature-detected; absent on some browsers)
const SpeechRecognitionAPI = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)
const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

// Best-effort "which section is the visitor looking at" — the section nearest the
// top third of the viewport — so answers can be context-aware.
function currentSection() {
  if (typeof document === 'undefined') return null
  const secs = [...document.querySelectorAll('main section')]
  const anchor = window.innerHeight * 0.3
  let best = null, bestDist = Infinity
  for (const s of secs) {
    const r = s.getBoundingClientRect()
    if (r.bottom < 40 || r.top > window.innerHeight) continue
    const dist = Math.abs(r.top - anchor)
    if (dist < bestDist) { bestDist = dist; best = s }
  }
  if (!best) return null
  return best.id || best.querySelector('h1,h2,h3')?.textContent?.trim()?.slice(0, 70) || null
}

// smooth-scroll to an in-page section after navigation, with a brief highlight
function goToAnchor(anchor) {
  if (!anchor) return
  const id = anchor.replace('#', '')
  let tries = 0
  const tick = () => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      el.style.transition = 'box-shadow .4s ease'
      el.style.boxShadow = '0 0 0 3px rgba(242,101,34,.55)'
      setTimeout(() => { el.style.boxShadow = '' }, 1600)
      return
    }
    if (tries++ < 12) setTimeout(tick, 90)
  }
  setTimeout(tick, 350)
}

export default function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [preview, setPreview] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', text: GREETING }])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [listening, setListening] = useState(false)
  const [speakOn, setSpeakOn] = useState(false)
  const panelRef = useRef(null)
  const scrollRef = useRef(null)
  const recRef = useRef(null)
  const sendRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const speak = useCallback((text) => {
    if (!speakOn || !canSpeak || !text) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'en-IN'; u.rate = 1.03; u.pitch = 1
    window.speechSynthesis.speak(u)
  }, [speakOn])

  // autoscroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  // Esc + click-outside close (desktop)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    const onDown = (e) => {
      if (window.innerWidth >= 640 && panelRef.current && !panelRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown) }
  }, [open])

  const send = useCallback(async (text) => {
    const q = (text ?? input).trim()
    if (!q || busy) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: q }])
    setBusy(true)
    try {
      const history = messages.slice(-6).map((m) => ({ role: m.role, content: m.text }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: q, history, context: { route: location.pathname, section: currentSection() } }),
      })
      const data = await res.json()
      const reply = data.reply || "Sorry, I couldn't find that on our site."
      setMessages((m) => [...m, { role: 'assistant', text: reply, action: data.action }])
      speak(reply)
      if (data.action?.navigate) {
        navigate(data.action.navigate + (data.action.anchor || ''))
        goToAnchor(data.action.anchor)
      }
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: 'I had trouble connecting. Please try again, or reach us on WhatsApp.' }])
    } finally {
      setBusy(false)
    }
  }, [input, busy, messages, location.pathname, navigate, speak])
  sendRef.current = send

  // Voice input (speech-to-text). Fills the field live, auto-sends on finish.
  const toggleMic = useCallback(() => {
    if (!SpeechRecognitionAPI) return
    if (listening) { recRef.current?.stop(); return }
    const rec = new SpeechRecognitionAPI()
    rec.lang = 'en-IN'
    rec.interimResults = true
    rec.continuous = false
    let finalText = ''
    rec.onresult = (e) => {
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) finalText += t; else interim += t
      }
      setInput((finalText + interim).trim())
    }
    rec.onend = () => {
      setListening(false)
      const text = finalText.trim()
      if (text) { setInput(''); sendRef.current?.(text) }
    }
    rec.onerror = () => setListening(false)
    recRef.current = rec
    setListening(true)
    rec.start()
  }, [listening])

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi AI Agentix, I have a question about your services.')}`

  return (
    <>
      {/* Floating action button */}
      <div
        className="fixed right-5 z-[60] flex flex-col items-end"
        style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
        onMouseEnter={() => window.innerWidth >= 640 && !open && setPreview(true)}
        onMouseLeave={() => setPreview(false)}
      >
        {/* hover preview (desktop, pointer devices) */}
        <AnimatePresence>
          {preview && !open && (
            <motion.button
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              onClick={() => { setOpen(true); setPreview(false) }}
              className="mb-3 hidden w-64 overflow-hidden rounded-2xl bg-white text-left shadow-float ring-1 ring-black/5 sm:block"
            >
              <div className="flex items-center gap-2.5 bg-[#075E54] px-4 py-3 text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  <SiWhatsapp className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold leading-tight">Agentix Assistant</div>
                  <div className="text-[11px] leading-tight text-white/80">online · replies instantly</div>
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="rounded-xl rounded-tl-sm bg-surface-alt px-3 py-2 text-xs leading-relaxed text-body">
                  Hi 👋 Ask me anything about AI Agentix — I'll answer and take you there.
                </p>
                <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  Start chatting <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        <button
          aria-label="Open Agentix Assistant"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,.45)] transition-transform hover:scale-105 active:scale-95"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" aria-hidden />
          <SiWhatsapp className="h-7 w-7" />
        </button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* mobile scrim */}
            <motion.div
              className="fixed inset-0 z-[65] bg-black/40 sm:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: 'tween', duration: 0.22, ease: [0.21, 0.5, 0.25, 1] }}
              className="fixed inset-0 z-[70] flex h-[100dvh] w-full flex-col overflow-hidden bg-[#ECE5DD] sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[560px] sm:max-h-[calc(100vh-7rem)] sm:w-[384px] sm:max-w-[calc(100vw-2.5rem)] sm:rounded-2xl sm:shadow-float sm:ring-1 sm:ring-black/10"
            >
              {/* header */}
              <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <SiWhatsapp className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm font-semibold leading-tight">
                    Agentix Assistant
                    <span className="rounded-full bg-accent px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide">AI</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] leading-tight text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-300" /> online
                  </div>
                </div>
                {canSpeak && (
                  <button
                    aria-label={speakOn ? 'Turn off voice replies' : 'Turn on voice replies'}
                    onClick={() => setSpeakOn((v) => { if (v) window.speechSynthesis.cancel(); return !v })}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
                  >
                    {speakOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </button>
                )}
                <button aria-label="Close" onClick={() => setOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/90 hover:bg-white/10">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* messages */}
              <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-3.5 py-4" style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,.03) 1px, transparent 1px)', backgroundSize: '18px 18px' }}>
                {messages.map((m, i) => (
                  <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                    <div className={m.role === 'user'
                      ? 'max-w-[82%] rounded-2xl rounded-tr-sm bg-[#DCF8C6] px-3.5 py-2 text-sm leading-relaxed text-[#111B21] shadow-sm'
                      : 'max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2 text-sm leading-relaxed text-[#111B21] shadow-sm'}>
                      {m.text}
                      {m.action?.navigate && (
                        <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-accent">
                          <ArrowRight className="h-3.5 w-3.5" /> Taking you to {m.action.navigate}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {busy && (
                  <div className="flex justify-start">
                    <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm">
                      {[0, 1, 2].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-body-soft" style={{ animationDelay: `${d * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* WhatsApp handoff */}
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 bg-[#25D366]/10 py-2 text-xs font-semibold text-[#075E54] transition-colors hover:bg-[#25D366]/20">
                <SiWhatsapp className="h-3.5 w-3.5" /> Chat with a human on WhatsApp
              </a>

              {/* input */}
              <form
                onSubmit={(e) => { e.preventDefault(); send() }}
                className="flex items-center gap-2 border-t border-black/5 bg-[#F0F0F0] px-3 py-2.5"
                style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={listening ? 'Listening…' : 'Ask anything…'}
                  aria-label="Message"
                  className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 text-base text-[#111B21] outline-none placeholder:text-body-soft focus:border-accent/50 sm:text-sm"
                />
                {SpeechRecognitionAPI && (
                  <button
                    type="button"
                    onClick={toggleMic}
                    aria-label={listening ? 'Stop listening' : 'Voice input'}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${listening ? 'animate-pulse border-transparent bg-red-500 text-white' : 'border-black/10 bg-white text-body-soft hover:text-accent'}`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label="Send"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-hover disabled:opacity-40"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
