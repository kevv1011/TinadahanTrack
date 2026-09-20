# Weekly Increment Report

## Week of: September 24, 2026

## What changed this week

- Completed the Point of Sale (POS) Quick Cart with multi-item batch stock deductions, quantity controls, cash tendering, calculated change, checkout validation, and a completed-sale receipt.
- Connected completed deductions to the existing Neon PostgreSQL `transactions` table and preserved matching `localStorage` transaction logging in Demo Mode.
- Added dashboard analytics for total inventory value, stock health, today and seven-day revenue, a seven-day revenue chart, Recent Transactions, and fast-moving products.
- Added a visible live-API error state with a Retry action, a first-use cart hint, a cart total indicator, category-specific product-image fallbacks, and a warmer mobile-first visual design.
- Added `GET /api/analytics`, which calculates revenue and product movement from existing transaction data without a database schema migration.
- Fixed ngrok's free-tier browser warning by adding the `ngrok-skip-browser-warning` header to every frontend API request.
- Documented the dual-mode deployment strategy: GitHub Pages provides a reliable browser-only Demo Mode for evaluation, while the local Express API can connect to Neon through a temporary ngrok tunnel.

## Why

These changes turn TindahanTrack into a complete store workflow rather than only an inventory prototype. The POS flow lets a store owner record a sale quickly, while transaction logging and analytics make stock movement and revenue visible. Keeping both live API and Demo Mode support is important because it demonstrates a real full-stack architecture without requiring a reviewer to depend on a temporary local tunnel.

## What broke or what I got stuck on

ngrok's free-tier browser warning intercepted frontend `GET` requests and returned an HTML page instead of API JSON. As a result, the live API was reachable but inventory did not display in the client. I fixed the problem by adding ngrok's browser-warning bypass header to all `fetch()` calls, including inventory, transactions, stats, analytics, CRUD actions, and uploads. I also had to account for the fact that a local ngrok tunnel may not be running when a professor reviews the project, so GitHub Pages remains in self-contained Demo Mode.

## What is left

- Record the final demo video and test the GitHub Pages Demo Mode flow in a clean browser profile.
- Transition the temporary local ngrok tunnel to a dedicated cloud host when platform availability stabilizes.
- Add user authentication if TindahanTrack is extended beyond the course submission.
