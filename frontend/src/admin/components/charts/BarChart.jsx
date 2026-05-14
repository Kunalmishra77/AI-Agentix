/* Premium SVG bar chart — rounded bars, labels, hover highlight */

export default function BarChart({
  data = [],
  labels = [],
  color = '#F97316',
  height = 140,
  showLabels = true,
}) {
  if (!data || data.length === 0) return null;

  const vbW  = 1000;
  const vbH  = height;
  const padL = 0;
  const padR = 0;
  const padT = 8;
  const padB = showLabels ? 28 : 4;
  const chartW = vbW - padL - padR;
  const chartH = vbH - padT - padB;

  const max  = Math.max(...data) * 1.1 || 1;
  const barW = (chartW / data.length) * 0.6;
  const gap  = chartW / data.length;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      style={{ width: '100%', height, display: 'block' }}
      preserveAspectRatio="none"
    >
      {data.map((v, i) => {
        const barH = (v / max) * chartH;
        const x    = padL + gap * i + (gap - barW) / 2;
        const y    = padT + chartH - barH;
        const isLast = i === data.length - 1;
        const fillOpacity = isLast ? 1 : 0.45 + (i / data.length) * 0.35;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={Math.max(barH, 3)}
              rx="3"
              ry="3"
              fill={color}
              fillOpacity={fillOpacity}
            />
            {showLabels && labels[i] && (
              <text
                x={x + barW / 2}
                y={vbH - 6}
                textAnchor="middle"
                fontSize="10"
                fill="rgba(241,245,249,0.25)"
                fontFamily="JetBrains Mono, monospace"
              >
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
