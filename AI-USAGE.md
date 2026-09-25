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

## 3. Who wrote what

### @kevv1011 (Written by me)

- **File:** `final-project-planning/01-proposal.md`, `02-wireframes.md`, `03-design-system.md`
- **What it does and why it is built this way:** These markdown files represent the foundational logic, user stories, and design system of the entire app. I wrote the wireframes and color tokens by hand to ensure the final product actually looked and functioned like a premium tool tailored for Filipino sari-sari store owners, rather than a generic AI-generated template. 

### The AI-written part I understand best

- **File:** `client/src/App.jsx`
- **What it does and why we kept it:** This file houses the `IS_DEMO` toggle logic (`import.meta.env.VITE_USE_MOCK_API`). It acts as a router for data, checking if it should fetch from the Express API or read/write to `localStorage`. We kept it because it brilliantly satisfies the grading requirement to have a working GitHub Pages deployment while still allowing for a real PostgreSQL backend when running locally.
