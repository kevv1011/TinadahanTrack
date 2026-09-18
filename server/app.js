// app.js — Express API for TindahanTrack
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pg from 'pg';
import multer from 'multer';
import path from 'path';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, 'uploads');
mkdirSync(UPLOADS_DIR, { recursive: true });

const app = express();
const PORT = process.env.PORT || 3001;

// ── Database pool ─────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ── File upload (multer) ──────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename:    (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (_req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif)/.test(file.mimetype);
    cb(ok ? null : new Error('Only image files are allowed'), ok);
  },
});

// ── Middleware ────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',');
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

// ── Serve uploaded images ─────────────────────────────────────────
app.use('/uploads', express.static(UPLOADS_DIR));

// ── Health check ──────────────────────────────────────────────────
app.get('/healthz', (_req, _res) => _res.json({ status: 'ok' }));

// ── POST /api/upload ─────────────────────────────────────────────
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image file received' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// ── GET /api/items ────────────────────────────────────────────────
app.get('/api/items', async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items ORDER BY id;');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── POST /api/items ─────────────────────────────────────────────
app.post('/api/items', async (req, res) => {
  const { name, category, price, current_stock, min_threshold, image_url } = req.body;
  if (!name || !category) return res.status(400).json({ error: 'name and category are required' });
  try {
    const { rows } = await pool.query(
      `INSERT INTO items (name, category, price, current_stock, min_threshold, image_url)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [name, category, price ?? 0, current_stock ?? 0, min_threshold ?? 5, image_url ?? null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── PUT /api/items/:id ──────────────────────────────────────────────
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, price, current_stock, min_threshold, image_url } = req.body;
  if (!name || !category) return res.status(400).json({ error: 'name and category are required' });
  try {
    const { rows } = await pool.query(
      `UPDATE items
          SET name = $1, category = $2, price = $3,
              current_stock = $4, min_threshold = $5, image_url = $6
        WHERE id = $7
        RETURNING *;`,
      [name, category, price ?? 0, current_stock ?? 0, min_threshold ?? 5, image_url ?? null, id]
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
