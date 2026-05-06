import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AgentixIcon from './AgentixIcon';
import AGENTIX_DATA from '../../data/agentixData';

function slugify(v) {
  return v.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
function toolSlug(v) {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function CategoryMini({ cat }) {
  const tools = cat.featured.slice(0, 5);
  return (
    <svg viewBox="0 0 240 240" className="cat-mini-svg">
      <circle cx="120" cy="120" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 4"/>
      <circle cx="120" cy="120" r="55" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 4"/>
      <circle cx="120" cy="120" r="30" fill={cat.accent} opacity="0.1"/>
      <circle cx="120" cy="120" r="12" fill="var(--bg-1)" stroke={cat.accent} strokeWidth="1.5"/>
      <circle cx="120" cy="120" r="3" fill={cat.accent}/>
      {tools.map((t, i) => {
        const a = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
        const x = 120 + Math.cos(a) * 90;
        const y = 120 + Math.sin(a) * 90;
        return (
          <g key={t}>
            <line x1="120" y1="120" x2={x} y2={y} stroke={cat.accent} strokeWidth="0.6" opacity="0.3" strokeDasharray="2 3"/>
            <circle cx={x} cy={y} r="6" fill="var(--bg-2)" stroke={cat.accent} strokeWidth="1"/>
            <circle cx={x} cy={y} r="2" fill={cat.accent}/>
          </g>
        );
      })}
    </svg>
  );
}

export default function CategoryConstellation() {
  const cats = AGENTIX_DATA.categories;
  const [active, setActive] = useState(cats[0].id);
  const cur = cats.find(c => c.id === active);

  return (
    <section className="section" id="categories">
      <div className="container-wide">
        <div className="sec-head">
          <span className="eyebrow">02 / Category map</span>
          <h2 className="h-1">Nine connected domains. One operating layer.</h2>
        </div>
        <div className="cat-explorer card">
          <div className="cat-rail">
            {cats.map(c => (
              <button key={c.id}
                className={`cat-rail-item ${active === c.id ? 'active' : ''}`}
                onMouseEnter={() => setActive(c.id)}
                onClick={() => setActive(c.id)}
                style={{ '--accent-cat': c.accent }}>
                <span className="cat-rail-dot" style={{ background: c.accent }}/>
                <span className="cat-rail-name">{c.name}</span>
                <AgentixIcon name="chevron" size={12} color="var(--ink-3)"/>
              </button>
            ))}
          </div>
          <div className="cat-stage" style={{ '--accent-cat': cur.accent, '--accent-cat-rgb': cur.accentRgb }}>
            <div className="cat-stage-head">
              <div>
                <span className="chip" style={{ borderColor: `rgba(${cur.accentRgb},0.4)`, color: cur.accent }}>
                  <span className="chip-dot" style={{ background: cur.accent }}/> {cur.short}
                </span>
                <h3 className="h-2" style={{ margin: '14px 0 6px', maxWidth: 480 }}>{cur.name}</h3>
                <p className="body-lg" style={{ maxWidth: 520 }}>{cur.promise}</p>
              </div>
              <Link to={`/category/${cur.id}`} className="btn btn-secondary">View category <AgentixIcon name="arrow" size={12}/></Link>
            </div>
            <div className="cat-stage-grid">
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>Subcategories · {cur.subcategories.length}</div>
                <div className="sub-list">
                  {cur.subcategories.map(s => (
                    <Link key={s.name} to={`/category/${cur.id}/${slugify(s.name)}`} className="sub-row" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)', color: 'inherit' }}>
                      <span className="sub-row-name">{s.name}</span>
                      <span className="sub-row-count mono">{s.tools.length}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>Featured tools</div>
                <div className="featured-list">
                  {cur.featured.map((t, i) => (
                    <Link key={t} to={`/tools/${toolSlug(t)}`} className="featured-row" style={{ animationDelay: `${i * 50}ms`, textDecoration: 'none' }}>
                      <span className="featured-num mono">{String(i + 1).padStart(2, '0')}</span>
                      <span className="featured-name">{t}</span>
                      <span className="featured-arrow"><AgentixIcon name="arrow" size={12} color="currentColor"/></span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="cat-stage-visual">
                <CategoryMini cat={cur}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
