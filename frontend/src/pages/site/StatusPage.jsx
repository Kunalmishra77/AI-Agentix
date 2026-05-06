import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import AgentixIcon from '../../components/agentix/AgentixIcon.jsx';
import FinalCTA from '../../components/agentix/FinalCTA.jsx';

const SERVICES = [
  { name: 'Assistant routing', status: 'operational', uptime: '99.98%', region: 'All regions' },
  { name: 'Workflow engine', status: 'operational', uptime: '99.97%', region: 'All regions' },
  { name: 'Tool API gateway', status: 'operational', uptime: '99.99%', region: 'All regions' },
  { name: 'Integrations layer', status: 'operational', uptime: '99.95%', region: 'All regions' },
  { name: 'RAG knowledge base', status: 'operational', uptime: '99.92%', region: 'US, EU' },
  { name: 'Human handoff routing', status: 'operational', uptime: '99.99%', region: 'All regions' },
  { name: 'Audit logging', status: 'operational', uptime: '100%', region: 'All regions' },
  { name: 'Webhook delivery', status: 'degraded', uptime: '98.40%', region: 'APAC', note: 'Elevated latency — investigating' },
  { name: 'Dashboard app', status: 'operational', uptime: '99.96%', region: 'All regions' },
  { name: 'Docs and Help', status: 'operational', uptime: '100%', region: 'CDN' },
];

const INCIDENTS = [
  {
    date: 'May 6, 2026',
    title: 'Webhook delivery degradation — APAC region',
    status: 'investigating',
    severity: 'minor',
    updates: [
      { time: '14:32 UTC', text: 'Elevated latency detected in webhook delivery for APAC region. Investigation underway.' },
      { time: '14:18 UTC', text: 'Alert triggered by automated monitoring. Engineering team notified.' },
    ],
  },
];

const PAST_INCIDENTS = [
  { date: 'Apr 28, 2026', title: 'Integrations layer — brief elevated error rate', duration: '12 minutes', severity: 'minor', resolved: true },
  { date: 'Apr 11, 2026', title: 'Scheduled maintenance — workflow engine upgrade', duration: '18 minutes', severity: 'maintenance', resolved: true },
  { date: 'Mar 30, 2026', title: 'Dashboard slowness — CDN misconfiguration', duration: '6 minutes', severity: 'minor', resolved: true },
  { date: 'Mar 14, 2026', title: 'Assistant routing — elevated latency', duration: '9 minutes', severity: 'minor', resolved: true },
];

const UPTIME_BARS = [
  { day: 'Apr 7', ok: true }, { day: 'Apr 8', ok: true }, { day: 'Apr 9', ok: true }, { day: 'Apr 10', ok: true },
  { day: 'Apr 11', ok: false, note: 'Maintenance' }, { day: 'Apr 12', ok: true }, { day: 'Apr 13', ok: true },
  { day: 'Apr 14', ok: true }, { day: 'Apr 15', ok: true }, { day: 'Apr 16', ok: true }, { day: 'Apr 17', ok: true },
  { day: 'Apr 18', ok: true }, { day: 'Apr 19', ok: true }, { day: 'Apr 20', ok: true },
  { day: 'Apr 21', ok: true }, { day: 'Apr 22', ok: true }, { day: 'Apr 23', ok: true }, { day: 'Apr 24', ok: true },
  { day: 'Apr 25', ok: true }, { day: 'Apr 26', ok: true }, { day: 'Apr 27', ok: true },
  { day: 'Apr 28', ok: false, note: 'Minor incident' }, { day: 'Apr 29', ok: true }, { day: 'Apr 30', ok: true },
  { day: 'May 1', ok: true }, { day: 'May 2', ok: true }, { day: 'May 3', ok: true }, { day: 'May 4', ok: true },
  { day: 'May 5', ok: true }, { day: 'May 6', ok: false, note: 'Active — APAC webhooks' },
];

const statusColor = { operational: 'var(--ok)', degraded: 'var(--warn)', outage: 'var(--err)', maintenance: '#B69BFF' };
const statusLabel = { operational: 'Operational', degraded: 'Degraded', outage: 'Outage', maintenance: 'Maintenance' };
const severityColor = { minor: 'var(--warn)', major: 'var(--err)', maintenance: '#B69BFF' };

export default function StatusPage() {
  const hasActive = INCIDENTS.length > 0;

  return (
    <>
      <Helmet><title>System Status / Agentix</title></Helmet>

      {/* ── 1. Hero: status summary ── */}
      <section className="hero page-hero" style={{ minHeight: 'auto', paddingBottom: 56 }}>
        <div className="hero-bg-glow" />
        <div className="container-wide">
          <div className="chip"><span className="chip-dot" />Status</div>
          <div className="status-current" style={{ marginTop: 28 }}>
            {hasActive ? (
              <>
                <div className="status-current-indicator" style={{ background: 'var(--warn)', boxShadow: '0 0 32px rgba(255,176,96,0.5)' }} />
                <h1 className="h-2" style={{ color: 'var(--warn)', margin: 0 }}>Partial system degradation</h1>
              </>
            ) : (
              <>
                <div className="status-current-indicator" style={{ background: 'var(--ok)', boxShadow: '0 0 32px rgba(91,227,168,0.5)' }} />
                <h1 className="h-2" style={{ color: 'var(--ok)', margin: 0 }}>All systems operational</h1>
              </>
            )}
          </div>
          <p className="body-lg" style={{ marginTop: 12, maxWidth: 560 }}>
            {hasActive
              ? 'One or more services are experiencing issues. See below for details and live updates.'
              : 'Agentix platform, assistant, workflow engine, integrations, and docs are all running normally.'}
          </p>
          <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 12 }}>
            Last updated: May 6, 2026 at 14:45 UTC
          </div>
        </div>
      </section>

      {/* ── 2. Active incident banner ── */}
      {hasActive && (
        <section style={{ padding: '24px 0', background: 'rgba(255,176,96,0.08)', borderTop: '1px solid rgba(255,176,96,0.2)', borderBottom: '1px solid rgba(255,176,96,0.2)' }}>
          <div className="container-wide">
            {INCIDENTS.map((inc) => (
              <div key={inc.title} className="status-incident-banner">
                <div className="status-incident-badge" style={{ background: severityColor[inc.severity] }}>
                  {inc.severity === 'minor' ? 'Minor incident' : 'Major incident'}
                </div>
                <div className="status-incident-title">{inc.title}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{inc.date}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 3. Services list ── */}
      <section className="section">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Services</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>Current status by service.</h2>
          </div>
          <div className="status-services card">
            <div className="status-services-head">
              <span>Service</span>
              <span>Status</span>
              <span>Uptime (30d)</span>
              <span>Region</span>
            </div>
            {SERVICES.map((s) => (
              <div key={s.name} className="status-service-row">
                <span className="status-service-name">{s.name}</span>
                <span className="status-service-status">
                  <span className="dot" style={{ background: statusColor[s.status] }} />
                  <span className="mono" style={{ fontSize: 12, color: statusColor[s.status] }}>{statusLabel[s.status]}</span>
                  {s.note && <span className="status-service-note">{s.note}</span>}
                </span>
                <span className="mono status-service-uptime" style={{ color: parseFloat(s.uptime) >= 99.9 ? 'var(--ok)' : 'var(--warn)' }}>{s.uptime}</span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>{s.region}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Uptime history visual ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">History</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>30-day platform uptime.</h2>
          </div>
          <div className="status-history card">
            <div className="status-history-bars">
              {UPTIME_BARS.map((bar) => (
                <div
                  key={bar.day}
                  className="status-history-bar"
                  style={{ background: bar.ok ? 'var(--ok)' : bar.note?.includes('Maintenance') ? '#B69BFF' : 'var(--warn)' }}
                  title={`${bar.day}${bar.note ? ` — ${bar.note}` : ' — Operational'}`}
                />
              ))}
            </div>
            <div className="status-history-legend">
              <span className="status-legend-item"><span className="dot dot-ok" />Operational</span>
              <span className="status-legend-item"><span className="dot" style={{ background: 'var(--warn)' }} />Incident</span>
              <span className="status-legend-item"><span className="dot" style={{ background: '#B69BFF' }} />Maintenance</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 'auto' }}>Apr 7 → May 6, 2026</span>
            </div>
          </div>
          <div className="status-uptime-summary">
            {[['99.97%', 'Platform uptime (30d)'], ['99.9%', 'SLA commitment'], ['2', 'Minor incidents'], ['0', 'Major incidents']].map(([v, l]) => (
              <div key={l} className="status-uptime-stat card">
                <div className="status-uptime-val" style={{ color: 'var(--ok)' }}>{v}</div>
                <div className="status-uptime-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Active incidents detail ── */}
      {hasActive && (
        <section className="section">
          <div className="container-wide">
            <div className="sec-head">
              <span className="eyebrow">Active incidents</span>
              <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12, color: 'var(--warn)' }}>Live updates.</h2>
            </div>
            {INCIDENTS.map((inc) => (
              <div key={inc.title} className="status-incident-detail card">
                <div className="status-incident-head">
                  <div>
                    <div className="chip" style={{ borderColor: severityColor[inc.severity], color: severityColor[inc.severity] }}>
                      <span className="chip-dot" style={{ background: severityColor[inc.severity] }} />{inc.severity} severity
                    </div>
                    <h3 className="h-3" style={{ marginTop: 12 }}>{inc.title}</h3>
                  </div>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)' }}>Started {inc.date}</div>
                </div>
                <div className="status-incident-timeline">
                  {inc.updates.map((u) => (
                    <div key={u.time} className="status-incident-update">
                      <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', flexShrink: 0 }}>{u.time}</span>
                      <span style={{ fontSize: 13, color: 'var(--ink-1)' }}>{u.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 6. Past incidents ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="sec-head">
            <span className="eyebrow">Past incidents</span>
            <h2 className="h-1" style={{ maxWidth: 560, marginTop: 12 }}>Recent history.</h2>
          </div>
          <div className="status-past card">
            {PAST_INCIDENTS.map((inc) => (
              <div key={inc.title} className="status-past-row">
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', minWidth: 100 }}>{inc.date}</span>
                <span style={{ flex: 1, fontSize: 14, color: 'var(--ink-1)' }}>{inc.title}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{inc.duration}</span>
                <span className="dot dot-ok" title="Resolved" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Maintenance schedule ── */}
      <section className="section">
        <div className="container-wide page-split">
          <div>
            <span className="eyebrow">Maintenance</span>
            <h2 className="h-1" style={{ marginTop: 12 }}>Scheduled maintenance is announced 7 days in advance.</h2>
            <p className="body" style={{ marginTop: 16 }}>
              Planned maintenance windows are posted here and sent via email to all accounts 7 days before the event. Maintenance never runs during peak business hours.
            </p>
          </div>
          <div className="status-maintenance card">
            <div className="eyebrow" style={{ marginBottom: 16 }}>Upcoming scheduled maintenance</div>
            <div className="status-maint-none">
              <span className="dot dot-ok" />
              <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>No scheduled maintenance in the next 30 days.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Subscribe and contact ── */}
      <section className="section page-band">
        <div className="container-wide">
          <div className="status-subscribe card">
            <div className="status-subscribe-left">
              <span className="eyebrow">Status updates</span>
              <h2 className="h-2" style={{ marginTop: 12 }}>Get notified when something changes.</h2>
              <p className="body" style={{ marginTop: 12 }}>
                Subscribe to status updates by email. You'll receive incident alerts, maintenance notices, and all-clear confirmations — nothing else.
              </p>
            </div>
            <div className="status-subscribe-form">
              <form onSubmit={(e) => e.preventDefault()} className="contact-form-row" style={{ gap: 12, flexWrap: 'nowrap' }}>
                <input type="email" className="contact-input" placeholder="your@email.com" style={{ flex: 1 }} />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10 }}>
                Status updates only. No marketing. Unsubscribe anytime.
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
