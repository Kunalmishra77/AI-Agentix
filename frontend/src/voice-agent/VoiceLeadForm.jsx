// ─── VoiceLeadForm — Minimal Floating Booking Card ───────────────────────────
import { PHASES } from './agentFlow';

function dateOffset(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8"  y1="2" x2="8"  y2="6"/>
    <line x1="3"  y1="10" x2="21" y2="10"/>
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

export default function VoiceLeadForm({ lead, phase, error, bookingDone, onChange, onSubmit, onClose }) {
  const isBooking = phase === PHASES.BOOKING;

  if (bookingDone) {
    return (
      <div className="va-form-card va-form-card--success" id="va-lead-form">
        <div className="va-form-success-icon">✅</div>
        <div className="va-form-success-title">You're booked!</div>
        <div className="va-form-success-text">
          Calendar invite sent to <strong>{lead.email}</strong>.<br/>
          The AGENTiX team will confirm shortly.
        </div>
      </div>
    );
  }

  return (
    <div className="va-form-card" id="va-lead-form">
      {/* Header */}
      <div className="va-form-header">
        <span className="va-form-title"><CalIcon /> Book a Demo</span>
        <button className="va-form-close" onClick={onClose} aria-label="Close form"><XIcon /></button>
      </div>

      {/* Fields */}
      <div className="va-form-row">
        <input className="va-form-input" placeholder="Your name *"
          value={lead.name} onChange={(e) => onChange('name', e.target.value)} id="va-field-name"/>
        <input className="va-form-input" placeholder="Company"
          value={lead.company} onChange={(e) => onChange('company', e.target.value)} id="va-field-company"/>
      </div>
      <input className="va-form-input va-form-input--full" placeholder="Email address *" type="email"
        value={lead.email} onChange={(e) => onChange('email', e.target.value)} id="va-field-email"/>
      <div className="va-form-row">
        <input className="va-form-input" type="date"
          min={dateOffset(1)}
          max={dateOffset(7)}
          value={lead.preferredDate} onChange={(e) => onChange('preferredDate', e.target.value)} id="va-field-date"/>
        <input className="va-form-input" type="time"
          value={lead.preferredTime} onChange={(e) => onChange('preferredTime', e.target.value)} id="va-field-time"/>
      </div>

      {error && <div className="va-form-error">{error}</div>}

      <button className="va-form-submit" onClick={onSubmit} disabled={isBooking} id="va-book-btn">
        <CalIcon />
        {isBooking ? 'Booking…' : 'Book Demo on Calendar'}
      </button>
    </div>
  );
}
