// Custom cursor that replaces the default pointer inside PreloaderGate.
// Within 200px of the orb it lerps toward the orb centre (magnetic pull).
import { useEffect, useRef } from 'react';

export function useMagneticCursor(orbRef, strength = 0.13) {
  const posRef    = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);
  const elRef     = useRef(null);

  useEffect(() => {
    // Touch-primary devices get no magnetic cursor
    if (navigator.maxTouchPoints > 0) return;

    const cursor = document.createElement('div');
    cursor.style.cssText = [
      'position:fixed',
      'width:13px',
      'height:13px',
      'border-radius:50%',
      'background:#E87520',
      'filter:blur(2.5px)',
      'pointer-events:none',
      'z-index:999999',
      'opacity:0',
      'transform:translate(-50%,-50%)',
      'transition:opacity 0.3s',
      'mix-blend-mode:screen',
      'will-change:left,top',
    ].join(';');
    document.body.appendChild(cursor);
    elRef.current = cursor;

    const onMove = (e) => {
      cursor.style.opacity = '1';
      const orb = orbRef.current;
      if (orb) {
        const r    = orb.getBoundingClientRect();
        const cx   = r.left + r.width  / 2;
        const cy   = r.top  + r.height / 2;
        const dx   = e.clientX - cx;
        const dy   = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        targetRef.current = dist < 200
          ? { x: e.clientX - dx * strength, y: e.clientY - dy * strength }
          : { x: e.clientX, y: e.clientY };
      } else {
        targetRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onLeave = () => { cursor.style.opacity = '0'; };

    const tick = () => {
      const p = posRef.current;
      const t = targetRef.current;
      p.x += (t.x - p.x) * 0.16;
      p.y += (t.y - p.y) * 0.16;
      cursor.style.left = p.x + 'px';
      cursor.style.top  = p.y + 'px';
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove',    onMove);
    document.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove',    onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
      if (elRef.current && document.body.contains(elRef.current)) {
        document.body.removeChild(elRef.current);
      }
    };
  }, [orbRef, strength]);
}
