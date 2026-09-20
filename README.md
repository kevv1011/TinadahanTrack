<div align="center">
  <img src="client/public/logo.png" alt="TindahanTrack Logo" width="120" style="border-radius: 20px;" />
  <br/>
  <h1>TindahanTrack</h1>
</div>

A mobile-first inventory and stock management dashboard designed specifically for neighborhood sari-sari store owners.

**Live site:** [https://kevv1011.github.io/TinadahanTrack/](https://kevv1011.github.io/TinadahanTrack/)
**API:** [https://your-api.onrender.com/healthz](https://your-api.onrender.com/healthz) *(not yet deployed)*
**Demo video:** *(link — to be added before finals)*

> **This deployment is running in demo mode. The interface is real; the backend is simulated in your browser so the site works without a server. See Demo mode below. Delete this quote once your API is live.**

---

## What it does

- **Live Inventory Tracking:** Instantly view, add, edit, and delete products to keep your store's inventory perfectly in sync.
- **Low-Stock Alerts:** Automatically flags items that fall below their minimum threshold so you always know exactly what to restock.
- **POS Quick Cart:** Batch-deduct items effortlessly through a sliding cart interface to quickly log sales and checkout customers.

## Built with

- **Frontend:** React and Vite (Mobile-first, vanilla CSS)
- **Backend:** Node.js, Express, and a PostgreSQL database hosted on Neon.

## Demo mode

Because the backend is not deployed to the cloud yet, the live site operates in a simulated "Demo Mode" so the UI remains fully functional. This is controlled by the `VITE_USE_MOCK_API` environment variable on the frontend.

| `VITE_USE_MOCK_API` | Behaviour |
|---------------------|-----------|
| `true` or unset     | The app runs purely in the browser using `localStorage`. No backend is needed. |
| `false`             | The app makes live network requests to the Express API. |

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

## Environment variables

| Variable | Location | Description |
|----------|----------|-------------|
| `VITE_USE_MOCK_API` | `client/.env` | Set to `false` to connect to a real backend. |
| `VITE_API_BASE_URL` | `client/.env` | Your backend URL (e.g., `http://localhost:3001`). |
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

The React frontend handles all user interactions, UI state, and route navigation independently. When a user modifies inventory, the client sends a REST API request (like a `PATCH` or `POST`) to the Node/Express backend running on port 3001. If the API is unreachable or running in Demo Mode, the frontend completely bypasses the network layer and resolves the requests using browser `localStorage` instead.

## What I would do next

- Transition the backend from a local `ngrok` tunnel to a dedicated cloud host once platform availability stabilizes.
- Expand the POS Quick Cart into a full checkout system with sales receipts.
- Implement user authentication so multiple store owners can securely manage their own distinct inventories.

## Author & Licence

Built by Kevin (@kevv1011) — HAU · 6APSI Final Project.
MIT License.
