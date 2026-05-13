import { useState } from 'react';
import AdminShell from '../layout/AdminShell';
import { Save, Shield, Bell, Globe, Database, Webhook } from 'lucide-react';

const SECTIONS = [
  {
    id: 'general',
    label: 'General',
    icon: Globe,
    fields: [
      { key:'siteName',      label:'Platform Name',        type:'text',   value:'AI Agentix' },
      { key:'supportEmail',  label:'Support Email',        type:'email',  value:'aiagentix2025@gmail.com' },
      { key:'apiRateLimit',  label:'API Rate Limit (req/min)', type:'number', value:'1000' },
      { key:'webhookRetries',label:'Webhook Retries',      type:'number', value:'3' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    fields: [
      { key:'sessionTimeout',  label:'Session Timeout (min)',  type:'number', value:'60' },
      { key:'maxLoginAttempts',label:'Max Login Attempts',     type:'number', value:'5' },
      { key:'ipWhitelist',     label:'IP Allowlist (CSV)',      type:'text',   value:'' },
    ],
  },
];

const TOGGLES = [
  { key:'maintenanceMode',   label:'Maintenance Mode',       desc:'Blocks all public routes with a maintenance page',   default:false },
  { key:'analyticsEnabled',  label:'Analytics Tracking',     desc:'Enables page view and event tracking',               default:true  },
  { key:'webhookDelivery',   label:'Webhook Delivery',       desc:'Enable outbound webhook event delivery',             default:true  },
  { key:'emailNotifications',label:'Email Notifications',    desc:'Send system alerts and reports via email',           default:true  },
  { key:'betaFeatures',      label:'Beta Features',          desc:'Enable experimental features for all users',         default:false },
  { key:'debugLogging',      label:'Debug Logging',          desc:'Verbose server-side logging (high I/O)',             default:false },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved]   = useState(false);
  const [fields, setFields] = useState(() => {
    const init = {};
    SECTIONS.forEach(s => s.fields.forEach(f => { init[f.key] = f.value; }));
    return init;
  });
  const [toggles, setToggles] = useState(() =>
    Object.fromEntries(TOGGLES.map(t => [t.key, t.default]))
  );

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const section = SECTIONS.find(s => s.id === activeSection) ?? SECTIONS[0];

  return (
    <AdminShell>
      <div className="adm-page-hdr">
        <div>
          <div className="adm-page-title">Settings</div>
          <div className="adm-page-sub">Platform configuration and feature flags</div>
        </div>
        <div className="adm-page-actions">
          <button className="adm-btn adm-btn-primary" onClick={handleSave}>
            <Save size={13} /> {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:16 }}>
        {/* Section nav */}
        <div className="adm-card" style={{ padding:'12px 0', height:'fit-content' }}>
          <div style={{ padding:'0 14px 8px', fontSize:10, fontFamily:'var(--adm-font-mono)', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--adm-t-3)' }}>Configuration</div>
          {[...SECTIONS, { id:'flags', label:'Feature Flags', icon:Bell }, { id:'integrations', label:'Integrations', icon:Webhook }].map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                width:'100%', display:'flex', alignItems:'center', gap:8,
                padding:'8px 14px',
                background: activeSection === s.id ? 'var(--adm-orange-06)' : 'transparent',
                color:      activeSection === s.id ? 'var(--adm-orange)' : 'var(--adm-t-2)',
                fontSize:12.5, fontWeight: activeSection === s.id ? 600 : 400,
                border:'none', cursor:'pointer', textAlign:'left',
                borderLeft: activeSection === s.id ? '2px solid var(--adm-orange)' : '2px solid transparent',
                transition:'all var(--adm-dur-fast)',
              }}
            >
              <s.icon size={13} />
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <form onSubmit={handleSave}>
          {/* Settings fields */}
          {(activeSection === 'general' || activeSection === 'security') && (
            <div className="adm-card">
              <div className="adm-card-hdr">
                <div className="adm-card-title">{section.label} Settings</div>
                <section.icon size={14} color="var(--adm-t-3)" />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {section.fields.map(f => (
                  <div key={f.key}>
                    <label className="adm-label">{f.label}</label>
                    <input
                      className="adm-input"
                      type={f.type}
                      value={fields[f.key] ?? ''}
                      onChange={e => setFields(prev => ({ ...prev, [f.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feature flags */}
          {activeSection === 'flags' && (
            <div className="adm-card">
              <div className="adm-card-hdr">
                <div className="adm-card-title">Feature Flags</div>
                <Bell size={14} color="var(--adm-t-3)" />
              </div>
              <div style={{ display:'flex', flexDirection:'column' }}>
                {TOGGLES.map((t, i) => (
                  <div key={t.key} style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:20, padding:'16px 0', borderBottom: i < TOGGLES.length - 1 ? '1px solid var(--adm-bdr-0)' : 'none' }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:500, color:'var(--adm-t-0)', marginBottom:3 }}>{t.label}</div>
                      <div style={{ fontSize:11, color:'var(--adm-t-3)' }}>{t.desc}</div>
                    </div>
                    <button
                      type="button"
                      data-on={toggles[t.key] ? '' : undefined}
                      className="adm-toggle"
                      onClick={() => setToggles(prev => ({ ...prev, [t.key]: !prev[t.key] }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeSection === 'integrations' && (
            <div className="adm-card">
              <div className="adm-card-hdr">
                <div className="adm-card-title">Integrations</div>
                <Webhook size={14} color="var(--adm-t-3)" />
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {[
                  { name:'Stripe',      status:'connected',    detail:'Payments & subscriptions' },
                  { name:'Cloudinary',  status:'connected',    detail:'Media storage & CDN' },
                  { name:'Supabase',    status:'connected',    detail:'Primary database' },
                  { name:'Groq AI',     status:'connected',    detail:'LLM inference' },
                  { name:'Slack',       status:'disconnected', detail:'Team notifications' },
                  { name:'PagerDuty',   status:'disconnected', detail:'Incident management' },
                ].map(intg => (
                  <div key={intg.name} style={{ display:'flex', alignItems:'center', gap:14, padding:'12px 0', borderBottom:'1px solid var(--adm-bdr-0)' }}>
                    <div style={{ width:36, height:36, borderRadius:'var(--adm-r-sm)', background:'var(--adm-bg-4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Database size={14} color="var(--adm-t-3)" />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:'var(--adm-t-0)' }}>{intg.name}</div>
                      <div style={{ fontSize:11, color:'var(--adm-t-3)', marginTop:2 }}>{intg.detail}</div>
                    </div>
                    <span className={intg.status === 'connected' ? 'adm-badge adm-badge-green' : 'adm-badge adm-badge-muted'}>
                      {intg.status}
                    </span>
                    <button className="adm-btn adm-btn-ghost adm-btn-sm">
                      {intg.status === 'connected' ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </AdminShell>
  );
}
