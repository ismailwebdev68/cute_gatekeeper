import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Client token and helper exposed as requested
const clientToken = "tok123";
function makeHeader(t: string) { return btoa(t + "|pepper"); }
// Attach helper to window for visibility in devtools
if (typeof window !== 'undefined') {
  // @ts-ignore
  (window as any).makeHeader = makeHeader;
}

const PART_A = "v10l37";

export default function DashboardPage() {
  const router = useRouter();
  const [partB, setPartB] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      const logged = typeof window !== 'undefined' ? localStorage.getItem('logged') : null;
      if (logged !== '1') {
        router.replace('/login');
      }
    } catch {}
  }, [router]);

  async function fetchPartB() {
    setError('');
    setPartB('');
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/get_part_b`
        : '/get_part_b';
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Client-Token': '',
        },
      });
      if (!res.ok) {
        throw new Error(`Invalid Header`);
      }
      const data = await res.json();
      setPartB(data.part_b);
    } catch (e: any) {
      setError(e?.message || 'Failed to fetch PART_B');
    }
  }

  return (
    <div className="ctf-wrap">
      <div className="ctf-card">
        <h1 className="ctf-title">Cute Gatekeeper — Dashboard</h1>
        <p className="ctf-subtitle">Stage 2 — Fetch PART_B from the backend.</p>

        <div className="ctf-panel">
          <div className="ctf-kv">
            <div className="ctf-k"><strong>PART_A</strong></div>
            <div className="ctf-v"><code>{PART_A}</code></div>
            <div className="ctf-k"><strong>PART_B</strong></div>
            <div className="ctf-v">{partB ? <code>{partB}</code> : <em>not fetched</em>}</div>
          </div>
        </div>

        <div className="ctf-actions">
          <button onClick={fetchPartB} className="ctf-btn">Get PART_B</button>
        </div>

        {error && <p className="ctf-error">{error}</p>}

        
      </div>
    </div>
  );
}


