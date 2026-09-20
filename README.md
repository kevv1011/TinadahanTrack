<div align="center">
  <img src="client/public/logo.png" alt="TindahanTrack Logo" width="120" style="border-radius: 20px;" />
  <br/>
  <h1>TindahanTrack</h1>
</div>

## Overview
TindahanTrack is a mobile-first inventory and stock management dashboard designed specifically for neighborhood sari-sari store owners. It helps owners track retail prices, update stock levels in real-time, and automatically generates a low-stock alert feed so they always know what to reorder. 

## Setup and installation
This repository uses a monorepo structure, meaning the React frontend and Express backend are split into their own folders and must be configured separately.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kevv1011/TinadahanTrack.git
   cd TinadahanTrack
   ```

2. **Install dependencies:**
   You must install the NPM packages for both the client and the server.
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Configure Environment Variables:**
   You need to create a `.env` file in **both** directories.

   In the `client/` folder, create a `.env` file:
   ```env
   VITE_USE_MOCK_API=false
   VITE_API_BASE_URL=http://localhost:3001
   ```

   In the `server/` folder, create a `.env` file:
   ```env
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
   ```

4. **Seed the Database:**
   Once your `DATABASE_URL` is configured, run the database reset script from the `server/` folder to build the tables and inject dummy items:
   ```bash
   cd server
   npm run db:reset
   ```

## How to run it
To run the full stack locally, you need to open two separate terminal windows.

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend React):**
```bash
cd client
npm run dev
```
Open your browser to `http://localhost:5173`. 

## Features and usage
- **Live PostgreSQL CRUD:** The UI is fully connected to a Neon PostgreSQL database. Adding, editing, or deleting items updates the database in real-time.
- **Edit & Delete Modals:** Safely update existing product information or remove discontinued stock via interactive React portals.
- **Demo Mode Fallback:** If the API is unreachable (or if `VITE_USE_MOCK_API=true`), the app gracefully falls back to using your browser's `localStorage` so the UI remains fully interactive for portfolio demonstrations.
- **Dark Mode:** A persistent, user-friendly theme toggle utilizing clean vector icons from `lucide-react`.

### Main API Endpoints
- `GET /api/items` - Fetch full inventory
- `POST /api/items` - Add a new product
- `PUT /api/items/:id` - Update product details
- `PATCH /api/items/:id/stock` - Adjust stock levels
- `DELETE /api/items/:id` - Delete a product

## Project structure
```text
TindahanTrack/
├── client/                     # React frontend (Vite)
│   ├── public/                 # Static assets (logo)
│   ├── src/                    
│   │   ├── components/         # Atomic design (atoms, molecules, organisms)
│   │   ├── pages/              # Route screens (Dashboard, Inventory, AddProduct)
│   │   ├── App.jsx             # React Router and global state
│   │   ├── styles.css          # Vanilla CSS design tokens
│   │   └── main.jsx            # React 18 entry point
│   └── vite.config.js          
├── server/                     # Express backend API
│   ├── scripts/
│   │   └── db-reset.js         # PostgreSQL schema & seeding script
│   ├── app.js                  # Express API routes
│   └── package.json
└── docs/                       # Course planning documents and weekly reports
    ├── 01-proposal.md
    └── 04-weekly-reports.md
```

## Screenshots

### Desktop / Web
![TindahanTrack Web View 1](./client/public/web%20(1).png)
![TindahanTrack Web View 2](./client/public/web%20(2).png)
![TindahanTrack Web View 3](./client/public/web%20(3).png)

### Mobile App
![TindahanTrack Mobile View 1](./client/public/app%20(1).png)
![TindahanTrack Mobile View 2](./client/public/app%20(2).png)
![TindahanTrack Mobile View 3](./client/public/app%20(3).png)

## Known issues and next steps
- **Deployment:** The Node/Express backend is currently only running locally and is not yet deployed to a cloud provider like Render. Because of this, the live GitHub Pages site currently relies on the Demo Mode fallback.
- **Next Steps:** Week 3 will introduce comprehensive POS (Point of Sale) features, including Inventory Analytics charts and a batch-deduction "Quick Cart" tool.
