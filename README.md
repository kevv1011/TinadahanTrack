<div align="center">
  <img src="client/public/logo.png" alt="TindahanTrack Logo" width="120" style="border-radius: 20px;" />
  <br/>
  <h1>TindahanTrack</h1>
</div>

A mobile-first inventory and stock management dashboard designed specifically for neighborhood sari-sari store owners.

**Live site:** [https://kevv1011.github.io/TinadahanTrack/](https://kevv1011.github.io/TinadahanTrack/)
**API:** [https://baggy-tusk-eradicate.ngrok-free.dev/healthz](https://baggy-tusk-eradicate.ngrok-free.dev/healthz)
**Demo video:** *(link — to be added before finals)*

---

## What it does

- **Live Inventory Tracking:** Instantly view, add, edit, and delete products to keep your store's inventory perfectly in sync.
- **Low-Stock Alerts:** Automatically flags items that fall below their minimum threshold so you always know exactly what to restock.
- **Point of Sale (POS) Quick Cart:** Complete sales through a sliding cart with batch stock deductions, a cash-tendered calculator, automatic change generation, and live transaction logging.

## Built with

- **Frontend:** React 19, Vite, React Router, Recharts, Lucide icons, and mobile-first vanilla CSS.
- **Backend:** Node.js, Express, `pg`, Multer uploads, and Neon PostgreSQL.

## Demo mode

Demo Mode is available for offline UI testing and is controlled by the `VITE_USE_MOCK_API` frontend environment variable. The live deployment uses the Express API through its `ngrok` tunnel.

| `VITE_USE_MOCK_API` | Behaviour |
|---------------------|-----------|
| `true` or unset     | The app runs purely in the browser using `localStorage`. No backend is needed. |
| `false`             | The app makes live network requests to the Express API through the configured `ngrok` URL. |

## Running it yourself

### Run just the frontend (Demo Mode)
You don't need a database to test the UI! Just run the client:
```bash
cd client
npm install
npm run dev
```

### Run the full stack
To test the real API and database connection, open two terminals.

**Terminal 1 (Backend):**
```bash
cd server
npm install
npm run db:reset
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm install
npm run dev
```

### Run the live stack with ngrok

To expose the local Express API for the deployed client, create `server/.env` with a valid Neon `DATABASE_URL`. In `client/.env`, set:

```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://your-ngrok-subdomain.ngrok-free.dev
```

Then open three terminals:

**Terminal 1 â€” Express API:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 â€” React client:**
```bash
cd client
npm install
npm run dev
```

**Terminal 3 â€” ngrok tunnel (PowerShell):**
```powershell
& "C:\path\to\ngrok.exe" http 3001
```

Copy ngrok's public HTTPS forwarding URL into `VITE_API_BASE_URL`, then restart the Vite client. Free ngrok URLs can change whenever the tunnel restarts; update the environment variable and rebuild/redeploy the GitHub Pages client when this happens.

For the deployed client to access the tunnel, `server/.env` must set `CORS_ORIGINS` to include both `http://localhost:5173` and `https://kevv1011.github.io`. Never commit `server/.env`; anyone running a downloaded copy needs their own Neon connection string.

## Environment variables

| Variable | Location | Description |
|----------|----------|-------------|
| `VITE_USE_MOCK_API` | `client/.env` | Set to `false` to connect to a real backend. |
| `VITE_API_BASE_URL` | `client/.env` | Express API base URL (e.g., the active `https://…ngrok-free.dev` tunnel or `http://localhost:3001`). |
| `DATABASE_URL` | `server/.env` | PostgreSQL connection string (e.g., `postgresql://user:pass@host/db`). |

## Deploying

- **Client:** The React frontend is deployed automatically to GitHub Pages using the `.github/workflows/deploy.yml` GitHub Actions pipeline.
- **API:** The Express backend runs locally and is exposed to the internet through an `ngrok` secure tunnel, connecting directly to the live Neon PostgreSQL database.

## Project structure

```text
TindahanTrack/
├── client/                     # React frontend (Vite)
│   ├── public/                 # Static assets and screenshots
│   ├── src/                    # Atomic components, pages, and App state
│   └── vite.config.js          
├── server/                     # Express backend API
│   ├── scripts/                # db-reset.js (schema setup & seeding)
│   ├── app.js                  # Express API routes
│   └── package.json
└── docs/                       # Course planning documents and weekly reports
```

## Architecture

The React frontend owns UI state and route navigation. In live mode, it sends REST requests to the local Express API on port 3001 through the configured `ngrok` tunnel; Express connects to Neon PostgreSQL. In Demo Mode, selected through `VITE_USE_MOCK_API`, the frontend instead stores inventory and transactions in browser `localStorage`.

## What I would do next

- Transition the backend from a local `ngrok` tunnel to a dedicated cloud host once platform availability stabilizes.
- Implement user authentication so multiple store owners can securely manage their own distinct inventories.

## Author & Licence

Built by Kevin (@kevv1011) — HAU · 6APSI Final Project.
MIT License.
