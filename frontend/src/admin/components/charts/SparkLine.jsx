/* Premium SVG sparkline — no external library */

export default function SparkLine({ data = [], color = '#F97316', height = 36, strokeWidth = 1.6 }) {
  if (!data || data.length < 2) return null;

  const w = 120;
  const h = height;
  const pad = 2;
  const innerH = h - pad * 2;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => [
    pad + (i / (data.length - 1)) * (w - pad * 2),
    pad + innerH - ((v - min) / range) * innerH,
  ]);

  // Smooth curve via cardinal spline tension
  function smoothPath(points) {
    if (points.length < 2) return '';
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      const cpx1 = x1 + (x2 - x1) * 0.5;
      const cpx2 = x1 + (x2 - x1) * 0.5;
      d += ` C ${cpx1} ${y1}, ${cpx2} ${y2}, ${x2} ${y2}`;
    }
    return d;
  }

  const linePath = smoothPath(pts);
  const lastPt = pts[pts.length - 1];
  const firstPt = pts[0];
  const areaPath = `${linePath} L ${lastPt[0]} ${h} L ${firstPt[0]} ${h} Z`;

  const gradId = `spark-${color.replace('#', '')}-${Math.random().toString(36).slice(2, 6)}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ width: '100%', height, display: 'block' }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={lastPt[0]}
        cy={lastPt[1]}
        r={2.5}
        fill={color}
        filter="none"
      />
    </svg>
  );
}
