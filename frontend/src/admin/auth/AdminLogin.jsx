import { useState } from 'react';
import { useAdminAuth } from './useAdminAuth';

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await login(email, password);
    setLoading(false);
    if (!ok) {
      setError('Invalid credentials. Check email and password.');
      setPassword('');
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#07080A',
      display: 'grid', placeItems: 'center',
      position: 'relative', overflow: 'hidden',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 600px 400px at 50% 40%, rgba(232,117,32,0.07), transparent 70%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        width: 'min(400px, calc(100vw - 32px))',
        padding: '40px',
        background: 'rgba(15,18,25,0.8)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img src="/assets/clients/logo.png" alt="AGENTiX" style={{ width: 56, height: 56, objectFit: 'contain', marginBottom: 16 }} />
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 10,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 8,
          }}>Admin Console</div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 24,
            fontWeight: 600, letterSpacing: '-0.02em',
            color: 'var(--ink-0)', margin: 0,
          }}>Sign in</h1>
        </div>

        <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Email</label>
            <input
              type="email" required
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@domain.com"
              autoCapitalize="none" autoCorrect="off"
              className="admin-input"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: 'var(--ink-0)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Password</label>
            <input
              type="password" required
              value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: 'var(--ink-0)', fontFamily: 'var(--font-body)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
            />
          </div>

          {error && (
            <p style={{ fontSize: 12, color: 'var(--err)', textAlign: 'center', margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4,
              background: loading ? 'rgba(232,117,32,0.4)' : 'var(--accent)',
              border: 'none', borderRadius: 8,
              padding: '12px', width: '100%',
              fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600,
              color: '#fff', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Authenticating...' : 'Access Console'}
          </button>
        </form>
      </div>
    </div>
  );
}
