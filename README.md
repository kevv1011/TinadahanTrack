<div align="center">
  <img src="client/public/logo.png" alt="TindahanTrack Logo" width="120" style="border-radius: 20px;" />
  <br/>
  <h1>TindahanTrack</h1>
</div>

A mobile-first inventory and stock management dashboard designed specifically for neighborhood sari-sari store owners.

**Live site:** [https://kevv1011.github.io/TinadahanTrack/](https://kevv1011.github.io/TinadahanTrack/)
**Live API (temporary):** [https://baggy-tusk-eradicate.ngrok-free.dev/healthz](https://baggy-tusk-eradicate.ngrok-free.dev/healthz) *(available while the local Express server and ngrok tunnel are running)*
**Demo video:** *(link — to be added before finals)*

---

## What it does

- **Live Inventory Tracking:** Instantly view, add, edit, and delete products to keep your store's inventory perfectly in sync.
- **Low-Stock Alerts:** Automatically flags items that fall below their minimum threshold so you always know exactly what to restock.
- **Point of Sale (POS) Quick Cart:** Complete sales through a sliding cart with batch stock deductions, a cash-tendered calculator, automatic change generation, and live transaction logging.

## Built with

- **Frontend:** React 19, Vite, React Router, Recharts, Lucide icons, and mobile-first vanilla CSS.
- **Backend:** Node.js, Express, `pg`, Multer uploads, and Neon PostgreSQL.

## Demo mode — recommended evaluation path

The GitHub Pages **Live site** is deployed in Demo Mode so it remains fully interactive even when the temporary ngrok tunnel is offline. It supports inventory changes, POS checkout, receipts, transaction history, and analytics using browser `localStorage`; no installation, database, or server is required for evaluation.

The same dual-mode client can connect to the live Neon database through the local Express API and ngrok tunnel when `VITE_USE_MOCK_API=false`.

| `VITE_USE_MOCK_API` | Behaviour |
|---------------------|-----------|
| `true` or unset     | The app runs purely in the browser using `localStorage`. This is the GitHub Pages evaluation experience. |
| `false`             | The app makes live network requests to the Express API through the configured `ngrok` URL. |

## Running it yourself

### Run just the frontend (Demo Mode)
You don't need a database, Express server, or ngrok to test the full UI flow:
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

### Run the live Neon stack with ngrok

To expose the local Express API for the deployed client, create `server/.env` with a valid Neon `DATABASE_URL`. In `client/.env`, set:

```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://your-ngrok-subdomain.ngrok-free.dev
```

Then open three **separate PowerShell terminals** and leave all three running while you use Live Mode. These commands assume the repository was saved at `D:\TindahanTrack`.

**Terminal 1 - Express API (required for live data):**

```powershell
cd D:\TindahanTrack\server
npm install
npm run dev
```

**Terminal 2 - Desktop/laptop browser app:**

```powershell
cd D:\TindahanTrack\client
npm install
npm run dev
```

Open the local Vite address that appears in this terminal (normally `http://localhost:5173`) in a desktop or laptop browser. This terminal is not needed when testing the already-installed Android APK.

**Terminal 3 - ngrok tunnel (required for the Android APK or anyone outside your local network):**

Open a fresh PowerShell window. You may be in any folder. The part inside the quotation marks must be the actual location of `ngrok.exe` on that computer. For example, if it is stored in `D:\NGROK`, copy and paste:

```powershell
& "D:\NGROK\ngrok.exe" http 3001
```

If ngrok is stored somewhere else, such as the `C:` drive, replace only the quoted path with its real location:

```powershell
& "C:\path\where\ngrok\is\saved\ngrok.exe" http 3001
```

ngrok will show a line like `Forwarding https://example.ngrok-free.dev -> http://localhost:3001`. Copy the `https://...ngrok-free.dev` portion (do **not** include `-> http://localhost:3001`) into `client/.env` as `VITE_API_BASE_URL`, then restart the Vite client.

Free ngrok URLs can change whenever the tunnel restarts. Update `VITE_API_BASE_URL` each time it changes. For the Android app, run `npm run build`, `npx cap sync android`, and build/install a new APK after changing the URL so the new address is bundled into the app.

For the deployed client to access the tunnel, `server/.env` must set `CORS_ORIGINS` to include both `http://localhost:5173` and `https://kevv1011.github.io`. Never commit `server/.env`; anyone running a downloaded copy needs their own Neon connection string.

## Environment variables

| Variable | Location | Description |
|----------|----------|-------------|
| `VITE_USE_MOCK_API` | `client/.env` | Set to `false` to connect to a real backend. |
| `VITE_API_BASE_URL` | `client/.env` | Express API base URL (e.g., the active `https://…ngrok-free.dev` tunnel or `http://localhost:3001`). |
| `DATABASE_URL` | `server/.env` | PostgreSQL connection string (e.g., `postgresql://user:pass@host/db`). |

## Deploying

- **Client:** The React frontend is deployed automatically to GitHub Pages using the `.github/workflows/deploy.yml` GitHub Actions pipeline. It defaults to self-contained Demo Mode for reliable evaluation.
- **API:** The Express backend runs locally and can be exposed to the internet through an `ngrok` secure tunnel, connecting directly to the live Neon PostgreSQL database while the local process is running.

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

The React frontend owns UI state and route navigation. Its GitHub Pages deployment uses Demo Mode and stores inventory and transactions in browser `localStorage`, ensuring the app works independently for reviewers. In live mode, selected through `VITE_USE_MOCK_API=false`, the frontend sends REST requests to the local Express API on port 3001 through the configured ngrok tunnel; Express connects to Neon PostgreSQL.

## What I would do next

- Transition the backend from a local `ngrok` tunnel to a dedicated cloud host once platform availability stabilizes.
- Implement user authentication so multiple store owners can securely manage their own distinct inventories.

## Author & Licence

Built by Kevin (@kevv1011) — HAU · 6APSI Final Project.
MIT License.
