<div align="center">
  <img src="client/public/logo.png" alt="TindahanTrack Logo" width="120" style="border-radius: 20px;" />
  <br/>
  <h1>TindahanTrack</h1>
  <p>A mobile-first inventory, stock management, and point-of-sale system designed specifically for neighborhood sari-sari store owners.</p>
</div>

**Live Site (Demo Mode):** [https://kevv1011.github.io/TinadahanTrack/](https://kevv1011.github.io/TinadahanTrack/)  
**Live API Endpoint (Render Production):** [https://tinadahantrack.onrender.com/healthz](https://tinadahantrack.onrender.com/healthz)  
**Demo Video:** *(link — to be added before finals)*  
**Security & Privacy:** [SECURITY-CHECKLIST.md](SECURITY-CHECKLIST.md)  
**AI Usage Log:** [AI-USAGE.md](AI-USAGE.md)  

---

## 1. Overview

TindahanTrack is a mobile-first inventory and stock management web application built for neighborhood sari-sari store owners in the Philippines. Small family-run retail stores typically rely on messy pen-and-paper ledgers that make it difficult to track depleted inventory, calculate profits, or prepare supplier restocking lists.

TindahanTrack solves this problem by giving store owners a digital dashboard to track stock in real time, receive automatic low-stock threshold alerts, run sales through a Quick Cart point-of-sale checkout with cash tendering and change calculation, and review sales analytics — all accessible on mobile or desktop browsers, or as an Android app.

---

## 2. Setup and Installation

Follow these steps to run TindahanTrack locally from scratch:

### Prerequisites & Versions
- **Node.js:** v20.18.0 or higher
- **npm:** v10.8.0 or higher
- **Git:** for cloning the repository
- **Database:** A cloud PostgreSQL database instance (such as [Neon.tech](https://neon.tech)) or a local PostgreSQL server

### Step 1: Clone the repository
```bash
git clone https://github.com/kevv1011/TinadahanTrack.git
cd TinadahanTrack
```

### Step 2: Install dependencies
Install dependencies for both the backend server and frontend client:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Step 3: Environment Configuration
Create a `.env` file in the `server/` directory and another in the `client/` directory based on the following tables. **Never commit real credentials to Git.**

#### `server/.env` (Backend Configuration)
```env
PORT=3001
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-example-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
CORS_ORIGINS=http://localhost:5173,https://kevv1011.github.io
OWNER_PASSWORD_HASH=scrypt$YOUR_BASE64_SALT$YOUR_BASE64_HASH
JWT_SECRET=your-32-character-or-longer-random-secret-key-here
AUTH_TOKEN_TTL=12h
```
*(Default owner password in development is `admin123`).*

#### `client/.env` (Frontend Configuration)
```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:3001
```
*Note: If you are testing purely offline without a database, set `VITE_USE_MOCK_API=true` or click the **"Test in Demo Mode"** button on the login screen.*

### Step 4: Set up and Seed the Database
Initialize the database tables (`items`, `transactions`, `transaction_items`) and seed 25 realistic sari-sari store products:
```bash
cd server
npm run db:reset
```

---

## 3. How to Run It

### Running in Standalone Demo Mode (Frontend Only)
You do not need an active database or Express server to test the full UI flow:
```bash
cd client
npm run dev
```
- **Address to open:** Open `http://localhost:5173` in your browser.
- **Expected screen:** The TindahanTrack dashboard loads immediately with mock data saved in browser `localStorage`.

### Running Full-Stack (Backend + Frontend)
Open two separate terminals:

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
```
- **Expected output:** `TindahanTrack API running on http://localhost:3001`
- **Verification:** Visiting `http://localhost:3001/healthz` returns `{"status":"ok"}`.

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```
- **Address to open:** `http://localhost:5173`
- **Expected screen:** The Owner Sign-in screen appears. Enter the password `admin123` to connect to the live PostgreSQL database, or click **"Test in Demo Mode"** to bypass authentication with mock data.

### Connecting to the Live Cloud Backend (Render Production)
The Express backend is deployed 24/7 on Render. To connect your frontend client or mobile app directly to the cloud database:
```env
# In client/.env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=https://tinadahantrack.onrender.com
```
When running `npm run dev` or using the Android app, requests will automatically route to the live Render PostgreSQL cloud backend without needing any local server running.

---

## 4. Features and Usage

### Primary User Flow
1. **Sign In / Mode Selection:** On opening the app, the owner enters their password to connect to the live database, or selects **"Test in Demo Mode"** for offline evaluation.
2. **Dashboard & Low-Stock Alerts:** The top metric cards show inventory value, healthy stock counts, and critical low-stock warnings. Items below their minimum threshold are highlighted in red.
3. **Inventory Management (`/inventory` & `/add-item`):** Browse, search, filter by category, and update product quantities using quick `+` and `-` controls. Click any item card to edit details or delete the product.
4. **Point of Sale (POS) Quick Cart:** Click the cart icon to slide out the Quick Cart drawer. Add products to cart, enter cash tendered, see automatic change calculated, and click **"Complete Sale"** to deduct batch inventory atomically and generate a printable receipt.
5. **Sales Analytics:** View seven-day revenue trends, daily sales totals, and the fastest-moving products.
6. **Sign Out & Dark Mode:** Toggle between Dark and Light mode via the moon/sun button, or click **"Sign out"** to return to mode selection.

### API Endpoints (Backend REST API)

All protected endpoints require an `Authorization: Bearer <token>` header obtained from `/api/auth/login`.

| Method | Path | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `GET` | `/healthz` | No | Public health check returning server status (`{"status":"ok"}`). |
| `POST` | `/api/auth/login` | No | Authenticates owner password using scrypt and returns a signed JWT. |
| `GET` | `/api/items` | Yes | Retrieves all inventory products from PostgreSQL ordered by name. |
| `POST` | `/api/items` | Yes | Creates a new inventory item with name, category, price, stock, and threshold. |
| `PUT` | `/api/items/:id` | Yes | Updates an existing inventory item's details. |
| `PATCH` | `/api/items/:id/stock` | Yes | Increments or decrements a single item's stock count. |
| `DELETE` | `/api/items/:id` | Yes | Deletes an inventory item from the database. |
| `POST` | `/api/upload` | Yes | Uploads a product image via Multer and returns the static asset path. |
| `GET` | `/api/stats` | Yes | Returns aggregated stats (total inventory value, healthy count, low stock count). |
| `GET` | `/api/transactions/recent` | Yes | Returns the 15 most recent sales transactions. |
| `POST` | `/api/checkout` | Yes | Executes atomic batch stock deductions and logs the sale transaction. |

---

## 5. Project Structure

```text
TindahanTrack/
├── android/                    # Capacitor native Android wrapper
├── client/                     # React frontend (Vite)
│   ├── public/                 # Static assets, screenshots, and icons
│   ├── src/                    
│   │   ├── components/         # Atomic components (atoms, molecules, organisms)
│   │   ├── pages/              # Routed views (Dashboard, Inventory, AddItem, Login)
│   │   ├── lib/                # API client, demo mock data, and auth helpers
│   │   ├── App.jsx             # Main router and state coordinator
│   │   └── main.jsx            # React root mount
│   ├── capacitor.config.json   # Capacitor Android build configuration
│   └── vite.config.js          
├── server/                     # Express backend API
│   ├── scripts/                # Database migration and seed scripts (db-reset.js)
│   ├── uploads/                # User-uploaded product photos
│   ├── app.js                  # Express routes, middleware, and database pool
│   └── package.json
├── docs/                       # Course planning documents and weekly journals
├── SECURITY-CHECKLIST.md       # Finals Week 2 security and privacy audit
├── AI-USAGE.md                 # Full AI usage ledger and rubric documentation
└── README.md                   # Project documentation and guide
```

---

## 6. Screenshots

### Desktop & Tablet View
<div align="center">
  <img src="client/public/web (1).png" alt="TindahanTrack Web Dashboard" width="700" style="margin-bottom: 12px; border-radius: 8px;" />
  <br/>
  <img src="client/public/web (2).png" alt="TindahanTrack Inventory & Quick Cart" width="700" style="margin-bottom: 12px; border-radius: 8px;" />
</div>

### Mobile View (Android / Mobile Web)
<div align="center">
  <img src="client/public/app (1).png" alt="Mobile Dashboard" width="220" style="margin-right: 12px; border-radius: 8px;" />
  <img src="client/public/app (2).png" alt="Mobile Quick Cart Drawer" width="220" style="margin-right: 12px; border-radius: 8px;" />
  <img src="client/public/app (3).png" alt="Mobile POS Checkout" width="220" style="margin-right: 12px; border-radius: 8px;" />
</div>

---

## 7. Known Issues and Next Steps

### Known Issues & Tradeoffs
1. **Permanent Cloud Backend:** The Express REST API and PostgreSQL database are hosted on Render (`https://tinadahantrack.onrender.com`). Free-tier Render web services spin down after 15 minutes of inactivity, which may cause an initial 30–50 second cold-start delay on first request.
2. **Offline Evaluation Fallback:** The standalone Demo Mode on GitHub Pages eliminates cloud cold-start dependencies for evaluators by persisting all inventory changes and sales transactions in browser `localStorage`.
3. **Image Upload Persistence in Ephemeral Environments:** Uploaded product images are stored locally in `server/uploads/`. For permanent multi-instance scaling, cloud object storage (e.g., Cloudinary or AWS S3) will be integrated in future phases.

### Next Steps (Post-Submission)
- Implement barcode scanning via device camera using Capacitor plugins for instant item lookup.
- Add receipt printing / SMS receipt sharing for customer convenience.
- Add low-stock push notifications via Firebase Cloud Messaging (FCM).

---

## AI Usage & Attribution

This project was built with AI assistance using Google Antigravity Agent. All AI interactions, prompts, failure cases, and personal code attributions are documented in **[AI-USAGE.md](AI-USAGE.md)** in accordance with the course's finals badge rubric.

## Author & Licence

Built by **Kevin (@kevv1011)** — Holy Angel University · 6APSI Final Project.  
Licensed under the [MIT License](LICENSE).
