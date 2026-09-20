# Reflection Journal

## Week of: September 24, 2026

## My goal this week

My goal was to complete TindahanTrack's Point of Sale workflow and give store owners useful sales and inventory insights. I also wanted the project to remain easy for a professor to evaluate even if my local Express server and temporary ngrok tunnel were offline.

## What I did

I built the POS Quick Cart so a store owner can select multiple products, adjust quantities, enter cash tendered, see the calculated change, and complete a sale. A completed-sale receipt now confirms the items, total, cash, change, and timestamp. I connected deductions to the transactions data so the dashboard can show Recent Transactions, revenue totals, a seven-day sales chart, and fast-moving products.

I also added an API error/retry state, a first-use cart hint, a running cart total, category-aware product-image fallbacks, and a warmer visual design. I kept the dual-mode data architecture intact: Live Mode uses Express, Neon PostgreSQL, and ngrok; Demo Mode uses browser `localStorage` while retaining the same core inventory and POS flows.

## What blocked me

My biggest blocker was ngrok's free-tier browser warning. It intercepted client `GET` requests and returned HTML instead of the JSON the React app expected, so live inventory failed to display even when the API was running. I resolved this by adding the `ngrok-skip-browser-warning` header to every client API request.

I also had to think about how a professor could evaluate the project when I am not available to run my computer, Express server, and ngrok tunnel. The solution was to keep the GitHub Pages deployment in Demo Mode, where the full interface works independently in the browser, while retaining a separate live Neon-backed mode for demonstrating the full-stack architecture.

## What I learned

I learned that a complete local full-stack application and a dependable public demonstration need different deployment strategies. The dual-mode approach made it possible to demonstrate a real PostgreSQL API without making the project dependent on a temporary tunnel. I also learned to validate the actual content type of API responses, because a successful request can still return unusable data when a proxy or tunnel intervenes.
