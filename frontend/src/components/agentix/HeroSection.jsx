import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AgentixIcon from './AgentixIcon';
import SystemMap from './SystemMap';
import AGENTIX_DATA from '../../data/agentixData';

function HeroPreviewCard({ category, active, style }) {
  if (!category) return null;

  return (
    <div className={`hero-preview ${active ? 'active' : ''}`} style={{ 
      ...style, 
      opacity: active ? 1 : 0,
      pointerEvents: active ? 'auto' : 'none',
    }}>
      <div className="hero-preview-head">
        <span className="chip" style={{ borderColor: `rgba(${category.accentRgb}, 0.3)`, color: category.accent, background: 'rgba(0,0,0,0.4)' }}>
          <span className="chip-dot" style={{ background: category.accent }}/>{category.short}
        </span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', opacity: 0.8 }}>{category.id}.agentix</span>
      </div>
      
      <div className="hero-preview-greet">
        <h3 className="h-3" style={{ margin: 0, fontWeight: 700, fontSize: '1.4rem', lineHeight: 1.2 }}>{category.name}</h3>
        <p className="body-sm" style={{ marginTop: 10, lineHeight: 1.5, color: 'var(--ink-2)' }}>{category.promise}</p>
      </div>

      <div className="hero-preview-list">
        {category.featured.slice(0, 4).map(t => {
          const slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <Link key={t} to={`/tools/${slug}`} className="hero-preview-row">
              <span className="row-dot" style={{ background: category.accent }}/>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--ink-0)', fontWeight: 500 }}>{t}</span>
              <AgentixIcon name="arrow" size={12} color="var(--ink-3)"/>
            </Link>
          );
        })}
      </div>

      <div className="hero-preview-footer">
        <Link to={`/category/${category.id}`} className="hero-preview-cta" style={{ '--cat-accent': category.accent }}>
          Open {category.short} workspace <AgentixIcon name="arrow" size={12}/>
        </Link>
        
        <div className="ask-agentix-mini">
           <div className="ask-dot" />
           <span>Ask Agentix</span>
           <span className="kb-hint">⌘K</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [activeId, setActiveId] = useState(null);
  const [lockedId, setLockedId] = useState(null);
  const [innerAngle, setInnerAngle] = useState(0);
  const [outerAngle, setOuterAngle] = useState(0);

  const cats = AGENTIX_DATA.categories;
  const currentId = lockedId || activeId;
  const activeIndex = cats.findIndex(c => c.id === currentId);
  const active = cats[activeIndex];

  useEffect(() => {
    const id = setInterval(() => {
      setInnerAngle(a => (a + 0.004) % (2 * Math.PI));
      setOuterAngle(a => (a - 0.003 + 2 * Math.PI) % (2 * Math.PI));
    }, 50);
    return () => clearInterval(id);
  }, []);

  // Calculate coordinates for the active node to position the card
  const cx = 220, cy = 220, r1 = 80, r2 = 165;
  let nodePos = { x: cx, y: cy };
  
  if (activeIndex !== -1) {
    if (activeIndex < 4) {
      const angle = (activeIndex / 4) * 2 * Math.PI + Math.PI / 4 + innerAngle;
      nodePos = { x: cx + r1 * Math.cos(angle), y: cy + r1 * Math.sin(angle) };
    } else {
      const idx = activeIndex - 4;
      const angle = (idx / 5) * 2 * Math.PI + (-Math.PI / 2 + Math.PI / 5) + outerAngle;
      nodePos = { x: cx + r2 * Math.cos(angle), y: cy + r2 * Math.sin(angle) };
    }
  }

  // Determine card position (offset from node) using percentages for accurate scaling
  const isRightHalf = nodePos.x > cx;
  const leftPct = (nodePos.x / 440) * 100;
  const topPct = (nodePos.y / 440) * 100;
  
  const cardStyle = {
    left: isRightHalf ? 'auto' : `calc(${leftPct}% + 24px)`,
    right: isRightHalf ? `calc(${100 - leftPct}% + 24px)` : 'auto',
    top: `${topPct}%`,
    transform: `translateY(-50%) scale(${currentId ? 1 : 0.95})`,
  };

  const handleHover = (id) => {
    if (!lockedId && id) {
      setActiveId(id);
    }
  };

  const handleClick = (id) => {
    if (lockedId === id) {
      setLockedId(null);
    } else {
      setLockedId(id);
      setActiveId(id);
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg-glow"/>
      <div className="container-wide hero-inner">
        <div className="hero-left">
          <div className="hero-eyebrow chip">
            <span className="chip-dot" style={{ background: 'var(--accent)' }}/>
            <span style={{ color: 'var(--ink-1)' }}>The AI operating system · v4 release</span>
          </div>
          <h1 className="h-display hero-headline">
            <span className="hero-line">An AI Operating System.</span> 
            <span className="hero-line" style={{ color: 'var(--ink-2)' }}>Not another stack of tools.</span>
          </h1>
          <p className="body-lg hero-sub fade-up" style={{ animationDelay: '0.4s', maxWidth: 560 }}>
            Content, growth, sales, research, support, operations, and business systems —
            <span style={{ color: 'var(--ink-0)' }}> connected in one intelligent platform.</span>
          </p>
          <div className="hero-ctas fade-up" style={{ animationDelay: '0.55s' }}>
            <Link to="/talk-to-agentix" className="btn btn-primary btn-lg">
              <AgentixIcon name="mic" size={14}/>Talk to Agentix
            </Link>
            <Link to="/tools" className="btn btn-secondary btn-lg">
              Explore Tools <AgentixIcon name="arrow" size={14}/>
            </Link>
          </div>
          <div className="hero-trust fade-up" style={{ animationDelay: '0.7s' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Built for</span>
            <span style={{ color: 'var(--ink-2)', fontSize: 13 }}>B2B startups · SMEs · agencies · founder-led teams</span>
          </div>
          <div className="hero-meta">
            {[['9','categories'],['40','subcategories'],['121','tools'],['1','assistant']].map(([n, l]) => (
              <div key={l} className="hero-meta-item">
                <div className="hero-meta-num">{n}</div>
                <div className="hero-meta-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-map">
            <SystemMap 
              cats={cats} 
              activeId={currentId} 
              onHover={handleHover} 
              onClick={handleClick}
              innerAngle={innerAngle}
              outerAngle={outerAngle}
            />
            <HeroPreviewCard 
              category={active} 
              active={!!currentId}
              style={cardStyle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
