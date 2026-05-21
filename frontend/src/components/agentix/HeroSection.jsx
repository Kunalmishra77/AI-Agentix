import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AgentixIcon from './AgentixIcon.jsx';
import SystemMap from './SystemMap.jsx';
import AGENTIX_DATA from '../../data/agentixData.js';

function HeroPreviewCard({ category, active, position }) {
  if (!category) return null;

  return (
    <div className={`hero-preview ${active ? 'active' : ''}`} style={{
      ...position,
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '360px',
      overflow: 'hidden',
      zIndex: 100
    }}>
      <div className="hero-preview-head" style={{ flexShrink: 0, marginBottom: '12px' }}>
        <span className="chip" style={{ borderColor: `rgba(${category.accentRgb}, 0.4)`, color: category.accent }}>
          <span className="chip-dot" style={{ background: category.accent }} />{category.short}
        </span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{category.id}.agentix</span>
      </div>

      <div className="hero-preview-greet" style={{ flexShrink: 0, marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--ink-0)' }}>{category.name}</h3>
        <p style={{ marginTop: 6, fontSize: '0.85rem', lineHeight: 1.4, color: 'var(--ink-2)' }}>{category.promise}</p>
      </div>

      <div className="hero-preview-list" style={{ flexGrow: 1, overflowY: 'auto', gap: '4px', marginBottom: '16px' }}>
        {category.featured.slice(0, 4).map(t => {
          const slug = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <Link key={t} to={`/tools/${slug}`} className="hero-preview-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <AgentixIcon name="node" size={10} color={category.accent} />
              <span style={{ flex: 1, fontSize: 12, color: 'var(--ink-1)' }}>{t}</span>
              <AgentixIcon name="arrow" size={12} color="var(--ink-3)" />
            </Link>
          );
        })}
      </div>

      <div className="hero-preview-footer" style={{ flexShrink: 0 }}>
        <Link to={`/category/${category.id}`} className="hero-preview-cta" style={{
          '--cat-accent': category.accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          fontSize: '12px',
          color: category.accent,
          textDecoration: 'none',
          fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          Open {category.short} workspace <AgentixIcon name="arrow" size={12} />
        </Link>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [activeId, setActiveId] = useState(null);
  const cats = AGENTIX_DATA.categories;
  const active = cats.find(c => c.id === activeId);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // If clicking inside the preview card, don't hide it
      if (e.target.closest('.hero-preview')) return;
      
      // Clear activeId on any other click to hide the card
      setActiveId(null);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const cardPosition = useMemo(() => {
    if (!activeId) return { opacity: 0 };
    const index = cats.findIndex(c => c.id === activeId);
    const staticAngle = (-Math.PI / 2) + (index / cats.length) * Math.PI * 2;
    const dx = Math.cos(staticAngle);
    const dy = Math.sin(staticAngle);

    // Dynamic but stable quadrant positioning
    const posX = dx > 0 ? '5%' : '55%';
    const posY = dy > 0 ? '5%' : '55%';

    return {
      left: posX,
      top: posY,
      opacity: 1,
      transform: 'none'
    };
  }, [activeId, cats]);

  return (
    <section className="hero">
      <div className="hero-bg-glow" />
      <div className="container-wide hero-inner">
        <div className="hero-left">
          <h1 className="h-display hero-headline">
            <span className="hero-line">An AI Operating System.</span> <br />
            <span className="hero-line" style={{ color: 'var(--ink-2)' }}>Not another stack of disconnected tools.</span>
          </h1>
          <p className="body-lg hero-sub fade-up" style={{ animationDelay: '0.4s', maxWidth: 560 }}>
            Content, growth, sales, research, support, operations, and business systems —
            <span style={{ color: 'var(--ink-0)' }}> connected in one intelligent platform.</span>
          </p>
          <div className="hero-ctas fade-up" style={{ animationDelay: '0.55s' }}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => window.dispatchEvent(new CustomEvent('open-voice-agent'))}
            >
              <AgentixIcon name="mic" size={14} />Talk to Agentix
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={(e) => { 
                e.stopPropagation(); 
                setActiveId(null);
                document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Ecosystem <AgentixIcon name="arrow" size={14} />
            </button>
          </div>
          <div className="hero-trust fade-up" style={{ animationDelay: '0.7s' }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Built for</span>
            <span style={{ color: 'var(--ink-2)', fontSize: 13 }}>B2B startups · SMEs · agencies · founder-led teams</span>
          </div>
          <div className="hero-meta">
            {[['9', 'categories'], ['40', 'subcategories'], ['121', 'tools'], ['1', 'assistant']].map(([n, l]) => (
              <div key={l} className="hero-meta-item">
                <div className="hero-meta-num">{n}</div>
                <div className="hero-meta-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div
            className="hero-map"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              inset: 0,
              zIndex: 5,
              opacity: 1,
              transition: 'opacity 0.8s ease'
            }}
          >
            <div className="systemmap-wrap">
              <SystemMap
                cats={cats}
                activeId={activeId}
                onHover={setActiveId}
                onClick={setActiveId}
                rotation={0}
              />
              <HeroPreviewCard
                category={active}
                active={!!activeId}
                position={cardPosition}
              />
            </div>
          </div>
        </div>

        {/* Lightweight mobile alternative — no SVG, no timers */}
        <div className="hero-right-mobile">
          <div className="hero-cat-grid">
            {cats.map(cat => (
              <Link key={cat.id} to={`/category/${cat.id}`} className="hero-cat-pill">
                <span className="hero-cat-dot" style={{ background: cat.accent }} />
                {cat.short}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
