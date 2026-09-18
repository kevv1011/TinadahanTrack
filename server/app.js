// app.js — Express API for TindahanTrack
// Routes: GET /api/items, POST /api/items, PATCH /api/items/:id/stock, DELETE /api/items/:id
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3001;

// ── Database pool ─────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ── Middleware ────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',');
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// ── Health check ──────────────────────────────────────────────────
app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));

// ── GET /api/items ────────────────────────────────────────────────
app.get('/api/items', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items ORDER BY id;');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/items ───────────────────────────────────────────────
app.post('/api/items', async (req, res) => {
  const { name, category, price, current_stock, min_threshold } = req.body;
  if (!name || !category) return res.status(400).json({ error: 'name and category are required' });
  try {
    const { rows } = await pool.query(
      `INSERT INTO items (name, category, price, current_stock, min_threshold)
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [name, category, price ?? 0, current_stock ?? 0, min_threshold ?? 5]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /api/items/:id ────────────────────────────────────────────
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, price, current_stock, min_threshold } = req.body;
  if (!name || !category) return res.status(400).json({ error: 'name and category are required' });
  try {
    const { rows } = await pool.query(
      `UPDATE items
          SET name = $1, category = $2, price = $3,
              current_stock = $4, min_threshold = $5
        WHERE id = $6
        RETURNING *;`,
      [name, category, price ?? 0, current_stock ?? 0, min_threshold ?? 5, id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Item not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PATCH /api/items/:id/stock ────────────────────────────────────
app.patch('/api/items/:id/stock', async (req, res) => {
  const { id } = req.params;
  const { delta } = req.body;
  if (typeof delta !== 'number') return res.status(400).json({ error: 'delta must be a number' });
  try {
    const { rows } = await pool.query(
      `UPDATE items
          SET current_stock = GREATEST(0, current_stock + $1)
        WHERE id = $2
        RETURNING *;`,
      [delta, id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Item not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── DELETE /api/items/:id ─────────────────────────────────────────
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM items WHERE id = $1;', [id]);
    if (!rowCount) return res.status(404).json({ error: 'Item not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start ─────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`TindahanTrack API running on http://localhost:${PORT}`));
