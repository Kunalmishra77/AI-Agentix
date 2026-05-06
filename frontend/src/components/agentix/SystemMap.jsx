export default function SystemMap({ cats, activeId, onHover, onClick }) {
  const cx = 220, cy = 220, r1 = 80, r2 = 165;
  const inner = cats.slice(0, 4);
  const outer = cats.slice(4);

  function pos(index, total, radius, offsetAngle = 0) {
    const angle = (index / total) * 2 * Math.PI + offsetAngle;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  }

  return (
    <svg viewBox="0 0 440 440" width="440" height="440" style={{ display: 'block', maxWidth: '100%' }}>
      {/* Orbit rings */}
      <circle cx={cx} cy={cy} r={r1} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 6"/>
      <circle cx={cx} cy={cy} r={r2} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 8"/>

      {/* Connector lines */}
      {inner.map((cat, i) => {
        const p = pos(i, 4, r1, Math.PI / 4);
        const isActive = cat.id === activeId;
        return (
          <line key={`li-${cat.id}`} x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke={isActive ? cat.accent : 'rgba(255,255,255,0.06)'}
            strokeWidth={isActive ? 1.5 : 0.8}
            style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
          />
        );
      })}
      {outer.map((cat, i) => {
        const pi = pos(i, outer.length, r2, -Math.PI / 2 + Math.PI / outer.length);
        const closest = inner[i % inner.length];
        const pp = pos(i % 4, 4, r1, Math.PI / 4);
        const isActive = cat.id === activeId;
        return (
          <line key={`lo-${cat.id}`} x1={pp.x} y1={pp.y} x2={pi.x} y2={pi.y}
            stroke={isActive ? cat.accent : 'rgba(255,255,255,0.04)'}
            strokeWidth={isActive ? 1.2 : 0.6}
            style={{ transition: 'stroke 0.2s' }}
          />
        );
      })}

      {/* Center node */}
      <circle cx={cx} cy={cy} r={20} fill="var(--accent-soft)" stroke="rgba(232,117,32,0.3)" strokeWidth="1"/>
      <circle cx={cx} cy={cy} r={12} fill="var(--accent)" style={{ filter: 'drop-shadow(0 0 10px var(--accent-glow))' }}/>
      <text x={cx} y={cy + 34} textAnchor="middle" fill="var(--accent)" fontSize="10" fontWeight="700" fontFamily="monospace" letterSpacing="0.12em" style={{ opacity: 0.8 }}>AGENTIX</text>

      {/* Inner ring nodes */}
      {inner.map((cat, i) => {
        const p = pos(i, 4, r1, Math.PI / 4);
        const isActive = cat.id === activeId;
        return (
          <g key={cat.id} style={{ cursor: 'pointer' }}
            onMouseEnter={() => onHover(cat.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onClick(cat.id)}>
            <circle cx={p.x} cy={p.y} r={isActive ? 24 : 20} fill="rgba(0,0,0,0)" />
            <circle cx={p.x} cy={p.y} r={isActive ? 10 : 7}
              fill={cat.accent}
              opacity={isActive ? 1 : 0.6}
              style={{ filter: isActive ? `drop-shadow(0 0 12px ${cat.accent})` : 'none', transition: 'all 0.3s cubic-bezier(0.2,0.7,0.2,1)' }}
            />
            {isActive && <circle cx={p.x} cy={p.y} r={16} fill="none" stroke={cat.accent} strokeWidth="1.5" opacity="0.4" style={{ animation: 'pulse-glow 2s infinite' }}/>}
            <text x={p.x} y={p.y - 16} textAnchor="middle" fill={isActive ? cat.accent : 'var(--ink-2)'}
              fontSize={isActive ? 11 : 10} fontWeight={isActive ? '700' : '500'} fontFamily="monospace" letterSpacing="0.06em"
              style={{ transition: 'all 0.2s', opacity: isActive ? 1 : 0.7 }}>
              {cat.short.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Outer ring nodes */}
      {outer.map((cat, i) => {
        const p = pos(i, outer.length, r2, -Math.PI / 2 + Math.PI / outer.length);
        const isActive = cat.id === activeId;
        return (
          <g key={cat.id} style={{ cursor: 'pointer' }}
            onMouseEnter={() => onHover(cat.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onClick(cat.id)}>
            <circle cx={p.x} cy={p.y} r={28} fill="rgba(0,0,0,0)" />
            <circle cx={p.x} cy={p.y} r={isActive ? 9 : 6}
              fill={cat.accent}
              opacity={isActive ? 1 : 0.55}
              style={{ filter: isActive ? `drop-shadow(0 0 15px ${cat.accent})` : 'none', transition: 'all 0.3s cubic-bezier(0.2,0.7,0.2,1)' }}
            />
            {isActive && <circle cx={p.x} cy={p.y} r={15} fill="none" stroke={cat.accent} strokeWidth="1.2" opacity="0.4" style={{ animation: 'pulse-glow 2s infinite' }}/>}
            <text x={p.x} y={p.y - 15} textAnchor="middle" fill={isActive ? cat.accent : 'var(--ink-3)'}
              fontSize={isActive ? 11 : 10} fontWeight={isActive ? '700' : '500'} fontFamily="monospace" letterSpacing="0.06em"
              style={{ transition: 'all 0.2s', opacity: isActive ? 1 : 0.75 }}>
              {cat.short.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Ambient glow at center */}
      <radialGradient id="cglow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(232,117,32,0.2)"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <circle cx={cx} cy={cy} r={80} fill="url(#cglow)" style={{ pointerEvents: 'none', opacity: 0.6 }}/>
    </svg>
  );
}
