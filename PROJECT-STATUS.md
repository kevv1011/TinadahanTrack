# TindahanTrack — Engineering Status and Handoff

_Updated: 2026-09-20_

## Purpose

TindahanTrack is a mobile-first inventory and point-of-sale dashboard for neighborhood sari-sari stores. It supports inventory management, low-stock alerts, batch sales, transaction history, and inventory-health analytics.

## Current architecture

- `client/` is a Vite + React 19 frontend using React Router, Recharts, Lucide icons, and vanilla CSS.
- `server/` is a Node.js + Express API using `pg`, Multer, and Neon PostgreSQL.
- The React client is hosted on GitHub Pages.
- The local Express server runs on port `3001` and is exposed to the public through an ngrok tunnel.
- The database is hosted on Neon PostgreSQL.

### Live and demo modes

`VITE_USE_MOCK_API` controls the data mode:

| Value | Behaviour |
| --- | --- |
| `false` | Calls the Express API through `VITE_API_BASE_URL`. Every client API request supplies `ngrok-skip-browser-warning: 69420` so ngrok returns JSON rather than its browser warning page. |
| `true` or unset | Uses browser `localStorage` with seeded inventory data instead of the API. |

Demo data keys are `tindahan_items` and `tindahan_tx`.

## Key application flows

### Inventory and sales

- `App.jsx` owns inventory, transaction, cart, loading, theme, and live API-error state.
- Products support add, edit, delete, image upload, and individual stock adjustments.
- The POS Quick Cart stages multiple products, protects against deducting more than available stock, calculates the sale total, accepts cash tendered, and calculates change.
- Batch checkout calls `PATCH /api/items/batch-deduct` in live mode. The server deducts stock and writes transactions in one database transaction.
- Demo Mode performs equivalent inventory and transaction updates in `localStorage`.
- Live batch checkout optimistically updates the UI, reconciles returned server data, and restores the previous inventory if the API request fails.

### Existing API routes

- `GET /healthz`
- `GET /api/items`
- `POST /api/items`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`
- `PATCH /api/items/:id/stock`
- `PATCH /api/items/batch-deduct`
- `GET /api/transactions/recent`
- `GET /api/stats`
- `POST /api/upload`

## Database

The Neon schema in `server/schema.sql` defines:

- `items`: inventory data including name, category, price, current stock, threshold, optional image URL, and timestamp.
- `transactions`: completed deductions/sales with item reference, product name snapshot, quantity, total price, and timestamp. Deleting an item cascades to its transactions.

`npm run db:reset` in `server/` recreates the schema and seeds 20 products. It is destructive and should not be run against data that must be retained.

## Deployment and local runbook

Run the live stack in three terminals:

```bash
# Terminal 1
cd server
npm install
npm run dev

# Terminal 2
cd client
npm install
npm run dev
```

```powershell
# Terminal 3 — replace this path with the local ngrok installation path
& "C:\path\to\ngrok.exe" http 3001
```

Copy the public HTTPS forwarding URL into `client/.env` as `VITE_API_BASE_URL` and restart Vite. Free ngrok URLs can change after a tunnel restart; when the GitHub Pages deployment needs live API access, update its build-time `VITE_API_BASE_URL` and redeploy.

For the deployed client, `server/.env` must set `CORS_ORIGINS` to include `https://kevv1011.github.io` and `http://localhost:5173`. Never commit `server/.env` or any Neon connection string.

## Completed work

- Split `/client` and `/server` monorepo structure.
- GitHub Pages frontend deployment workflow.
- Neon-backed Express CRUD API and item-image upload support.
- Dual demo/live data architecture.
- POS Quick Cart, cash/change calculator, batch deduction, and transaction logging.
- Dashboard low-stock alerts, total inventory value, stock-health chart, and recent transactions.
- ngrok browser-warning bypass header on every client API request.
- README documentation for the ngrok-based live architecture and three-terminal setup.

## Current local, uncommitted presentation pass

The following changes are implemented locally and have passed `npm run build` in `client/`, but have not been committed or pushed:

- Completed-sale receipt modal showing items, total, cash tendered, change, and timestamp.
- Visible live API error state with a Retry action.
- Cart floating-action button showing item count and running total.
- Dismissible first-use hint explaining how to begin a sale.
- Warmer cream/berry visual palette and POS feedback styling.
- `CHANGELOG.md` entry documenting this presentation work.

## Analytics phase — implemented locally, uncommitted

The following work is implemented locally and awaits testing:

1. `GET /api/analytics` calculates today/week revenue, items sold, seven-day revenue trend data, and fast-moving products from the existing `transactions` table. No schema migration is required.
2. The dashboard displays today/week revenue cards, a seven-day revenue chart, and a fast-moving-products panel.
3. Demo Mode derives the same metrics from `localStorage` transaction data.
4. Product cards use category-specific visual fallbacks when a product image has not been uploaded.

No commit or push has been performed for this phase.

## Working rules

- Keep `CHANGELOG.md` current for feature, fix, and refactor work.
- Preserve both live API and Demo Mode behaviour.
- Run `npm run build` in `client/` before committing frontend changes.
- Do not commit or push without explicit approval.
- Avoid committing credentials, `.env` files, or transient secrets.
