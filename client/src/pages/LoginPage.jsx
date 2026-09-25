import { useState } from 'react';
import { LockKeyhole, Store } from 'lucide-react';
import { API_BASE, loginHeaders } from '../lib/api';

export default function LoginPage({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password) {
      setError('Enter the owner password to continue.');
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
      setError(err.message || 'Unable to sign in.');
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
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
              autoFocus
            />
          </div>
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
