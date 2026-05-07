import { useState, useEffect, useMemo } from 'react';

export default function SystemMap({ cats, activeId, onHover, onClick, innerAngle, outerAngle }) {
  const cx = 220, cy = 220, r1 = 80, r2 = 165;
  const inner = cats.slice(0, 4);
  const outer = cats.slice(4);

  const getPosInner = (index, angleOffset = 0) => {
    const angle = (index / 4) * 2 * Math.PI + Math.PI / 4 + innerAngle + angleOffset;
    return { x: cx + r1 * Math.cos(angle), y: cy + r1 * Math.sin(angle), angle };
  };

  const getPosOuter = (index, angleOffset = 0) => {
    const angle = (index / outer.length) * 2 * Math.PI + (-Math.PI / 2 + Math.PI / outer.length) + outerAngle + angleOffset;
    return { x: cx + r2 * Math.cos(angle), y: cy + r2 * Math.sin(angle), angle };
  };

  // Pre-calculate positions to ensure consistency in connections
  const innerPositions = inner.map((_, i) => getPosInner(i));
  const outerPositions = outer.map((_, i) => getPosOuter(i));

  const allNodes = [
    ...inner.map((cat, i) => ({ ...cat, ...innerPositions[i], ring: 'inner' })),
    ...outer.map((cat, i) => ({ ...cat, ...outerPositions[i], ring: 'outer' }))
  ];

  function getCurvePath(p1, p2) {
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;
    const dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
    const bend = dist * 0.2;
    
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const nx = -dy / dist;
    const ny = dx / dist;

    const centerX = (p1.x + p2.x) / 2 - cx;
    const centerY = (p1.y + p2.y) / 2 - cy;
    const dot = centerX * nx + centerY * ny;
    const sign = dot > 0 ? 1 : -1;

    const cpX = midX + nx * bend * sign;
    const cpY = midY + ny * bend * sign;

    return `M ${p1.x} ${p1.y} Q ${cpX} ${cpY} ${p2.x} ${p2.y}`;
  }

  return (
    <div className="system-map-container" style={{ position: 'relative', width: 440, height: 440 }}>
      <svg viewBox="0 0 440 440" width="440" height="440" style={{ display: 'block', maxWidth: '100%', overflow: 'visible' }}>
        <defs>
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="central-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 242, 255, 0.15)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r={r1} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 6"/>
        <circle cx={cx} cy={cy} r={r2} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3 8"/>
        <circle cx={cx} cy={cy} r={r2 + 40} fill="url(#central-glow)" style={{ pointerEvents: 'none' }}/>

        {innerPositions.map((p, i) => {
          const nextP = innerPositions[(i + 1) % innerPositions.length];
          return (
            <path key={`li-path-${i}`} d={getCurvePath(p, nextP)} 
              fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 6"
              className="map-path-flow"
            />
          );
        })}

        {outerPositions.map((po, i) => {
          const pi = innerPositions[i % innerPositions.length];
          const isActive = allNodes[i + 4].id === activeId || allNodes[i % 4].id === activeId;
          return (
            <path key={`lo-path-${i}`} d={getCurvePath(pi, po)}
              fill="none" 
              stroke={isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"} 
              strokeWidth="0.8" strokeDasharray="3 5"
              className="map-path-flow"
              style={{ transition: 'stroke 0.3s' }}
            />
          );
        })}

        <g style={{ pointerEvents: 'none' }}>
          <circle cx={cx} cy={cy} r={28} fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={8} fill="#00f2ff" style={{ filter: 'drop-shadow(0 0 12px rgba(0,242,255,0.8))' }}/>
          <circle cx={cx} cy={cy} r={18} fill="none" stroke="#00f2ff" strokeWidth="1" opacity="0.2">
             <animate attributeName="r" from="18" to="26" dur="2s" repeatCount="indefinite" />
             <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {allNodes.map((node) => {
          const isActive = node.id === activeId;
          const labelDist = node.ring === 'inner' ? 26 : 24;
          const labelX = node.x + Math.cos(node.angle) * labelDist;
          const labelY = node.y + Math.sin(node.angle) * labelDist;

          return (
            <g key={node.id} style={{ cursor: 'pointer' }}
              onMouseEnter={() => onHover(node.id)}
              onClick={(e) => { e.stopPropagation(); onClick(node.id); }}>
              
              <circle cx={node.x} cy={node.y} r={20} fill="transparent" />

              <circle cx={node.x} cy={node.y} r={isActive ? 8 : 5}
                fill={node.accent}
                style={{ 
                  filter: isActive ? `drop-shadow(0 0 15px ${node.accent})` : 'none',
                  transition: 'r 0.3s, filter 0.3s'
                }}
              />
              
              <circle cx={node.x} cy={node.y} r={isActive ? 14 : 9} 
                fill="none" stroke={node.accent} strokeWidth="1.5" 
                opacity={isActive ? 0.4 : 0.15}
                style={{ transition: 'r 0.3s, opacity 0.3s' }}
              />

              <g transform={`translate(${labelX}, ${labelY})`}>
                 <rect 
                   x={-35} y={-10} width={70} height={20} rx={4}
                   fill="rgba(0,0,0,0.8)" 
                   stroke={isActive ? node.accent : "rgba(255,255,255,0.15)"}
                   strokeWidth={isActive ? 1.5 : 1}
                   style={{ transition: 'stroke 0.3s' }}
                 />
                 <text 
                   y={4} textAnchor="middle" 
                   fill={isActive ? node.accent : "var(--ink-2)"}
                   fontSize="9" fontWeight="700" fontFamily="monospace"
                   letterSpacing="0.05em"
                   style={{ transition: 'fill 0.3s' }}
                 >
                   {node.short.toUpperCase()}
                 </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
