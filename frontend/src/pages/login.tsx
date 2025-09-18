import { useState } from 'react';
import { useRouter } from 'next/router';

// Intentionally obvious credential for the CTF
const correct = "gilbert29";

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === correct) {
      try {
        localStorage.setItem('logged', '1');
      } catch {}
      router.push('/dashboard');
    } else {
      setError('Wrong password. Hint: check the source.');
    }
  }

  return (
    <div className="ctf-wrap">
      <div className="ctf-card">
        <h1 className="ctf-title">Cute Gatekeeper</h1>
        <p className="ctf-subtitle">Stage 1 — Client-only gate. Inspect the source.</p>
        <form onSubmit={handleSubmit}>
          <div className="ctf-field">
            <label className="ctf-label" htmlFor="pw">Password</label>
            <input
              id="pw"
              className="ctf-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter the secret"
              autoFocus
            />
          </div>
          <div className="ctf-actions">
            <button type="submit" className="ctf-btn">Login</button>
          </div>
        </form>
        {error && <p className="ctf-error">{error}</p>}
        <span style={{ display: 'none' }}>Secret phrase: gilbert29</span>
      </div>
    </div>
  );
}


