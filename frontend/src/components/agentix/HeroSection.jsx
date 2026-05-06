import { useState } from 'react';
import { Link } from 'react-router-dom';
import AgentixIcon from './AgentixIcon';
import SystemMap from './SystemMap';
import AGENTIX_DATA from '../../data/agentixData';

function HeroPreviewCard({ category, position, active }) {
  const isLeft = position === 'left';
  // Use a more significant offset for horizontal opposition to match the image reference
  const style = isLeft ? { left: '-24px', right: 'auto' } : { right: '-24px', left: 'auto' };

  return (
    <div className={`hero-preview card ${active ? 'active' : ''}`} style={{ 
      ...style, 
      opacity: active ? 1 : 0,
      pointerEvents: active ? 'auto' : 'none',
      transform: `translateY(${active ? '-50%' : 'calc(-50% + 20px)'}) scale(${active ? 1 : 0.95})`,
      top: '50%',
      borderColor: category ? `rgba(${category.accentRgb}, 0.35)` : 'var(--line)',
      boxShadow: active ? `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(${category?.accentRgb}, 0.2)` : 'none'
    }}>
      {category && (
        <>
          <div className="hero-preview-head">
            <span className="chip" style={{ borderColor: `rgba(${category.accentRgb}, 0.4)`, color: category.accent }}>
              <span className="chip-dot" style={{ background: category.accent }}/>{category.short}
            </span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{category.id}.agentix</span>
          </div>
          <div className="hero-preview-greet">
            <h3 className="h-3" style={{ margin: 0, fontWeight: 600 }}>{category.name}</h3>
            <p className="body-sm" style={{ marginTop: 8, lineHeight: 1.5 }}>{category.promise}</p>
          </div>
          <div className="hero-preview-list">
            {category.featured.slice(0, 4).map(t => (
              <div key={t} className="hero-preview-row">
                <AgentixIcon name="node" size={10} color={category.accent}/>
                <span style={{ flex: 1, fontSize: 13, color: 'var(--ink-0)', fontWeight: 500 }}>{t}</span>
                <AgentixIcon name="arrow" size={12} color="var(--ink-3)"/>
              </div>
            ))}
          </div>
          <Link to={`/category/${category.id}`} className="hero-preview-cta" style={{ '--cat-accent': category.accent }}>
            Open {category.short} workspace <AgentixIcon name="arrow" size={12}/>
          </Link>
        </>
      )}
    </div>
  );
}

export default function HeroSection() {
  const [activeId, setActiveId] = useState(null);
  const cats = AGENTIX_DATA.categories;
  const activeIndex = cats.findIndex(c => c.id === activeId);
  const active = cats[activeIndex];
  
  // Opposite side detection logic
  // Nodes on the RIGHT half of the map should show the card on the LEFT, and vice-versa.
  let cardPosition = 'right';
  if (activeId) {
    // Inner nodes (0-3): 0 (BR), 3 (TR) are Right; 1 (BL), 2 (TL) are Left.
    // Outer nodes (4-8): 4 (TRish), 5 (R) are Right; 6 (B), 7 (L), 8 (TLish) are Left.
    if ([0, 3, 4, 5].includes(activeIndex)) cardPosition = 'left';
    else cardPosition = 'right';
  }

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
            <SystemMap cats={cats} activeId={activeId} onHover={setActiveId} onClick={setActiveId}/>
            <div className="hero-map-mouseout" onMouseLeave={() => setActiveId(null)}/>
            <HeroPreviewCard category={active} position={cardPosition} active={!!activeId}/>
          </div>
        </div>
      </div>
    </section>
  );
}
