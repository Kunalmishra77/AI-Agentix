import { useMemo } from 'react';

const DURATION_MS = 2200;
const FADE_MS = 500;
const PARTICLE_COUNT = 8;

export default function Preloader({ fadeOut }) {
  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      delay: i * 160,
      dx: Math.cos((i / PARTICLE_COUNT) * Math.PI * 2) * (90 + (i % 3) * 20),
      dy: Math.sin((i / PARTICLE_COUNT) * Math.PI * 2) * (70 + (i % 3) * 16),
      size: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3,
    })),
  []);

  return (
    <>
      <div
        className="preloader-root"
        style={{
          opacity: fadeOut ? 0 : 1,
          visibility: fadeOut ? 'hidden' : 'visible',
          transition: `opacity ${FADE_MS}ms ease, visibility ${FADE_MS}ms ease`,
        }}
      >
        {/* Warm ambient glow — enhances the light bg */}
        <div className="preloader-glow" />

        <div className="preloader-stage">
          {/* Logo area with spinning accent ring */}
          <div className="preloader-logo-wrap">
            {/* Outer spinning arc */}
            <div className="preloader-arc" />
            {/* Inner slow counter-arc */}
            <div className="preloader-arc-inner" />

            {/* The actual logo — shown at full size, no filter, exact colors */}
            <img
              src="/assets/clients/logo.png"
              alt="Agentix"
              className="preloader-logo"
            />

            {/* Floating orange dot particles */}
            {particles.map((p) => (
              <span
                key={p.id}
                className="preloader-particle"
                style={{
                  '--p-dx': `${p.dx}px`,
                  '--p-dy': `${p.dy}px`,
                  width: p.size,
                  height: p.size,
                  animationDelay: `${p.delay}ms`,
                }}
              />
            ))}
          </div>

          {/* Tagline */}
          <p className="preloader-tagline">AI Operating System · v4</p>

          {/* Progress bar */}
          <div className="preloader-track">
            <div
              className="preloader-bar"
              style={{ animationDuration: `${DURATION_MS}ms` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        /* Light warm background — matches the logo's design context */
        .preloader-root {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: radial-gradient(1200px 800px at 50% 40%, #FFFFFF 0%, #FAF7F4 55%, #F2EDE7 100%);
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        /* Subtle warm glow behind logo */
        .preloader-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(500px 350px at 50% 40%, rgba(232,117,32,0.10), transparent 70%),
            radial-gradient(300px 300px at 70% 70%, rgba(232,117,32,0.05), transparent);
        }

        .preloader-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }

        /* Ring container sized around the logo */
        .preloader-logo-wrap {
          position: relative;
          width: 240px;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        /* Static outer ring */
        .preloader-logo-wrap::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(232,117,32,0.15);
        }

        /* Spinning arc */
        .preloader-arc {
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #E87520;
          border-right-color: rgba(232,117,32,0.3);
          animation: preloader-spin 1.2s linear infinite;
        }

        /* Slow counter-rotating inner arc */
        .preloader-arc-inner {
          position: absolute;
          inset: 22px;
          border-radius: 50%;
          border: 1px solid transparent;
          border-bottom-color: rgba(232,117,32,0.4);
          border-left-color: rgba(232,117,32,0.15);
          animation: preloader-spin-rev 2.8s linear infinite;
        }

        /* Logo image — large, no filter, exact brand colors */
        .preloader-logo {
          width: 160px;
          height: auto;
          object-fit: contain;
          z-index: 2;
          animation: preloader-logo-in 0.5s cubic-bezier(0.2,0.7,0.2,1) both;
          /* Subtle drop shadow to lift logo off light bg */
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.10));
        }

        /* Orange dot particles */
        .preloader-particle {
          position: absolute;
          border-radius: 50%;
          background: #E87520;
          box-shadow: 0 0 6px rgba(232,117,32,0.6);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: preloader-particle-float 2.8s ease-in-out infinite;
          opacity: 0;
        }

        /* Tagline */
        .preloader-tagline {
          font-family: 'Geist Mono', ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9A9DA4;
          margin: 0 0 28px;
          animation: preloader-fade-up 0.5s 0.4s both;
        }

        /* Progress track */
        .preloader-track {
          width: min(320px, 78vw);
          height: 3px;
          background: rgba(10,22,40,0.10);
          border-radius: 999px;
          overflow: hidden;
          animation: preloader-fade-up 0.4s 0.3s both;
        }

        .preloader-bar {
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, #E87520 0%, #FF9A5C 100%);
          border-radius: 999px;
          animation: preloader-bar-grow linear forwards;
          box-shadow: 0 0 8px rgba(232,117,32,0.5);
        }

        /* ── Keyframes ── */
        @keyframes preloader-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes preloader-spin-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes preloader-logo-in {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes preloader-particle-float {
          0%   { opacity: 0; transform: translate(-50%,-50%) translate(0,0) scale(0.5); }
          30%  { opacity: 1; }
          70%  { opacity: 0.5; transform: translate(-50%,-50%) translate(var(--p-dx),var(--p-dy)) scale(1); }
          100% { opacity: 0; transform: translate(-50%,-50%) translate(var(--p-dx),calc(var(--p-dy) + 12px)) scale(0.7); }
        }
        @keyframes preloader-bar-grow {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes preloader-fade-up {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
