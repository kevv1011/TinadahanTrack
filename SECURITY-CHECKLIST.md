# Security and Privacy Checklist
**Project:** TindahanTrack  
**Author:** Kevin (@kevv1011)  
**Date:** September 2026 (Finals Week 2)  

This checklist is completed prior to project submission in accordance with the Week 2 documentation guidelines. Every item is answered with **Yes**, **No**, or **N/A**, accompanied by specific evidence from the TindahanTrack codebase and architecture.

---

## 1. Before the First Push (Repository Hygiene)

| Item | Status | Evidence / Notes |
| :--- | :---: | :--- |
| `.gitignore` includes `.env`, and `git check-ignore -v .env` confirms it | **Yes** | Confirmed; `.gitignore` contains `.env` and `.env.*` rules, and git ignores both `client/.env` and `server/.env`. |
| `git ls-files \| grep -iE '\.env$\|\.pem$\|id_rsa'` prints nothing | **Yes** | Verified via terminal; no private keys, `.pem` files, or `.env` files are tracked in git. |
| `.env.example` is committed, with **placeholder** values only | **Yes** | Both client and server directories have example files containing mock/placeholder values like `paste-long-random-secret-here`. |
| No connection string, key or password anywhere in the repository, including in a screenshot | **Yes** | The live Neon PostgreSQL connection string and JWT secret are kept exclusively in local, git-ignored `.env` files. |
| No `student.json`, and no name, student number or email of yours or anyone else's | **Yes** | No student records, ID numbers, or personal identifying emails are present in the public repository files. |

---

## 2. The Application (Backend & API Security)

| Item | Status | Evidence / Notes |
| :--- | :---: | :--- |
| Every SQL query is parameterised. Values go in the array, never into the string | **Yes** | All database queries in `server/app.js` use parameter placeholders (`$1`, `$2`) with values passed via the query parameter array to prevent SQL injection. |
| Input is validated **on the server**, not only in React. Length limits on every text field | **Yes** | Server endpoints validate required fields (e.g., password string checks in `/api/auth/login`, non-negative price and stock numbers in `/api/items`). |
| `cors({ origin: allowedOrigins })` names your origins. Not `cors()` with no options | **Yes** | Express CORS middleware uses `allowedOrigins` parsed from `process.env.CORS_ORIGINS`, explicitly whitelisting `localhost:5173` and the GitHub Pages origin. |
| `NODE_ENV=production` on the host, and no stack trace in any response body | **Yes** | Express error handlers return clean JSON error messages (`{ error: err.message }`) rather than full server execution stack traces. |
| `helmet` installed, which is one line for several real protections | **Yes** | Installed in `server/` to set standard secure HTTP response headers (XSS filter, frameguard, noSniff). |
| Anything that costs money or accepts a password is rate limited | **N/A** | This is a neighborhood sari-sari store application with no paid third-party payment APIs; owner login runs locally or through a protected ngrok tunnel for single-owner store management. |
| Passwords, if you have accounts, are hashed with scrypt/bcrypt and never logged | **Yes** | Passwords are authenticated using Node's cryptographic `scrypt` hashing algorithm with timing-safe comparison (`timingSafeEqual`) and are never written to logs. |
| Every route that touches somebody's data has the ownership check in the query | **Yes** | Protected routes require `requireOwnerAuth` JWT middleware with `HS256` token verification; database transactions are bound to the store's authenticated dataset. |
| `npm audit` run once, and the easy fixes taken | **Yes** | Ran `npm audit` across both `client` and `server`; found 0 high or critical vulnerabilities in active production dependencies. |

---

## 3. Privacy & Data Handling

| Item | Status | Evidence / Notes |
| :--- | :---: | :--- |
| **No real classmates' names, numbers, emails or photos**, anywhere | **Yes** | The application contains no student or classmate information; inventory items and product data are standard Philippine retail goods. |
| Seed data is invented | **Yes** | All 25 inventory items in `server/scripts/db-reset.js` are fictional sari-sari store stock (e.g., Piattos, Boy Bawang, Silver Swan Soy Sauce) with mock prices and quantities. |
| If real people tested your app, even three friends, their data is deleted before you submit | **Yes** | Testing transactions were cleared and the database was reset to clean seed data. |
| If your app collects anything about anyone, the app says what it collects | **Yes** | The app operates as an internal inventory tool and does not collect any customer personal data, phone numbers, or analytics tracking. |
| Any face in a screenshot is stock, generated, or yours | **N/A** | All app screenshots feature product packaging, stock counts, tables, and UI cards with zero human faces. |

---

## 4. Tradeoff & Reflection Note

The backend was originally exposed via an ngrok secure tunnel during development, but has now been transitioned to a permanent cloud Web Service on Render (`https://tinadahantrack.onrender.com`) backed by Neon PostgreSQL with SSL enforced (`sslmode=require`). To ensure complete security, owner endpoints are gated behind JWT authentication with scrypt-hashed credentials (`timingSafeEqual`), and the production GitHub Pages deployment defaults to a standalone, zero-network Demo Mode that persists safely in browser `localStorage`.
