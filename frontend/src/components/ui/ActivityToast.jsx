import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../../styles/ax-premium.css';

const EVENTS = [
  { msg: 'Lead from JustDial qualified → Amit Sharma', tag: 'Sales AI', color: '#E8631A' },
  { msg: 'Ticket #5214 auto-resolved in 8 seconds', tag: 'Support AI', color: '#06B6D4' },
  { msg: 'WhatsApp campaign sent → 84 warm leads', tag: 'Outreach', color: '#10B981' },
  { msg: 'Invoice INV-3301 generated & dispatched', tag: 'Finance', color: '#F59E0B' },
  { msg: 'Onboarding flow triggered: Priya Kapoor', tag: 'HR AI', color: '#EC4899' },
  { msg: 'GST report auto-filed for Q1', tag: 'Finance', color: '#F59E0B' },
  { msg: 'Lead scored 94/100 → routed to sales', tag: 'Sales AI', color: '#E8631A' },
  { msg: 'Support chatbot deflected 23 queries', tag: 'Support AI', color: '#06B6D4' },
];

export default function ActivityToast() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(p => (p + 1) % EVENTS.length);
        setVisible(true);
      }, 400);
    }, 4200);
    return () => clearInterval(cycle);
  }, []);

  const ev = EVENTS[idx];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={idx}
          className="ax-activity-toast"
          initial={{ opacity: 0, x: -20, y: 8 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ borderLeftColor: ev.color }}
        >
          <div className="ax-activity-toast-dot" style={{ background: ev.color, boxShadow: `0 0 8px ${ev.color}88` }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="ax-activity-toast-msg">{ev.msg}</div>
          </div>
          <div className="ax-activity-toast-tag" style={{ color: ev.color }}>{ev.tag}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
