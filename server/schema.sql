-- TindahanTrack — PostgreSQL schema
-- Run via: npm run db:reset (from server/)

DROP TABLE IF EXISTS items;

CREATE TABLE items (
  id             SERIAL PRIMARY KEY,
  name           VARCHAR(120)   NOT NULL,
  category       VARCHAR(60)    NOT NULL,
  price          NUMERIC(10, 2) NOT NULL DEFAULT 0,
  current_stock  INTEGER        NOT NULL DEFAULT 0,
  min_threshold  INTEGER        NOT NULL DEFAULT 5,
  image_url      TEXT,
  created_at     TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  id          SERIAL PRIMARY KEY,
  item_id     INTEGER REFERENCES items(id) ON DELETE CASCADE,
  item_name   VARCHAR(120) NOT NULL,
  qty         INTEGER NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Seed data ────────────────────────────────────────────────────
INSERT INTO items (name, category, price, current_stock, min_threshold) VALUES
  ('Piattos Cheese',         'Snacks',        22.00, 18,  5),
  ('Boy Bawang Garlic',      'Snacks',        15.00, 25,  5),
  ('Oishi Prawn Crackers',   'Snacks',        12.00, 30,  5),
  ('Chippy Barbecue',        'Snacks',        10.00,  3,  5),
  ('Argentina Corned Beef',  'Canned Goods',  42.00, 12,  5),
  ('Century Tuna Flakes',    'Canned Goods',  38.00,  8,  5),
  ('Ligo Sardines',          'Canned Goods',  18.00, 20,  5),
  ('San Mig Light 330ml',    'Beverages',     45.00, 24, 10),
  ('Coke Mismo',             'Beverages',     15.00, 36, 10),
  ('RC Cola 250ml',          'Beverages',     12.00,  2, 10),
  ('Kopiko Brown 25g',       'Beverages',      7.00, 40, 10),
  ('Lucky Me Pancit Canton', 'Noodles',       14.00, 48, 10),
  ('Nissin Cup Noodles',     'Noodles',       28.00, 15,  5),
  ('Payless Mami',           'Noodles',        8.00,  4, 10),
  ('Alaska Evap 140ml',      'Dairy',         22.00, 14,  5),
  ('Bear Brand 33g',         'Dairy',         12.00, 50, 10),
  ('Safeguard Ivory 60g',    'Personal Care', 28.00, 10,  3),
  ('Colgate Fresh Cool 22ml','Personal Care', 12.00,  1,  5),
  ('Joy Lemon 22ml',         'Household',      8.00, 18,  5),
  ('Surf Powder 55g',        'Household',     10.00, 22,  5);
