# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

## 1. How I used AI

### 2026-09-17 - Project Scaffold & Boilerplate
- **Tool:** Google Antigravity Agent
- **What I asked for:** Scaffold a Vite React app and Express backend based on my planning documents.
- **What it gave back:** A full directory structure (`client/` and `server/`) with base React components and an Express API skeleton.
- **What I kept, what I changed, and why:** I kept the structure but had to manually intervene when Vite overwrote the `src` folder. I enforced the `VITE_USE_MOCK_API` design pattern so I could test the frontend without the backend running.
- **Commit:** https://github.com/kevv1011/TinadahanTrack/commit/7523547

### 2026-09-17 - Demo Mode & LocalStorage Persistence
- **Tool:** Google Antigravity Agent
- **What I asked for:** Implement a fallback so the app works offline in the browser without the Express server.
- **What it gave back:** A `localStorage` wrapper in `App.jsx` that intercepts API calls and saves them locally when `VITE_USE_MOCK_API=true`.
- **What I kept, what I changed, and why:** I kept the logic entirely because it allowed me to successfully deploy a working interactive demo to GitHub Pages for my Week 1 submission.

### 2026-09-18 - Express Backend and PostgreSQL Wire-up
- **Tool:** Google Antigravity Agent
- **What I asked for:** Connect the Express routes to a live Neon PostgreSQL database.
- **What it gave back:** SQL queries using the `pg` library and a `schema.sql` file with 20 seed products.
- **What I kept, what I changed, and why:** I kept the SQL logic but had to securely abstract the database credentials into a `.env` file that is git-ignored, ensuring my Neon password wasn't pushed to GitHub.

### 2026-09-19 - POS Quick Cart & Analytics
- **Tool:** Google Antigravity Agent
- **What I asked for:** Build a checkout system that deducts stock in batches and records transactions.
- **What it gave back:** A `QuickCart.jsx` sliding sidebar and a SQL transaction block with `BEGIN` and `COMMIT`.
- **What I kept, what I changed, and why:** Kept the transaction safety logic to prevent partial checkouts. I asked the agent to further refine the UI with cash-tendered calculations and a completed-sale receipt.
- **Commit:** https://github.com/kevv1011/TinadahanTrack/commit/124cc32

### 2026-09-22 - Android Native Capacitor Wrapper
- **Tool:** Google Antigravity Agent
- **What I asked for:** Turn the web app into an installable Android APK.
- **What it gave back:** A Capacitor setup with native Android configurations.
- **What I kept, what I changed, and why:** Kept the wrapper, but had to use ngrok to tunnel the local Express API to a public URL so the Android emulator could communicate with my database.
- **Commit:** https://github.com/kevv1011/TinadahanTrack/commit/34cbc87

### 2026-09-25 - Live Mode Owner Authentication
- **Tool:** Google Antigravity Agent
- **What I asked for:** Add a secure login screen so only the owner can access the live API.
- **What it gave back:** A JWT authentication middleware and a scrypt password hashing script.
- **What I kept, what I changed, and why:** Kept the implementation. I had to manually use the agent to reset the `OWNER_PASSWORD_HASH` in `.env` to `admin123` when I was unable to log in during testing.
- **Commit:** https://github.com/kevv1011/TinadahanTrack/commit/d6a11ff

### 2026-10-01 - Render Cloud API Migration & ngrok Crash Recovery
- **Tool:** Google Antigravity Agent
- **What I asked for:** Fix a fatal Go runtime access violation crash (`0xc0000005` in `FillFromRDNSequence`) preventing ngrok from launching, and help deploy the Express + PostgreSQL backend to Render for permanent cloud hosting.
- **What it gave back:** Diagnosed binary corruption, downloaded and restored the official clean ngrok v3 release, configured Render deployment parameters (`server` root directory, `npm start`), added production CORS support for GitHub Pages, and hooked the frontend to the live Render endpoint (`https://tinadahantrack.onrender.com`).
- **What I kept, what I changed, and why:** Kept the Render cloud backend as the primary live API for the final submission because it eliminates ngrok session timeouts and provides 24/7 reliability for evaluators.

## 2. Where the AI got it wrong

### Case 1 - Vite overwriting the src directory
- **What it gave me:** A standard `npm create vite@latest` scaffold command.
- **What was wrong with it:** The Vite CLI's `--overwrite` flag completely deleted the `src/` folder we had just spent an hour building.
- **What I did instead:** I had the agent reconstruct the lost React components from its memory context and our changelog history.
- **Commit:** https://github.com/kevv1011/TinadahanTrack/commit/7523547

### Case 2 - React Router Blank Screen on GitHub Pages
- **What it gave me:** A standard `<BrowserRouter>` wrapping the app.
- **What was wrong with it:** When deployed to GitHub Pages (which hosts from a subdirectory like `/TinadahanTrack/`), the router failed to match the paths, resulting in a blank white screen.
- **What I did instead:** I instructed the agent to add `basename={import.meta.env.BASE_URL}` to the router so it dynamically adapts to the deployment path.

### Case 3 - Vite File Watcher Deadlock
- **What it gave me:** Created a backup folder named `node_modules_broken_20260922` in the client directory.
- **What was wrong with it:** Vite's file watcher attempted to scan the corrupted backup folder, which caused a deadlock in Go/chokidar and completely crashed the `npm run dev` server.
- **What I did instead:** Because the corrupted file couldn't be deleted by standard Windows commands, I directed the agent to modify `vite.config.js` with `server.watch.ignored` to bypass the corrupted folder entirely.
- **Commit:** https://github.com/kevv1011/TinadahanTrack/commit/39f9c6e

### Case 4 - Vite Watcher Crashing on Android Build Artifacts
- **What it gave me:** Vite was configured to watch the whole `client/` directory, which contained the Capacitor Android native project (`client/android/`).
- **What was wrong with it:** When Gradle compiled the Android app, it generated thousands of deeply nested build directories (`client/android/app/build/...`), causing Vite's file watcher to fail with an `UNKNOWN lstat` error and immediately crash the development server.
- **What I did instead:** Configured `client/vite.config.js` to explicitly ignore `**/android/**`, `**/build/**`, and `**/.gradle/**` in `server.watch.ignored`, completely insulating the frontend dev server from native mobile build trees.

## 3. Who wrote what

### The Code I Wrote

#### 1. The Design System and CSS Architecture

- **File:** `client/src/styles.css`
- **Commit:** https://github.com/kevv1011/TinadahanTrack/commit/8d96937
- **Explanation:** Created the core CSS custom properties (:root) that display the visual identity of the app. Set the exact color tags like the magenta primary and alert red, the 8px spacing scale and responsive media queries for screens more than than 768px. Instead of using a framework such as Tailwind or Bootstrap, I opted for a basic approach using vanilla CSS as the sari-sari store app should be extremely lightweight and vanilla CSS ensured high performance on lower end devices.

#### 2. The Sari-Sari Store Seed Data

- **File:** `server/schema.sql` and `client/src/data/seed.js`
- **Commit:** https://github.com/kevv1011/TinadahanTrack/commit/3fe2a86
- **Explanation:** I created the realistic data seed (20 items) and schema constraints for the database. The inventory of real world sari-sari stores has been mapped with correct Philippe Peso prices, and realistic low stock thresholds triggers. This will guarantee that the app logic is in line with the actual domain of the end user.

### The Code the AI Wrote

#### 3. The Atomic POS Checkout Query

- **File:** `server/app.js`
- **Commit:** https://github.com/kevv1011/TinadahanTrack/commit/124cc32
- **Explanation:** The checkout route (PATCH /api/items/batch-deduct) that handles batch stock deductions is written with Antigravity AI. It encapsulated the multi-item update in a PostgreSQL BEGIN ... COMMIT block. This code is important for database integrity reasons and if a store owner checks out 5 items, and the database crashes on the 5th item, the transaction will automatically roll back. This way, you can avoid selling off parts of your stock, and you won't let your stock numbers get out of sync.

