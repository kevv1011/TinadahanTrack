# Weekly Increment Report

## Week of: September 17, 2026

## What changed this week
- Completed the pre-coding planning phase: created the Proposal, Wireframes, Component Tree, and Design System with custom CSS tokens.
- Scaffolded the frontend environment using Vite and React, organizing the `src/components/` folder into Atomic Design layers (atoms, molecules, organisms, pages).
- Scaffolded the backend environment by setting up an Express server (`app.js`) with initial CRUD routes and wrote the PostgreSQL schema (`schema.sql`) with 20 seed items.
- Translated the visual design system into a fully polished mobile POS interface using plain CSS.
- Added major functional UX enhancements to the frontend: a sticky search bar to filter inventory, a native category dropdown `<select>` for the Add Product form, a 3-second success toast notification, and placeholder Edit/Delete actions.
- Fully implemented a persistent offline "Demo Mode" using `localStorage` to seed default database items and save stock updates natively in the browser.
- Deployed the React frontend live on GitHub Pages using a custom automated CI/CD workflow.
- Implemented final frontend UI polishes including skeleton loading states, stat counter animations, custom transparent logo branding, and tactile button press effects.

## Why
These changes establish a solid structural foundation for TindahanTrack. Doing the planning and frontend UI polish first ensures the component architecture is highly organized and the user experience is fully validated before writing the complex backend database logic. Implementing Demo Mode allowed us to hit our deployment goal and have a live, working URL on day one.

## What broke or what I got stuck on
I encountered a development environment conflict when initializing React: Vite's `--overwrite` flag wiped out the `src/` directory containing all my pre-generated component files, requiring a manual restore. I also got stuck debugging a "white screen" 404 error during GitHub Pages deployment, which required creating a custom `.github/workflows/deploy.yml` file and configuring the `react-router-dom` basename to properly match the repository subdirectory path.

## What is left
- Install PostgreSQL locally, create the `tindahantrack` database, and run the schema file.
- Wire up the React frontend state to actually fetch and update data from the Express backend API instead of `localStorage`.
- Complete Week 2 progress goals and record the presentation video.