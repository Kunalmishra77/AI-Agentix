/* Premium SVG donut chart — animated, labeled */

export default function DonutChart({ segments = [], size = 120, strokeW = 18 }) {
  const r   = (size - strokeW) / 2;
  const cx  = size / 2;
  const cy  = size / 2;
  const circ = 2 * Math.PI * r;

  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;

  let cumulative = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {/* Track */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth={strokeW}
      />

      {segments.map((seg, i) => {
        const dashArray  = (seg.value / total) * circ;
        const dashOffset = circ - cumulative / total * circ;
        cumulative += seg.value;

        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeW - 2}
            strokeDasharray={`${dashArray} ${circ}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: 'stroke-dasharray 0.6s ease, stroke-dashoffset 0.6s ease' }}
          />
        );
      })}

      {/* Center text */}
      {segments.length > 0 && (
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="#F1F5F9" fontFamily="Manrope, sans-serif">
          {total.toLocaleString()}
        </text>
      )}
      <text x={cx} y={cy + 13} textAnchor="middle" fontSize="9" fill="rgba(241,245,249,0.35)" fontFamily="JetBrains Mono, monospace">
        TOTAL
      </text>
    </svg>
  );
}
