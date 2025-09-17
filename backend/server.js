import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// CORS: allow all origins for simplicity in CTF context
app.use(cors());

// Simple healthcheck
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'Cute Gatekeeper backend' });
});

// GET /get_part_b
// - Expects header X-Client-Token that equals EXPECTED_CLIENT_TOKEN (env)
// - If correct, returns { part_b: 'fluff' }
// - Else, 403
app.get('/get_part_b', (req, res) => {
  const expected = process.env.EXPECTED_CLIENT_TOKEN || '';
  const received = req.header('X-Client-Token') || '';

  if (!expected) {
    return res.status(500).json({ error: 'Server not configured: EXPECTED_CLIENT_TOKEN missing' });
  }

  if (received === expected) {
    return res.json({ part_b: '3v3rg4rd3n' });
  }

  return res.status(403).json({ error: 'Forbidden' });
});

app.listen(PORT, () => {
  console.log(`Cute Gatekeeper backend listening on http://localhost:${PORT}`);
});


