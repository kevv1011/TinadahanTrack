# Weekly reports

Five minutes a week. Add a new section at the top; never edit an old one.

The value is entirely in writing them **while it is happening**. What took four
hours and why is invisible a month later, and it is exactly what your journal
needs.

---

## Week of 2026-09-24 (Week 3)

**Done.** Completed the Point of Sale Quick Cart with batch stock deduction, cash tendering, calculated change, a checkout receipt, and transaction logging. Added dashboard analytics for inventory value, revenue, seven-day sales trends, and fast-moving products. Added live API retry feedback, clearer cart guidance, category-aware image fallbacks, and a warmer visual design system. Configured the frontend to send ngrok's browser-warning bypass header for every API request and documented the temporary ngrok architecture.

**Stuck.** ngrok's free-tier browser warning returned HTML to frontend `GET` requests instead of JSON, which made live inventory data fail to display even though the API was reachable. Adding the `ngrok-skip-browser-warning` request header to all client API calls resolved the issue. The temporary tunnel also highlighted that the hosted client must retain Demo Mode as the reliable evaluation fallback.

**Hours.** 14

**Next.** Record the demo video, verify the final GitHub Pages Demo Mode flow on a clean browser profile, and move the API to a dedicated cloud host when platform availability stabilizes.

---

## Week of 2026-09-18 (Week 2)

**Done.** Replaced all the stubbed UI buttons (edit/delete) with fully wired modals. Hooked up the React frontend to the Express backend so the app now reads and writes directly to the Neon PostgreSQL database. Created the `PUT /api/items/:id` and `DELETE /api/items/:id` endpoints.

**Stuck.** Encountered issues properly syncing state between the optimistic UI updates and the actual backend database responses, requiring careful promise chaining inside the React handlers.

**Hours.** 12

**Next.** Implement POS-style inventory analytics, a batch deduction "Quick Cart", and a recent sales history feed.

---

## Week of 2026-09-11 (Week 1)

**Done.** Completed project planning documentation, scaffolded the full-stack repository (React + Node/Express), and built out the mobile-first UI with a complete design system in CSS. Deployed the frontend to GitHub Pages and implemented a persistent "Demo Mode" using `localStorage`.

**Stuck.** Vite's `--overwrite` flag accidentally wiped out the `src/` directory containing all pre-generated component files. Also got stuck during deployment when GitHub Pages showed a blank white screen due to missing React Router `basename` configuration for subpath routing.

**Hours.** 15

**Next.** Shift entirely to backend integration and connect the UI to a real PostgreSQL database.
