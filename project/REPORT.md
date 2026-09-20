# Weekly Increment Report

## Week of: September 24, 2026

## What changed this week
- Completed the POS Quick Cart with batch stock deduction, cash tendering, calculated change, checkout receipt, and transaction logging.
- Added inventory and sales analytics: stock health, total inventory value, today/week revenue, a seven-day chart, and fast-moving products.
- Added resilient live API feedback with a Retry action, then fixed ngrok's HTML browser-warning response by attaching the `ngrok-skip-browser-warning` header to every frontend API request.
- Improved the mobile and desktop experience with a cart onboarding hint, running cart total, category-based image fallbacks, compact dashboard metrics, and a warmer design system.
- Kept the GitHub Pages deployment in self-contained Demo Mode so reviewers can evaluate the full app without needing a local server, Neon credentials, or an active ngrok tunnel.

## Why
These changes make the project usable as an end-to-end store workflow rather than only an inventory prototype. The POS and analytics features give store owners practical sales and restocking feedback, while the dual-mode architecture balances a real Neon-backed API with a reliable browser-only evaluation experience.

## What broke or what I got stuck on
ngrok's free-tier browser warning intercepted API `GET` requests and returned HTML instead of JSON, so the frontend could not display live inventory even while the API was online. I resolved this by including ngrok's bypass header in all frontend `fetch()` calls. I also had to ensure that the GitHub Pages version remains functional when the temporary local tunnel is offline.

## What is left
- Record the final demo video and test the GitHub Pages Demo Mode flow in a clean browser profile.
- Transition the temporary local ngrok API tunnel to a dedicated cloud host when platform availability stabilizes.
- Add authentication if the project is extended beyond the course submission.
