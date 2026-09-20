# TindahanTrack — Agent Changelog

All changes made by the AI agent are recorded here in reverse-chronological order.
Each entry includes the date, a summary, and a precise breakdown by action type.

## [Unreleased]

### Added

- **POS Quick Cart checkout:** Added sale totals, cash-tendered input, calculated change, checkout validation, and an in-progress checkout state. Live checkout reconciles server data and restores inventory if the batch deduction request fails; Demo Mode continues to persist inventory and sales transactions in `localStorage`.

### Changed

- **Backend deployment:** Replaced the planned Render deployment with a local Express instance exposed publicly through an `ngrok` secure tunnel. The tunnel connects the API to the existing Neon PostgreSQL database for the final submission.

### Fixed

- **ngrok API responses:** Added the `ngrok-skip-browser-warning` header to every client API request so ngrok returns API JSON rather than its browser warning page.

---

## [2026-09-20 · 11:45] — Session 27: README Complete Rewrite & Mockup Screenshots

**Summary:** Completely rewrote the root `README.md` to strictly adhere to the 7 required sections from the course's Week 2 documentation guide. Also embedded the final mockup screenshots for both desktop and mobile views.

### 🆕 Files Created
- `client/public/web (1-4).png` - Desktop mockups.
- `client/public/app (1-3).png` - Mobile mockups.

### ✏️ Files Modified

#### `README.md`
- Added the 7 required headings: Overview, Setup and installation, How to run it, Features and usage, Project structure, Screenshots, and Known issues.
- Updated environment variable placeholders and instructions for running the split frontend and backend servers concurrently.

---

## [2026-09-20 · 10:45] — Session 26: Repository Template Restructuring

**Summary:** Restructured the monolithic repository to strictly match the university's final project template by splitting into a `/client` and `/server` monorepo structure.

### 🆕 Files Created (Imported)

| File | Contents |
|------|---------|
| `AI-USAGE.md` | Template grading rubric for AI assistance. |
| `START-HERE.md` | Template instructions. |
| `docs/*` | All project planning docs and weekly reports templates. |

### ✏️ Files Modified

#### `README.md`
- Fixed typo in the Live URL link.
- Updated the "Project structure" diagram and logo image path to reflect the new `client/` and `docs/` paths.

#### `.github/workflows/deploy.yml`
- Updated `working-directory` to `./client` so GitHub Actions correctly builds the nested React frontend.

### 🗑️ Files Moved/Deleted

- Moved all React frontend code (`src/`, `public/`, `index.html`, `vite.config.js`, `package.json`, `.env`) into `client/`.
- Deleted the old `journal/` folder after migrating its contents into the new `docs/04-weekly-reports.md` format.

---

## [2026-09-19 · 23:10] — Session 25: Inventory Analytics, Quick Cart & Recent Transactions

**Summary:** Implemented Week 3 features transforming the app into a POS-style system. Added Dashboard Analytics (Total Value & Recharts Donut), a Quick Cart sidebar for batch stock deductions, and a Recent Transactions feed to audit sales history.

### 🆕 Files Created

| File | Contents |
|------|---------|
| `server/migrate_transactions.js` | Database script to create the new `transactions` table. |
| `src/components/organisms/QuickCart.jsx` | A sliding sidebar to stage items and batch-deduct stock. |
| `src/components/organisms/RecentTransactions.jsx` | A feed component displaying the 15 most recent sales/deductions. |
| `src/components/organisms/StatsPanel.jsx` | An analytics tile wrapping a `SummaryCard` and a `recharts` Donut chart. |

### ✏️ Files Modified

#### `server/schema.sql`
- Added the `transactions` table with a foreign key to `items`.

#### `server/app.js`
- Added `GET /api/stats` endpoint with SQL aggregations.
- Added `GET /api/transactions/recent` endpoint.
- Updated `PATCH /api/items/batch-deduct` with a secure `BEGIN...COMMIT` block that also logs transactions.
- Updated `PATCH /api/items/:id/stock` to log transactions for negative changes.

#### `src/App.jsx`
- Added `cart` state and `handleBatchDeduct` logic (with optimistic updates and demo mode fallback).
- Added `transactions` state and wired up live fetching.

#### `src/pages/DashboardPage.jsx`
- Integrated `<StatsPanel>` and `<RecentTransactions>`.

#### `src/pages/InventoryPage.jsx`
- Integrated `<QuickCart>` sidebar and added a floating `ShoppingCart` FAB.

#### `src/components/molecules/ProductCard.jsx`
- Added an `onAddToCart` button next to edit/delete actions.

#### `src/styles.css`
- Added CSS classes for `.stats-panel`, `.quick-cart`, `.cart-badge`, and `.recent-transactions`.

---

## [2026-09-19 · 22:30] — Session 24: UI/UX Overhaul & Dark Mode

**Summary:** Swapped the emoji-based icons for professional vector icons via `lucide-react`, implemented a persistent dark mode toggle, and added a visual stock progress bar to the product cards.

### ✏️ Files Modified

#### `src/styles.css`
- Updated `:root` variables and added `[data-theme="dark"]` for a sleek dark mode.
- Fixed `.product-card` layout and added `.stock-progress-bar`.

#### `src/App.jsx`
- Wired up a `theme` state backed by `localStorage` and toggled via `data-theme`.

#### `src/components/organisms/Header.jsx`
- Added a dark mode toggle button (`Sun`/`Moon` icons).

#### `src/components/molecules/ProductCard.jsx`
- Replaced ✏️/🗑️ with `lucide-react` icons and added the bottom stock progress bar.

---

## [2026-09-18 · 20:00] — Session 23: Real Edit & Delete Functionality

**Summary:** Replaced the placeholder `alert()` stubs with fully wired edit/delete features. Clicking ✏️ now opens an animated modal form; 🗑️ prompts a confirm dialog and removes the item from the DB.

### 🆕 Files Created

| File | Contents |
|------|---------|
| `src/components/molecules/EditModal.jsx` | Animated overlay modal with a form for all product fields (name, category, price, stock, threshold). Shows "Saving…" state while the API call is in flight. |

### ✏️ Files Modified

#### `server/app.js`
- Added `PUT /api/items/:id` route that updates all fields of an existing product.

#### `src/App.jsx`
- Added `handleEditItem(id, fields)` — calls `PUT /api/items/:id` in live mode; updates `localStorage` in demo mode.
- Added `handleDeleteItem(id)` — calls `DELETE /api/items/:id` in live mode; filters from state+storage in demo mode.
- Threaded both handlers as props to `InventoryPage`.

#### `src/pages/InventoryPage.jsx`
- Accepts and forwards `onEditItem` and `onDeleteItem` to `ProductGrid`.

#### `src/components/organisms/ProductGrid.jsx`
- Accepts and forwards `onEditItem` and `onDeleteItem` to each `ProductCard`.

#### `src/components/molecules/ProductCard.jsx`
- ✏️ button now opens `<EditModal>` instead of `alert()`.
- 🗑️ button calls `onDeleteItem` after a `confirm()` dialog instead of double-`alert()`.

#### `src/styles.css`
- Added `.modal-overlay`, `.modal`, `.modal__header/title/close/form/row/footer` styles.
- Added `@keyframes fadeIn` and `@keyframes slideUp` entrance animations.

### ❌ Nothing Deleted / Moved

---

## [2026-09-18 · 19:55] — Session 22: Frontend–Backend API Integration

**Summary:** Completed the live API wiring in `App.jsx`, replacing all TODO stubs with real `fetch()` calls to the Express backend. The app now reads and writes directly to the Neon PostgreSQL database when running locally.

### ✏️ Files Modified

#### `src/App.jsx`
- **GET `/api/items`** — Added HTTP status check and named error logging.
- **PATCH `/api/items/:id/stock`** — Implemented optimistic UI update (immediate) + best-effort server sync that reconciles the DB's authoritative value on success.
- **POST `/api/items`** — Now awaits the server response and uses the real DB-generated `id` for the new item, rather than a placeholder `Date.now()` id.

#### `.env` (local only — git-ignored)
- Changed `VITE_USE_MOCK_API=true` → `VITE_USE_MOCK_API=false` to activate live mode for local development.

### ❌ Nothing Deleted / Moved

---

## [2026-09-18 · 19:42] — Session 21: Express Backend Scaffold & Neon DB Initialization

**Summary:** Created the full Express backend server from scratch, connected it to a Neon PostgreSQL cloud database, and successfully seeded all 20 products.

### 🆕 Files Created

| File | Contents |
|------|---------|
| `server/app.js` | Full Express API with `GET /api/items`, `POST /api/items`, `PATCH /api/items/:id/stock`, `DELETE /api/items/:id`, and `GET /healthz`. |
| `server/package.json` | Server dependencies: `express`, `cors`, `pg`, `dotenv`. Includes `db:reset` script. |
| `server/schema.sql` | `DROP/CREATE TABLE items` + 20 `INSERT` seed rows matching `src/data/seed.js`. |
| `server/scripts/db-reset.js` | Node.js script to execute `schema.sql` against the Neon DB with pass/fail output. |
| `server/.env` | Neon credentials (git-ignored — never committed). |
| `server/.gitignore` | Blocks `.env` and `node_modules` in the server directory. |

### ✏️ Files Modified

#### `.gitignore` (root)
- Added `.env`, `.env.*`, `!.env.example` to prevent credentials from ever being committed.

### ✅ Validation
- `npm install` completed: 85 packages, 0 vulnerabilities.
- `npm run db:reset` output: `✅ db:reset complete — 20 rows in items table.`

---

## [2026-09-18 · 15:13] — Session 20: Finals Submission Documentation Update

**Summary:** Updated the Week 1 finals submission documents to ensure they accurately reflect all the recent accomplishments, including the Demo Mode implementation, GitHub Pages deployment, and UI polishes.

### ✏️ Files Modified

#### `project/REPORT.md`
- Added the persistent Demo Mode, GitHub Pages automated deployment, and final UI polishes to the "What changed this week" section.
- Added the React Router blank screen issue to the "What broke" section.

#### `journal/week-1.md`
- Updated the "What I did", "What blocked me", and "What I learned" sections to include reflections on deploying the app to GitHub Pages and implementing the `localStorage` fallback.

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 22:34] — Session 19: Transparent Logo Background

**Summary:** Removed the white background from the TindahanTrack logo by converting it to a transparent PNG, and updated all references across the app.

### 🆕 Files Created

| File | Contents |
|------|---------|
| `public/logo.png` | The updated logo with a transparent background. |

### ✏️ Files Modified

#### `index.html`
- Updated the favicon `<link>` tag to point to `/logo.png` with `type="image/png"`.

#### `src/components/organisms/Header.jsx`
- Updated the header logo image `src` to point to `logo.png`.

#### `README.md`
- Updated the root project logo image `src` to point to `logo.png`.

### ❌ Files Deleted / Moved
- `public/logo.jpg` (deleted)

---

## [2026-09-17 · 22:27] — Session 18: Logo Image Base Path Fix

**Summary:** Fixed a broken image link for the logo when deployed to GitHub Pages, which was causing the `alt` text ("TindahanTrack logo") to appear next to the header title.

### ✏️ Files Modified

#### `src/components/organisms/Header.jsx`
- Updated the logo `<img src>` from the absolute `"/logo.jpg"` to dynamically use `` `${import.meta.env.BASE_URL}logo.jpg` ``. This ensures Vite correctly resolves the image path when the app is served from a subdirectory repository.

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 22:23] — Session 17: React Router Base Path Fix

**Summary:** Fixed a "white screen" bug on GitHub Pages caused by React Router failing to match routes when served from a subdirectory.

### ✏️ Files Modified

#### `src/App.jsx`
- Updated `<BrowserRouter>` to include `basename={import.meta.env.BASE_URL}` so that the router dynamically respects the `--base` path passed by Vite during the GitHub Actions build.

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 22:18] — Session 16: GitHub Actions Deployment Workflow

**Summary:** Created the missing GitHub Actions workflow file required to automatically build and deploy the Vite React app to GitHub Pages, fixing the 404 error.

### 🆕 Files Created

| File | Contents |
|------|---------|
| `.github/workflows/deploy.yml` | Standard GitHub Actions workflow for Vite. Checks out the code, installs dependencies, builds with the correct `--base` path derived from the repository name, and deploys the `dist` folder to GitHub Pages. |

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 22:13] — Session 15: Workspace README Deployment Links

**Summary:** Updated the workspace `project/README.md` with the live GitHub Pages URL and the public repository link to ensure correct final grading submission.

### ✏️ Files Modified

#### `project/README.md`
- Replaced the `(Pending)` status with the live GitHub Pages deployment URL for the app: `https://kevv1011.github.io/TinadahanTrack/`
- Added the public GitHub repository link for the codebase: `https://github.com/kevv1011/TinadahanTrack`

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 22:02] — Session 14: README Branding & Features Update

**Summary:** Updated the root `README.md` to reflect the new frontend branding and to explicitly document the fully interactive offline Demo Mode functionality.

### ✏️ Files Modified

#### `README.md`
- Replaced the standard markdown `# TindahanTrack` heading with a centered HTML `<div>` displaying the custom `public/logo.jpg` with rounded corners.
- Updated the "What it does" section to detail the offline Demo Mode, noting that all data interactions persist across reloads using `localStorage`.

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 21:56] — Session 13: Demo Mode & LocalStorage Persistence

**Summary:** Implemented "Demo Mode" functionality allowing the app to run fully in the browser using `localStorage` for persistence without a backend API, critical for Week 1 deployment requirements.

### 🆕 Files Created

| File | Contents |
|------|---------|
| `src/data/seed.js` | Extracted the 20 default products from `schema.sql` to serve as fallback data in demo mode. |
| `.env` | Created the active environment file setting `VITE_USE_MOCK_API=true` and default API base URL. |

### ✏️ Files Modified

#### `src/App.jsx`
- Added `loadFromStorage` and `saveToStorage` utility functions for reading/writing to `localStorage` under the `tindahan_items` key.
- Updated initialization logic inside `useEffect`: Checks if `VITE_USE_MOCK_API` is active. If true, loads from `localStorage`, falling back to `seedItems` if empty. If false, fetches from Express API.
- Updated `handleUpdateStock` and `handleAddItem` to persist updated state directly into `localStorage` when running in demo mode, whilst leaving the structure for real API calls intact.

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 21:44] — Session 12: Skeleton Loaders, Counter Animations & Button Micro-Interactions

**Summary:** Added three frontend-only UI polishes: shimmer skeleton cards during loading, a count-up animation on dashboard stats, and tactile `:active` press feedback on all buttons.

### 🆕 Files Created

| File | Contents |
|------|---------|
| `src/components/atoms/SkeletonCard.jsx` | Renders empty placeholder divs that mirror the `ProductCard` layout. Uses `aria-hidden="true"`. No props required. |

### ✏️ Files Modified

#### `src/components/molecules/SummaryCard.jsx`
- Added `useEffect` + `useState` counter animation that counts from `0` → `value` over ~500ms (30 steps) on mount
- Non-numeric values (e.g. strings) pass through unchanged

#### `src/pages/InventoryPage.jsx`
- Imported `SkeletonCard`
- When `isLoading` is `true`, renders a `<div className="product-grid">` containing 6 `<SkeletonCard />` components instead of a plain "Loading…" paragraph
- Added `aria-busy="true"` on the skeleton grid for accessibility

#### `src/styles.css`
- **`.btn` base** — added `transform` to the `transition` shorthand so `:active` scale is animated
- **`.btn--primary:active`** / **`.btn--secondary:active`** — `transform: scale(0.96); opacity: 0.85` for tactile click feedback
- **`@keyframes shimmer`** — slides a `linear-gradient` from `-200px` to `200px` over 1.4s (infinite loop)
- **`.skeleton-card`** — `pointer-events: none; user-select: none`
- **`.skeleton-card__line`** / `__badge` / `__btn` — shared shimmer background, sized to match their real counterparts (`--short`: 45% width, `--medium`: 75%, badge: `60px` pill, btn: `34px` height)

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 21:35] — Session 11: Custom Logo Integration

**Summary:** Integrated a custom TindahanTrack logo (`logo.jpg`) into the browser favicon and the app header.

### 🆕 Files Created

| File | Contents |
|------|---------|
| `public/logo.jpg` | Custom TindahanTrack logo image (placed by user). |

### ✏️ Files Modified

#### `index.html`
- Changed `<link rel="icon">` from `/favicon.svg` (Vite default) to `/logo.jpg` with `type="image/jpeg"`

#### `src/components/organisms/Header.jsx`
- Added `<img className="header__logo" src="/logo.jpg" alt="TindahanTrack logo" />` inside the `<h1>` element, before the title text

#### `src/styles.css`
- **`.header__title`** — added `display: flex` and `align-items: center` so the logo and text sit level
- **`.header__logo`** (new) — `height: 32px`, `width: auto`, `border-radius: 6px`, `margin-right: var(--space-1)`, `flex-shrink: 0`

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 21:23] — Session 10: Desktop UI Enhancements

**Summary:** Expanded the desktop CSS overrides to improve the layout, spacing, and visual polish of the app on wide screens (≥ 768px).

### ✏️ Files Modified

#### `src/styles.css`
- **Global container** — `.dashboard`, `.inventory`, `.add-product` now constrained to `max-width: 1200px` and centered; desktop bottom-padding no longer reserves space for the hidden BottomNav
- **Header alignment** — `.header` set to `justify-content: center`, `.header__title` constrained to `1200px` so logo/nav aligns with content below
- **Inventory toolbar** — `.inventory__toolbar` switches to `flex-direction: row` with `justify-content: space-between` so category pills and search bar sit side-by-side; `.search-bar` capped at `max-width: 500px` with `min-width: 280px`
- **Product grid** — consolidated duplicate desktop rule; still `repeat(4, 1fr)` with wider `var(--space-2)` gap
- **Form elevation** — `.product-form` gets a deeper triple-layer `box-shadow`, wider `max-width: 520px`, and more padding (`var(--space-4)`) for breathing room
- **Empty states** — `.product-grid__empty` uses `font-size: var(--font-size-body)`, `min-height: 40vh`, and flexbox centering so the "No products" text fills the negative space gracefully
- Removed a standalone duplicate `@media (min-width: 768px)` block for `.product-grid` that was superseded by the consolidated desktop overrides

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 15:20] — Session 9: Workspace Restructuring & Course Compliance

**Summary:** Restructured the workspace folders for final submission layout and removed PII (the LICENSE file).

### 📁 Moved / Directories Created

| From | To |
|------|----|
| `final-project-planning/report-week-1.md` | `project/REPORT.md` (new directory) |
| `final-project-planning/journal-week-1.md` | `journal/week-1.md` (new directory) |

### 🆕 Files Created

| File | Contents |
|------|---------|
| `project/README.md` | Final Project template with placeholders for repository link, live app, and presentation materials. |

### ❌ Files Deleted

| File | Notes |
|------|-------|
| `LICENSE` | Deleted to ensure anonymity for course compliance. |

---

## [2026-09-17 · 15:06] — Session 8: MIT License & Final Git Push

**Summary:** Added a standard MIT License to the repository and pushed all Week 1 files to GitHub.

### 🆕 Files Created

| File | Contents |
|------|---------|
| `LICENSE` | Standard MIT License text, copyright 2026 Justine Kevin M. Reyes. |

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 14:54] — Session 7: README + Environment Setup

**Summary:** Replaced the Vite boilerplate `README.md` with a complete, grading-ready project README, and created `.env.example` to document the two build-time environment variables.

### ✏️ Files Modified

#### `README.md` — full replacement (was: Vite boilerplate)
Filled in every section of the course README template with TindahanTrack-specific content:
- **One-liner** describing the app and its audience
- **Live site / API / Demo video** links (live site and demo video marked as pending)
- **Demo mode notice** block with instructions to delete once API is live
- **What it does** — 5 bulleted features
- **Built with** table (React 18 + Vite 6, plain CSS, Express, PostgreSQL)
- **Demo mode** — full explanation of `VITE_USE_MOCK_API` toggle table and why GitHub Pages can't host the API
- **Running it yourself** — two code blocks: frontend-only (demo) and full-stack (with PostgreSQL)
- **Environment variables** table — all 6 variables with where/what columns; note about `VITE_` being public
- **Deploying** — GitHub Pages steps (Settings › Pages › GitHub Actions) + API/DB deploy notes
- **Project structure** — ASCII tree of every folder and key file with descriptions
- **Architecture** — 3-sentence explanation + ASCII diagram of the demo/live toggle
- **What I would do next** — 3 honest bullets (connect backend, real edit/delete, deploy)
- **Author** — Kevin, @kevv1011, HAU · 6APSI Final Project
- **Licence** — MIT

### 🆕 Files Created

| File | Contents |
|------|---------|
| `.env.example` | Documents `VITE_USE_MOCK_API` (default `true`) and `VITE_API_BASE_URL` (default `http://localhost:3001`). Safe to commit — contains no secrets. |

### ✏️ User-edited files (not agent changes)

| File | What the user changed |
|------|-----------------------|
| `final-project-planning/report-week-1.md` | Condensed bullet points, added UI polish + UX features to "What changed", updated "Why" and "What is left" to reflect Week 1 completion |
| `final-project-planning/journal-week-1.md` | Expanded goal to include frontend UI build, updated "What I did" and "What I learned" to reflect CSS + toast/search work |

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 14:44] — Session 6: Functional Enhancements — Search, Edit/Delete, Dropdown, Toast

**Summary:** Added four UX features: a sticky search bar on the Inventory page, Edit/Delete placeholder buttons on ProductCard, a Category select dropdown on the Add Product form, and a 3-second success Toast on form submit.

### 🆕 Files Created
| File | Contents |
|------|---------|
| `src/components/atoms/Toast.jsx` | Fixed-position notification bubble. Props: `message` (string), `visible` (boolean). Uses `aria-live="polite"` for screen readers. Animation and positioning handled entirely in CSS. |

### ✏️ Files Modified

#### `src/pages/InventoryPage.jsx`
- Added `searchQuery` state (string, default `''`)
- Filtering is now two-stage: category filter → name search (`case-insensitive .includes`)
- Added `.inventory__toolbar` wrapper `div` around pills + search bar (sticky positioning target)
- Added `<input class="search-bar__input">` with emoji icon and a `×` clear button that appears when the field has a value
- Empty-state message is now contextual: shows the search term when no results match

#### `src/components/molecules/ProductCard.jsx`
- Added `.product-card__header` row containing category label + action buttons
- Edit button (✏️): calls `window.alert()` with product name + id as a placeholder
- Delete button (🗑️): calls `window.confirm()` first, then `window.alert()` — safe two-step placeholder
- Both buttons have `aria-label` and `title` attributes

#### `src/components/organisms/ProductForm.jsx`
- Replaced `<FormField>` for "Category" with a native `<select class="input select">` dropdown
- Pre-populated options: `Snacks`, `Canned Goods`, `Beverages`, `Noodles`, `Dairy`, `Personal Care`, `Household`, `Other` (matches seed data categories from `schema.sql`)
- Default option is `"Select a category…"` with `disabled` to force a real selection

#### `src/pages/AddProductPage.jsx`
- Added `showToast` boolean state
- Imported `Toast` component
- `handleSubmit`: after `onAddItem()`, sets `showToast = true`, waits 3 s via `setTimeout`, then sets `showToast = false` and navigates to `/inventory`
- Also added `category` to the required-field validation check (was previously missing)

#### `src/styles.css`
- **`.inventory__toolbar`** — `position: sticky; top: 49px` (below header), bleeds to screen edges with negative `margin-inline`
- **`.search-bar`** / `.search-bar__input` / `.search-bar__clear` — pill-shaped input with emoji icon, focus ring, clear button
- **`.product-card__header`** — flex row for category + action buttons
- **`.product-card__actions`** / `.product-card__action-btn` — small ghost buttons, hover colours (magenta edit, red delete)
- **`.select`** — hides native arrow, injects custom SVG caret via `background-image`
- **`.toast`** / `.toast--visible` / `@keyframes toast-in` — slide-up from bottom on mobile, top-right fade-in on desktop; `z-index: 200`

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 14:32] — Session 5: UI Polish — Mockup-Matched Component Styles

**Summary:** Updated `styles.css` and four component files to match the mockup design precisely. All component styles are now defined in the global stylesheet; JSX structure unchanged except where noted.

### ✏️ Files Modified

#### `src/styles.css` — full expansion
Added all component-level CSS on top of the existing design tokens. Key additions:
- `.page` flex layout with `min-height: 100dvh`
- `.header` — sticky, magenta, no burger; desktop nav hidden below 768px via CSS
- `.bottom-nav` — fixed to bottom, 64px tall, hidden on desktop (≥768px)
- `.bottom-nav__item` / `--active` — magenta active colour, icon scale animation
- `.summary-card` / `--accent` — white card, 2rem bold magenta/red value, uppercase gray label
- `.alert-list`, `.alert-row`, `.alert-list__heading` — white panel, red uppercase heading, bordered rows
- `.stock-badge` / `--low` — **green by default** (healthy stock), red only when `count <= threshold`
- `.category-pill` / `--active` — magenta active, hover border effect
- `.product-grid` — 2-col mobile, 4-col desktop
- `.product-card` — white card, category in 9px uppercase magenta, name, price, badge, [−]/[+] controls
- `.product-card__controls` — 2-column grid of stock buttons
- `.product-form`, `.form-field`, `.input` — centered narrow card, labeled inputs, full-width save button
- `.btn--primary` / `--secondary` — unified button system

#### `src/components/organisms/Header.jsx`
- Removed burger menu (there was none in JSX, confirmed)
- Added `useLocation` to auto-highlight the active desktop nav link via `.active` class
- Added comment clarifying mobile routing is handled by `BottomNav`

#### `src/components/organisms/BottomNav.jsx`
- **Removed `activeTab` prop** — now uses `useLocation()` internally to detect the active route automatically; no parent needs to pass anything
- Added `aria-current="page"` on the active tab for accessibility
- Split icon into its own `<span class="nav-icon">` for independent CSS styling

#### `src/components/atoms/StockBadge.jsx`
- Added **green healthy state** as default — badge is green when `count > threshold`
- Red (`stock-badge--low`) only applies when `count <= threshold`

#### `src/pages/InventoryPage.jsx`
- **Removed `FloatingActionButton`** import and render — FAB is gone; Add is now a `BottomNav` tab
- Removed `useNavigate` (was only used by FAB)
- `<BottomNav />` no longer receives `activeTab` prop

#### `src/pages/DashboardPage.jsx`
- `<BottomNav />` — removed `activeTab="dashboard"` prop (no longer needed)

### ❌ Nothing Deleted / Moved

---

## [2026-09-17 · 14:22] — Session 4: Restored Missing Planning Files

**Summary:** Discovered that `01-proposal.md`, `02-wireframes.md`, and `03-design-system.md` were lost (most likely wiped when Vite's `--overwrite` ran in Session 2 before the `final-project-planning/` folder contents were safely written). All three were reconstructed verbatim from content read at the start of Session 1.

### 🔁 Files Restored (re-created from memory, content identical to originals)
| File | Notes |
|------|-------|
| `final-project-planning/01-proposal.md` | Full proposal: app name, user story, routes, state table, screen blocks, risks |
| `final-project-planning/02-wireframes.md` | Screen map, layout table, component tree (atoms/molecules/organisms/pages), sanity check |
| `final-project-planning/03-design-system.md` | Styling approach, 5 colour tokens, type scale, spacing tokens, reusable components table, responsive plan, accessibility checklist |

### ❌ Nothing Deleted / Moved / Modified

---

## [2026-09-17 · 14:19] — Session 3: Weekly Submission Files

**Summary:** Copied the completed journal and report markdown files from Downloads into the planning folder alongside the other planning documents.

### 🆕 Files Created
| File | Source | Contents |
|------|--------|---------|
| `final-project-planning/journal-week-1.md` | `C:\Users\PC\Downloads\journal-template.md` | Week 1 reflection journal — goal, what was done, blockers, lessons learned |
| `final-project-planning/report-week-1.md` | `C:\Users\PC\Downloads\report-template.md` | Week 1 increment report — changes, rationale, blockers, what remains |

### ❌ Nothing Deleted / Moved / Modified
The original files in `C:\Users\PC\Downloads\` were not touched.

---

## [2026-09-17 · 14:00] — Session 2: Environment Setup

**Summary:** Initialized the Vite + React environment, installed all frontend and backend dependencies, and attempted the PostgreSQL database setup.

### 🔁 Overwritten by Vite (then restored)
Vite's `--overwrite` flag wiped the entire `src/` folder. All files below were re-created after the wipe.

| File | Action |
|------|--------|
| `src/App.jsx` | Wiped by Vite → restored to our TindahanTrack version |
| `src/main.jsx` | Wiped by Vite → restored + edited (removed `import './index.css'`; styles load via `App.jsx → styles.css`) |
| `src/styles.css` | Wiped by Vite → re-created in a second pass (missed in first restore batch) |
| All 16 component files in `src/components/` | Wiped by Vite → fully restored |
| All 3 page files in `src/pages/` | Wiped by Vite → fully restored |

### 🆕 Added by Vite scaffold (net-new, not created by agent)
| File | Notes |
|------|-------|
| `package.json` | Project manifest with `dev`, `build`, `preview` scripts |
| `package-lock.json` | npm lockfile |
| `vite.config.js` | Vite config using `@vitejs/plugin-react` |
| `index.html` | HTML entry point with `<div id="root">` |
| `.gitignore` | Ignores `node_modules/`, `dist/` |
| `.oxlintrc.json` | Linter config |
| `README.md` | Vite boilerplate readme |
| `public/favicon.svg` | Default favicon |
| `public/icons.svg` | Icon sprite |
| `src/index.css` | Vite CSS reset — **not used by our app**, safe to delete |
| `src/App.css` | Vite counter demo styles — **not used by our app**, safe to delete |
| `src/assets/hero.png` | Vite starter image — not used, safe to delete |
| `src/assets/react.svg` | Vite starter image — not used, safe to delete |
| `src/assets/vite.svg` | Vite starter image — not used, safe to delete |
| `node_modules/` | All installed packages |

### 📦 Packages Installed

#### Frontend dependencies
| Package | Notes |
|---------|-------|
| `react` | Installed via Vite scaffold |
| `react-dom` | Installed via Vite scaffold |
| `react-router-dom` | Installed separately; used in `App.jsx`, `Header.jsx`, `BottomNav.jsx`, page files |

#### Frontend devDependencies
| Package | Version | Notes |
|---------|---------|-------|
| `vite` | 6.x | **Downgraded** from Vite 8 — Node v20.18.0 does not meet Vite 8's `>=20.19.0` requirement |
| `@vitejs/plugin-react` | 4.x | Matched to Vite 6 |

#### Backend dependencies
| Package | Purpose |
|---------|---------|
| `express` | HTTP server and router |
| `pg` | PostgreSQL client |
| `cors` | Cross-origin request headers |
| `dotenv` | Load environment variables from `.env` |

### ⚠️ Incomplete — Requires Manual Action
| Step | Status | What to do |
|------|--------|-----------|
| Create PostgreSQL database | ❌ Not done | `createdb` not on PATH — PostgreSQL is not installed. Install from postgresql.org, then run `createdb tindahantrack` |
| Run schema + seed | ❌ Not done | After installing PostgreSQL, run `psql -d tindahantrack -f server/schema.sql` |

---

## [2026-09-17 · 13:39] — Session 1: Project Scaffold

**Summary:** Read the three planning documents, organized planning files into a dedicated folder, and scaffolded the full frontend component tree and backend skeleton from scratch.

### 📁 Moved
| From (root) | To |
|-------------|----|
| `01-proposal.md` | `final-project-planning/01-proposal.md` |
| `02-wireframes.md` | `final-project-planning/02-wireframes.md` |
| `03-design-system.md` | `final-project-planning/03-design-system.md` |
| `mockup.html` | `final-project-planning/mockup.html` |

### 📂 Directories Created
| Directory | Purpose |
|-----------|---------|
| `final-project-planning/` | Holds all planning docs and the mockup |
| `src/components/atoms/` | Smallest, self-contained UI pieces |
| `src/components/molecules/` | Small groups of atoms |
| `src/components/organisms/` | Full page sections |
| `src/pages/` | Top-level route screens |
| `server/` | Node/Express backend |

### 🆕 Files Created

#### Design system
| File | Contents |
|------|---------|
| `src/styles.css` | `:root` CSS custom properties: 5 colour tokens, 3 type-scale tokens, 4 spacing tokens, border-radius, shadows, transitions, base reset, Google Font (Inter) import. Breakpoint reference at 768px. |

#### Root components
| File | Contents |
|------|---------|
| `src/App.jsx` | Owns `items[]` and `isLoading` state. Fetches from `http://localhost:3001/api/items`. Handles `handleUpdateStock` (optimistic UI) and `handleAddItem`. Renders `BrowserRouter` with 3 routes. |
| `src/main.jsx` | React 18 `createRoot` entry point. |

#### Atoms (`src/components/atoms/`)
| File | Props |
|------|-------|
| `Button.jsx` | `variant` ("primary"\|"secondary"), `onClick`, `children`, `type` |
| `Input.jsx` | `id`, `type`, `value`, `onChange`, `placeholder` |
| `FloatingActionButton.jsx` | `onClick` |
| `StockBadge.jsx` | `count`, `threshold` — renders red when `count <= threshold` |
| `CategoryPill.jsx` | `label`, `isActive`, `onClick` |

#### Molecules (`src/components/molecules/`)
| File | Props |
|------|-------|
| `ProductCard.jsx` | `product` object, `onUpdateStock(id, delta)` |
| `AlertRow.jsx` | `product` object |
| `SummaryCard.jsx` | `label`, `value`, `accent` (boolean — renders red variant) |
| `FormField.jsx` | `label`, `id`, `type`, `value`, `onChange`, `placeholder` — pairs `<label htmlFor>` with `<Input>` |

#### Organisms (`src/components/organisms/`)
| File | Props |
|------|-------|
| `Header.jsx` | `title`, `showBackButton` — includes nav links to all 3 routes |
| `BottomNav.jsx` | `activeTab` ("dashboard"\|"inventory"\|"add-item") |
| `ProductGrid.jsx` | `products[]`, `onUpdateStock` |
| `AlertList.jsx` | `items[]` — shows empty-state message when all stocked |
| `ProductForm.jsx` | `onSubmit`, `formError` — manages its own local field state |

#### Pages (`src/pages/`)
| File | Route | Props |
|------|-------|-------|
| `DashboardPage.jsx` | `/` | `items[]`, `isLoading` |
| `InventoryPage.jsx` | `/inventory` | `items[]`, `isLoading`, `onUpdateStock` — local `activeCategory` filter state |
| `AddProductPage.jsx` | `/add-item` | `onAddItem` — local `formError` state, redirects to `/inventory` on save |

#### Backend (`server/`)
| File | Contents |
|------|---------|
| `server/app.js` | Express app. `GET /api/items`, `POST /api/items`, `PATCH /api/items/:id/stock` (atomic SQL `GREATEST`), `DELETE /api/items/:id`. pg `Pool` via `DATABASE_URL` env var. CORS allowed for `http://localhost:5173`. |
| `server/schema.sql` | `items` table (`id`, `name`, `category`, `price`, `current_stock`, `min_threshold`, `created_at`, `updated_at`). Auto `updated_at` trigger via `plpgsql` function. 20 seed rows of realistic sari-sari store products. |

### ❌ Nothing Deleted
No files were permanently removed. The four planning files were moved, not deleted.

---

*This file is maintained by the AI agent. It is updated at the end of every session that makes changes to the project.*
