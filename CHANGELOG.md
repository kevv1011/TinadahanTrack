# TindahanTrack — Agent Changelog

All changes made by the AI agent are recorded here in reverse-chronological order.
Each entry includes the date, a summary, and a precise breakdown by action type.

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
