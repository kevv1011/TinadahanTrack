// db-reset.js — drops and recreates the items table, seeds 20 rows.
// Run: npm run db:reset (from server/)
import 'dotenv/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const { Pool } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error('❌  DATABASE_URL is not set. Check server/.env');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  const sql = readFileSync(join(__dirname, '..', 'schema.sql'), 'utf8');
  const client = await pool.connect();
  try {
    console.log('🔗  Connecting to Neon PostgreSQL…');
    await client.query(sql);
    const { rows } = await client.query('SELECT COUNT(*) FROM items;');
    console.log(`✅  db:reset complete — ${rows[0].count} rows in items table.`);
  } catch (err) {
    console.error('❌  db:reset failed:\n', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
