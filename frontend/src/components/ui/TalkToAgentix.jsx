import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaXmark, FaPaperPlane } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

// ─── Scripted conversation data ────────────────────────────────────────────────

const INITIAL_MESSAGE = {
  id: 'init-1',
  role: 'bot',
  text: "Hi! I'm the Agentix AI assistant 👋 I can help you find the right AI tools for your business. What are you looking to automate?",
  quickReplies: [
    'Content & Marketing',
    'Sales & Leads',
    'Market Research',
    'Business Operations',
  ],
};

const CATEGORY_RESPONSES = {
  'content & marketing': {
    text: "Great choice! Our Content AI tools include the AI Content Generator, Social Media Scheduler, AI Photo Editor, and Workflow Generator. Which sounds most useful?",
    links: [{ href: '/category/content', label: 'Explore Content & Marketing →' }],
    quickReplies: ['Tell me more', 'Book a demo', 'See all tools'],
  },
  'sales & leads': {
    text: "Perfect! Our Sales AI suite covers Lead Scraping, WhatsApp Automation, Cold Calling Bot, and CRM Sync — the full pipeline.",
    links: [{ href: '/category/sales', label: 'Explore Sales & Leads →' }],
    quickReplies: ['Tell me more', 'Book a demo', 'See all tools'],
  },
  'market research': {
    text: "Smart move! Our Research AI tools give you Competitor Analysis, Pricing Intelligence, and AI Market Strategy — real-time insights in hours.",
    links: [{ href: '/category/market-research', label: 'Explore Market Research →' }],
    quickReplies: ['Tell me more', 'Book a demo', 'See all tools'],
  },
  'business operations': {
    text: "Excellent! Business AI covers CRM, ERP, LMS, Website Builder, and E-Commerce — your full operational stack.",
    links: [{ href: '/category/business', label: 'Explore Business Operations →' }],
    quickReplies: ['Tell me more', 'Book a demo', 'See all tools'],
  },
};

const FOLLOWUP_RESPONSES = {
  'tell me more': {
    text: "Each tool comes with a free trial, integrates with your existing stack, and can be live in under 30 minutes. No AI expertise needed — just plug in and go.",
  },
  'book a demo': {
    text: "I'll connect you with our team!",
    links: [{ href: '/contact', label: 'Click here to book your demo →' }],
  },
  'see all tools': {
    text: "Here's a quick overview of all 16 tools across our 4 categories:",
    links: [{ href: '/category/content', label: 'Browse all tools →' }],
  },
};

const FALLBACK_RESPONSE = {
  text: "That's a great question! Our team would love to give you a personalised walkthrough.",
  links: [{ href: '/contact', label: 'Book a quick demo →' }],
};

// ─── Helper ────────────────────────────────────────────────────────────────────

let _id = 0;
const uid = () => `msg-${++_id}-${Date.now()}`;

function buildBotMessage(data) {
  return { id: uid(), role: 'bot', ...data };
}

function buildUserMessage(text) {
  return { id: uid(), role: 'user', text };
}

function getScriptedResponse(input) {
  const key = input.trim().toLowerCase();

  if (CATEGORY_RESPONSES[key]) return CATEGORY_RESPONSES[key];
  if (FOLLOWUP_RESPONSES[key]) return FOLLOWUP_RESPONSES[key];
  return FALLBACK_RESPONSE;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function BotMessage({ message }) {
  return (
    <div className="flex items-end gap-2 mb-3">
      {/* Avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F26522] flex items-center justify-center shadow-sm">
        <FaRobot size={13} className="text-white" />
      </div>

      <div className="flex flex-col gap-1 max-w-[82%]">
        {/* Text bubble */}
        <div className="bg-[#F8FAFC] border border-[#E8EDF3] rounded-2xl rounded-tl-sm px-3 py-2 text-[13px] text-[#0D1E3A] leading-relaxed">
          {message.text}

          {/* Inline links */}
          {message.links && message.links.length > 0 && (
            <div className="mt-1.5 flex flex-col gap-1">
              {message.links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[#F26522] font-medium hover:underline text-[12px] inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick reply chips */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {message.quickReplies.map((reply) => (
              <QuickReplyChip key={reply} label={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserMessage({ message }) {
  return (
    <div className="flex justify-end mb-3">
      <div className="bg-[#F26522] text-white rounded-2xl rounded-tr-sm px-3 py-2 text-[13px] leading-relaxed max-w-[78%]">
        {message.text}
      </div>
    </div>
  );
}

// QuickReplyChip reads the dispatch fn from context so BotMessage stays pure.

const ChatContext = createContext(null);

function QuickReplyChip({ label }) {
  const { onQuickReply } = useContext(ChatContext);
  return (
    <button
      onClick={() => onQuickReply(label)}
      className="px-2.5 py-1 rounded-full border border-[#F26522] text-[#F26522] text-[11px] font-medium hover:bg-[#F26522] hover:text-white transition-colors duration-150 leading-none"
    >
      {label}
    </button>
  );
}

// ─── Main widget ───────────────────────────────────────────────────────────────

export default function TalkToAgentix() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasOpenedOnce = useRef(false);

  // Auto-scroll whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Show greeting once on first open
  const handleOpen = () => {
    setIsOpen(true);
    if (!hasOpenedOnce.current) {
      hasOpenedOnce.current = true;
      setTimeout(() => {
        setMessages([buildBotMessage(INITIAL_MESSAGE)]);
      }, 300);
    }
  };

  const handleClose = () => setIsOpen(false);

  const sendUserMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = buildUserMessage(text.trim());
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getScriptedResponse(text);
      setIsTyping(false);
      setMessages((prev) => [...prev, buildBotMessage(response)]);
    }, 600);
  };

  const handleQuickReply = (label) => sendUserMessage(label);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendUserMessage(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendUserMessage(inputValue);
    }
  };

  return (
    <ChatContext.Provider value={{ onQuickReply: handleQuickReply }}>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-[#E8EDF3] flex flex-col overflow-hidden"
            style={{ maxWidth: 'calc(100vw - 24px)' }}
          >
            {/* Header */}
            <div className="bg-[#0D1E3A] px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F26522] flex items-center justify-center shadow-md">
                  <FaRobot size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">Agentix AI</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    <span className="text-[#6B7280] text-[11px]">Online · Ready to help</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close chat"
                className="text-white/60 hover:text-white transition-colors duration-150 p-1 rounded-lg hover:bg-white/10"
              >
                <FaXmark size={16} />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 bg-white min-h-0">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-2 text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#FFF3EC] flex items-center justify-center">
                    <FaRobot size={22} className="text-[#F26522]" />
                  </div>
                  <p className="text-[#6B7280] text-[13px]">Starting conversation…</p>
                </div>
              )}

              {messages.map((msg) =>
                msg.role === 'bot' ? (
                  <BotMessage key={msg.id} message={msg} />
                ) : (
                  <UserMessage key={msg.id} message={msg} />
                )
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end gap-2 mb-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F26522] flex items-center justify-center shadow-sm">
                    <FaRobot size={13} className="text-white" />
                  </div>
                  <div className="bg-[#F8FAFC] border border-[#E8EDF3] rounded-2xl rounded-tl-sm px-4 py-2.5">
                    <span className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-[#9CA3AF] rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[#E8EDF3] px-3 py-2.5 flex items-center gap-2 flex-shrink-0 bg-white"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                className="flex-1 text-[13px] text-[#0D1E3A] placeholder-[#9CA3AF] bg-[#F8FAFC] border border-[#E8EDF3] rounded-xl px-3 py-2 outline-none focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522]/30 transition-all duration-150"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className="w-9 h-9 rounded-xl bg-[#F26522] flex items-center justify-center text-white shadow-sm hover:bg-[#D9541A] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 flex-shrink-0"
              >
                <FaPaperPlane size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ── */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulsing ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#F26522] opacity-30 animate-ping" />
        )}
        <motion.button
          onClick={isOpen ? handleClose : handleOpen}
          aria-label={isOpen ? 'Close Agentix chat' : 'Open Agentix chat'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          className="relative w-14 h-14 rounded-full bg-[#F26522] shadow-xl flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-[#F26522] focus:ring-offset-2"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <FaXmark size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="robot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <FaRobot size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </ChatContext.Provider>
  );
}
