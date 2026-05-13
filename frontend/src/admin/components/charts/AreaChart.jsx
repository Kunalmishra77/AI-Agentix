/* Premium SVG area chart — smooth curves, grid, labels */

export default function AreaChart({
  data = [],
  labels = [],
  color = '#F97316',
  height = 180,
  showGrid = true,
  showDots = false,
  formatY = v => v,
}) {
  if (!data || data.length < 2) return null;

  const vbW  = 1000;
  const vbH  = height;
  const padL = 48;
  const padR = 12;
  const padT = 16;
  const padB = 32;
  const chartW = vbW - padL - padR;
  const chartH = vbH - padT - padB;

  const min = 0;
  const max = Math.max(...data) * 1.12 || 1;

  const pts = data.map((v, i) => ({
    x: padL + (i / (data.length - 1)) * chartW,
    y: padT + chartH - ((v - min) / (max - min)) * chartH,
    v,
  }));

  function buildCurve(points) {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const cx1 = points[i].x + (points[i + 1].x - points[i].x) * 0.5;
      const cx2 = cx1;
      d += ` C ${cx1} ${points[i].y}, ${cx2} ${points[i + 1].y}, ${points[i + 1].x} ${points[i + 1].y}`;
    }
    return d;
  }

  const curvePath = buildCurve(pts);
  const last = pts[pts.length - 1];
  const first = pts[0];
  const areaPath = `${curvePath} L ${last.x} ${padT + chartH} L ${first.x} ${padT + chartH} Z`;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(f => ({
    y: padT + chartH * (1 - f),
    label: formatY(Math.round(min + (max - min) * f)),
  }));

  const gradId = `ac-${color.replace('#', '')}`;

  // Show every Nth label to avoid crowding
  const step = Math.ceil(labels.length / 8);
  const visibleLabelIdxs = labels.map((_, i) => i).filter(i => i % step === 0 || i === labels.length - 1);

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      style={{ width: '100%', height, display: 'block' }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.22" />
          <stop offset="85%"  stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {showGrid && gridLines.map(({ y, label }, i) => (
        <g key={i}>
          <line
            x1={padL} y1={y} x2={vbW - padR} y2={y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
            strokeDasharray={i === 0 ? '0' : '0'}
          />
          <text
            x={padL - 8} y={y + 4}
            textAnchor="end"
            fontSize="11"
            fill="rgba(241,245,249,0.25)"
            fontFamily="JetBrains Mono, monospace"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradId})`} />

      {/* Line */}
      <path
        d={curvePath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Dots */}
      {showDots && pts.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="3" fill={color} />
      ))}

      {/* Last point highlight */}
      <circle cx={last.x} cy={last.y} r="4" fill={color} />
      <circle cx={last.x} cy={last.y} r="8" fill={color} fillOpacity="0.15" />

      {/* X-axis labels */}
      {visibleLabelIdxs.map(i => (
        <text
          key={i}
          x={padL + (i / (labels.length - 1)) * chartW}
          y={vbH - 6}
          textAnchor="middle"
          fontSize="10"
          fill="rgba(241,245,249,0.25)"
          fontFamily="JetBrains Mono, monospace"
        >
          {labels[i]}
        </text>
      ))}
    </svg>
  );
}
