<div align="center">
  <img src="public/logo.png" alt="TindahanTrack Logo" width="120" style="border-radius: 20px;" />
  <br/>
  <h1>TindahanTrack</h1>
</div>

A mobile-first inventory dashboard that helps a neighborhood sari-sari store owner track retail prices, update stock levels, and automatically generate a reorder list when items fall below a minimum threshold.

**Live site:** [https://kevv1011.github.io/TindahanTrack/](https://kevv1011.github.io/TindahanTrack/)
**API:** [https://your-api.onrender.com/healthz](https://your-api.onrender.com/healthz) *(not yet deployed)*
**Demo video:** *(link — to be added before finals)*

> **⚠ Demo mode is active.**
> The interface is real and fully interactive; the backend is simulated in your browser so the site works without a server. See [Demo mode](#demo-mode) below. Delete this notice once your API is live.

---

## What it does

- View a **live low-stock alert dashboard** — items that fall below their minimum threshold appear instantly so you know what to reorder today
- **Browse the full inventory** in a filterable, searchable grid organized by category
- **Update stock counts** with one-tap `−` / `+` buttons directly on each product card
- **Add new products** through a validated form with a category dropdown and a success toast notification
- **Experience fully interactive offline "Demo Mode"** — all data interactions persist across reloads using the browser's `localStorage` until the backend is integrated
- **Edit or delete** existing products (placeholder — will connect to backend API in Week 2)

---

## Built with

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 6, React Router v6 |
| Styling | Plain CSS with custom properties (design tokens) |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Client host | GitHub Pages |
| API host | *(Render / Railway — to be deployed)* |
| DB host | *(Neon / Supabase — to be provisioned)* |

---

## Demo mode

This project can run two ways, chosen by one environment variable at build time.

**Demo mode is the default.** Only the exact string `false` turns it off, so a forgotten or mistyped variable leaves you on the simulated backend with a visible notice rather than a silently broken build.

| `VITE_USE_MOCK_API` | What happens |
|---------------------|-------------|
| unset, or `true` | The client answers its own requests from `localStorage`. No server, no database, nothing shared between visitors. This is what ships with the template, so the GitHub Pages link works on day one. |
| `false` | The client calls the real Express API at `VITE_API_BASE_URL`, which reads and writes real PostgreSQL. |

> Demo mode is a starting point and a fallback, not a finished project. The finals submission requires all three pieces deployed and talking to each other. Demo mode lets you build and validate the full interface in Week 1 before the API exists.

GitHub Pages serves static files and cannot run Node. The API and database must go elsewhere:

| Piece | Options |
|-------|---------|
| API | Render, Railway, Fly.io, Koyeb, or a self-hosted VPS |
| Database | Neon, Supabase, Railway, Aiven, or your own PostgreSQL |

---

## Running it yourself

### Frontend only — demo mode, no database needed

```bash
# From the project root
npm install
cp .env.example .env         # VITE_USE_MOCK_API stays true (default)
npm run dev                  # http://localhost:5173
```

### Full stack — needs a running PostgreSQL instance

```bash
# 1. Start a local PostgreSQL database
#    (skip if you have one already)
createdb tindahantrack

# 2. Load the schema and seed data
psql -d tindahantrack -f server/schema.sql

# 3. Start the API server
cd server
npm install
cp .env.example .env         # set DATABASE_URL=postgres://localhost/tindahantrack
node app.js                  # http://localhost:3001

# 4. Start the frontend (in a second terminal)
cd ..
cp .env.example .env         # set VITE_USE_MOCK_API=false
npm run dev                  # http://localhost:5173
```

Check the API on its own before you blame the frontend:

```bash
curl http://localhost:3001/api/items     # should return a JSON array
```

---

## Environment variables

None of these are committed. `.env.example` in each folder lists them with placeholder values.

| Name | Where | What it is |
|------|-------|-----------|
| `DATABASE_URL` | `server/` | PostgreSQL connection string. Contains a password — never commit it. |
| `CORS_ORIGINS` | `server/` | Comma-separated origins allowed to call the API (e.g. `http://localhost:5173`) |
| `NODE_ENV` | `server/` | Set to `production` on your host |
| `PORT` | `server/` | Set by the host automatically — do not set it yourself |
| `VITE_USE_MOCK_API` | root (client, build time) | Only `false` turns demo mode off; unset means on |
| `VITE_API_BASE_URL` | root (client, build time) | Your API's public URL, no trailing slash |

> Every `VITE_` value is compiled into the built JavaScript bundle and is **public**. Never put a password, secret key, or connection string in one.

---

## Deploying

### Client → GitHub Pages

Already wired up in `.github/workflows/deploy-pages.yml`. Two one-time steps:

1. **Settings › Pages › Build and deployment › Source: GitHub Actions.**
   Without this the workflow goes green but publishes nothing.
2. Nothing else until your API is live. Demo mode is the default, so the first deploy works on its own.

When the API is up, add these under **Settings › Secrets and variables › Actions › Variables**, then re-run the workflow:
- `VITE_USE_MOCK_API` = `false`
- `VITE_API_BASE_URL` = your API's public URL

> The repository must be **public** for GitHub Pages to serve it on a free account.

### API + Database

Not automated here — most hosts (Render, Railway) deploy straight from your repository with no workflow needed. Point your host at the `server/` folder, set the environment variables in its dashboard, and run `server/schema.sql` once against the hosted database.

---

## Project structure

```
TindahanTrack/
├── src/                        # React frontend (Vite entry point)
│   ├── components/
│   │   ├── atoms/              # Smallest pieces: Button, Input, StockBadge, Toast…
│   │   ├── molecules/          # Small groups: ProductCard, AlertRow, SummaryCard…
│   │   └── organisms/          # Full sections: Header, BottomNav, ProductGrid…
│   ├── pages/                  # Top-level route screens
│   │   ├── DashboardPage.jsx   # / — low-stock alert hub
│   │   ├── InventoryPage.jsx   # /inventory — filterable, searchable product grid
│   │   └── AddProductPage.jsx  # /add-item — validated add-product form
│   ├── App.jsx                 # BrowserRouter, global state (items, isLoading)
│   ├── styles.css              # All design tokens + component CSS (no framework)
│   └── main.jsx                # React 18 createRoot entry point
├── server/
│   ├── app.js                  # Express: GET/POST /api/items, PATCH /api/items/:id/stock, DELETE
│   └── schema.sql              # items table + auto updated_at trigger + 20 seed rows
├── final-project-planning/     # All planning docs and weekly submissions
│   ├── 01-proposal.md
│   ├── 02-wireframes.md
│   ├── 03-design-system.md
│   ├── mockup.html             # Static HTML/CSS visual mockup (all 3 screens)
│   ├── journal-week-1.md
│   └── report-week-1.md
├── CHANGELOG.md                # Agent-maintained log of every file change
└── .env.example                # Placeholder environment variables
```

---

## Architecture

The React frontend (served as static files from GitHub Pages) communicates with an Express REST API hosted on a separate service. The API reads and writes a PostgreSQL database. At build time, a single environment variable (`VITE_USE_MOCK_API`) switches the frontend between calling the real API or answering its own requests from `localStorage` — so the UI works and is gradeable even before the backend is deployed.

```
Browser (GitHub Pages)
  └── React SPA
        ├── [demo mode]  → localStorage (no server needed)
        └── [live mode]  → Express API (Render/Railway)
                                └── PostgreSQL (Neon/Supabase)
```

---

## What I would do next

- **Connect the backend:** Install PostgreSQL, run `schema.sql`, wire `App.jsx` to fetch real data from `GET /api/items` and call `PATCH /api/items/:id/stock` on every `−`/`+` click.
- **Implement real Edit/Delete:** Replace the `window.alert()` placeholders in `ProductCard.jsx` with a modal edit form and a confirmed `DELETE /api/items/:id` call.
- **Deploy the full stack:** Host the Express API on Render and the database on Neon so the live GitHub Pages site shows real, persisted inventory data.

---

## Author

**Kevin** — [@kevv1011](https://github.com/kevv1011)
HAU · 6APSI Final Project

---

## Licence

MIT — see [LICENSE](LICENSE). Copyright © 2026 Kevin.
