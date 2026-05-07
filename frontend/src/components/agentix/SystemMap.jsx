import { useMemo } from 'react';

export default function SystemMap({ cats, activeId, onHover, onClick, rotation = 0 }) {
  const cx = 300, cy = 300;
  const ringR = [110, 175, 240];
  
  // Place 9 categories around the core on the outer ring with rotation.
  const positions = useMemo(() => {
    const out = {};
    cats.forEach((c, i) => {
      const angle = (-Math.PI / 2) + (i / cats.length) * Math.PI * 2 + rotation;
      const r = ringR[2];
      out[c.id] = {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        angle,
      };
    });
    return out;
  }, [cats, rotation]);

  // Workflow paths between key adjacent categories (curved)
  const paths = [
    ["content", "marketing"], ["marketing", "sales"], ["sales", "cx"],
    ["cx", "research"], ["research", "ops"], ["ops", "systems"],
    ["systems", "product"], ["product", "finance"], ["finance", "content"],
  ];

  return (
    <div className="system-map-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg viewBox="0 0 600 600" className="systemmap-svg" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
        <defs>
          <radialGradient id="coreGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#5BE9E9" stopOpacity="1"/>
            <stop offset="40%" stopColor="#2DCCE0" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#2DCCE0" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="haloGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#5BE9E9" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#5BE9E9" stopOpacity="0"/>
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5"/>
          </filter>
        </defs>

        {/* Background grid rings */}
        {ringR.map((r, i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray={i===2 ? "0" : "2 4"}/>
        ))}

        {/* Cardinal ticks on outer ring */}
        {Array.from({length: 36}).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const r1 = ringR[2] - 4, r2 = ringR[2] + 4;
          const x1 = cx + Math.cos(a) * r1, y1 = cy + Math.sin(a) * r1;
          const x2 = cx + Math.cos(a) * r2, y2 = cy + Math.sin(a) * r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>;
        })}

        {/* Central halo */}
        <circle cx={cx} cy={cy} r={90} fill="url(#haloGrad)" opacity="0.7"/>

        {/* Workflow paths between categories — animated dashes */}
        {paths.map(([a, b], i) => {
          const pa = positions[a], pb = positions[b];
          if (!pa || !pb) return null;
          // Curve through center area
          const mx = (pa.x + pb.x) / 2;
          const my = (pa.y + pb.y) / 2;
          const dx = mx - cx, dy = my - cy;
          const len = Math.hypot(dx, dy);
          const k = 0.55;
          const ctrlX = cx + dx * k, ctrlY = cy + dy * k;
          const isHot = activeId && (activeId === a || activeId === b);
          return (
            <path key={i}
              d={`M ${pa.x} ${pa.y} Q ${ctrlX} ${ctrlY} ${pb.x} ${pb.y}`}
              fill="none"
              stroke={isHot ? "rgba(91,233,233,0.55)" : "rgba(255,255,255,0.07)"}
              strokeWidth={isHot ? 1.5 : 1}
              strokeDasharray="4 6"
              className="map-path-flow"
              style={{ animationDuration: `${4 + i*0.3}s` }}
            />
          );
        })}

        {/* Spokes from core to active category */}
        {activeId && positions[activeId] && (
          <line x1={cx} y1={cy}
            x2={positions[activeId].x} y2={positions[activeId].y}
            stroke="var(--accent)" strokeWidth="1.5" opacity="0.5"
            strokeDasharray="3 4"
            className="map-path-flow"
            style={{ animationDuration: '1.5s' }}/>
        )}

        {/* Subtle thin spokes to all */}
        {cats.map(c => {
          const p = positions[c.id];
          return <line key={'s'+c.id} x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>;
        })}

        {/* Tool sub-nodes around each category */}
        {cats.map(c => {
          const p = positions[c.id];
          const tools = c.featured.slice(0, 4);
          return (
            <g key={'tools-'+c.id}>
              {tools.map((_, i) => {
                const subAngle = p.angle + (i - (tools.length-1)/2) * 0.18;
                const tx = cx + Math.cos(subAngle) * (ringR[2] + 28);
                const ty = cy + Math.sin(subAngle) * (ringR[2] + 28);
                const dim = activeId && activeId !== c.id;
                return <circle key={i} cx={tx} cy={ty} r={2}
                  fill={dim ? "rgba(255,255,255,0.15)" : c.accent}
                  opacity={activeId === c.id ? 0.95 : 0.55}
                  style={{ transition: 'fill 0.3s, opacity 0.3s' }}/>;
              })}
            </g>
          );
        })}

        {/* Category nodes */}
        {cats.map(c => {
          const p = positions[c.id];
          const isActive = activeId === c.id;
          const dim = activeId && !isActive;
          return (
            <g key={c.id}
              className={`cat-node ${isActive ? 'cat-node-active' : ''}`}
              transform={`translate(${p.x} ${p.y})`}
              onMouseEnter={() => onHover(c.id)}
              onClick={(e) => { e.stopPropagation(); onClick(c.id); }}
              style={{ cursor: 'pointer', opacity: dim ? 0.4 : 1, transition: 'opacity 0.25s' }}>
              {isActive && <circle r="22" fill={c.accent} opacity="0.18" filter="url(#softGlow)"/>}
              <circle r="14" fill="var(--bg-2)" stroke={c.accent} strokeWidth="1.5"/>
              <circle r="4" fill={c.accent}/>
              {isActive && <circle r="14" fill="none" stroke={c.accent} strokeWidth="1" opacity="0.8"
                className="pulse-glow-anim" />}
            </g>
          );
        })}

        {/* Core */}
        <g transform={`translate(${cx} ${cy})`} style={{ pointerEvents: 'none' }}>
          <circle r="60" fill="url(#coreGrad)" opacity="0.6"/>
          <circle r="42" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5"
            className="pulse-soft-anim" />
          <circle r="32" fill="var(--bg-1)" stroke="var(--accent)" strokeWidth="1.2"/>
          <circle r="6" fill="var(--accent)"/>
          <circle r="3" fill="#02141A"/>
        </g>

        {/* Outer ring tick label */}
        <text x={cx} y={cy + ringR[2] + 50}
          textAnchor="middle"
          fontFamily="monospace" fontSize="10"
          letterSpacing="0.2em"
          fill="rgba(255,255,255,0.3)">9 CATEGORIES · 121 TOOLS</text>
      </svg>

      {/* Floating category labels */}
      {cats.map(c => {
        const p = positions[c.id];
        // SVG is 600 viewBox, position labels in % terms
        const left = (p.x / 600) * 100;
        const top = (p.y / 600) * 100;
        const isActive = activeId === c.id;
        // Determine label offset based on quadrant
        const dx = p.x - cx, dy = p.y - cy;
        const offX = dx > 30 ? 24 : dx < -30 ? -24 : 0;
        const offY = dy > 30 ? 18 : dy < -30 ? -18 : 0;
        const align = dx > 30 ? 'start' : dx < -30 ? 'end' : 'center';
        return (
          <div key={c.id}
            className={`cat-label ${isActive ? 'cat-label-active' : ''}`}
            style={{
              position: 'absolute',
              left: `calc(${left}% + ${offX}px)`,
              top: `calc(${top}% + ${offY}px)`,
              textAlign: align,
              transform: `translate(${align==='end' ? '-100%' : align==='center' ? '-50%' : '0'}, -50%)`,
              borderColor: isActive ? c.accent : undefined,
              color: isActive ? c.accent : undefined,
              pointerEvents: 'auto',
              cursor: 'pointer'
            }}
            onMouseEnter={() => onHover(c.id)}
            onClick={(e) => { e.stopPropagation(); onClick(c.id); }}>
            {c.short}
          </div>
        );
      })}
    </div>
  );
}
