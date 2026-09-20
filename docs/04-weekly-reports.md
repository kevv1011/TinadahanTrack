# Weekly reports

Five minutes a week. Add a new section at the top; never edit an old one.

The value is entirely in writing them **while it is happening**. What took four
hours and why is invisible a month later, and it is exactly what your journal
needs.

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
