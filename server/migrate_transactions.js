import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id          SERIAL PRIMARY KEY,
        item_id     INTEGER REFERENCES items(id) ON DELETE CASCADE,
        item_name   VARCHAR(120) NOT NULL,
        qty         INTEGER NOT NULL,
        total_price NUMERIC(10, 2) NOT NULL,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
    console.log('Transactions table created or already exists.');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await pool.end();
  }
}

run();
