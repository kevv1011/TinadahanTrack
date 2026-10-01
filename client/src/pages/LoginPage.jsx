import { useState } from 'react';
import { LockKeyhole, Store, Eye, EyeOff } from 'lucide-react';
import { API_BASE, loginHeaders } from '../lib/api';

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password) {
      setError('Please enter the owner password to continue.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: loginHeaders(),
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.token) {
        throw new Error(data.error || 'Unable to sign in.');
      }
      onLogin(data.token);
    } catch (err) {
      const msg = err.message === 'Incorrect owner password.'
        ? 'Incorrect password. If you have not changed it yet, the default is admin123.'
        : (err.message || 'Unable to sign in.');
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="owner-login-title">
        <div className="login-card__brand"><Store size={28} aria-hidden="true" /></div>
        <p className="login-card__eyebrow">TindahanTrack Live Mode</p>
        <h1 id="owner-login-title">Owner sign in</h1>
        <p className="login-card__copy">Enter the store owner password to access live inventory and sales data.</p>
        <form onSubmit={handleSubmit} className="login-card__form">
          <label htmlFor="owner-password">Owner password</label>
          <div className="login-card__field">
            <LockKeyhole size={18} aria-hidden="true" />
            <input
              id="owner-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
              placeholder="e.g. admin123"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', color: 'inherit', display: 'flex', alignItems: 'center' }}
              title={showPassword ? 'Hide password' : 'Show password'}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            💡 Default password: <strong>admin123</strong>
          </span>
          {error && <p className="login-card__error" role="alert">{error}</p>}
          <button className="btn btn--primary login-card__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
          <button 
            type="button" 
            className="btn login-card__submit" 
            style={{ marginTop: 'var(--space-2)', background: 'rgba(255, 255, 255, 0.1)', color: 'inherit' }}
            onClick={() => {
              window.localStorage.setItem('force_demo_mode', 'true');
              window.location.reload();
            }}
          >
            Test in Demo Mode
          </button>
        </form>
      </section>
    </main>
  );
}
