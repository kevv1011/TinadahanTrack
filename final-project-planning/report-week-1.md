# Weekly Increment Report

## Week of: September 17, 2026

## What changed this week
- Completed the pre-coding planning phase: created the Proposal, Wireframes, Component Tree, and Design System with custom CSS tokens.
- Scaffolded the frontend environment using Vite and React, organizing the `src/components/` folder into Atomic Design layers (atoms, molecules, organisms, pages).
- Scaffolded the backend environment by setting up an Express server (`app.js`) with initial CRUD routes and wrote the PostgreSQL schema (`schema.sql`) with 20 seed items.
- Translated the visual design system into a fully polished mobile POS interface using plain CSS.
- Added major functional UX enhancements to the frontend: a sticky search bar to filter inventory, a native category dropdown `<select>` for the Add Product form, a 3-second success toast notification, and placeholder Edit/Delete actions.

## Why
These changes establish a solid structural foundation for TindahanTrack. Doing the planning and frontend UI polish first ensures the component architecture is highly organized and the user experience is fully validated before writing the complex backend database logic.

## What broke or what I got stuck on
I encountered a development environment conflict when initializing React: Vite's `--overwrite` flag wiped out the `src/` directory containing all my pre-generated component files. I had to carefully restore the folder. Additionally, my backend is currently blocked because PostgreSQL is not yet installed on my local machine, preventing the `createdb` command from running.

## What is left
- Install PostgreSQL locally, create the `tindahantrack` database, and run the schema file.
- Wire up the React frontend state to actually fetch and update data from the Express backend API.
- Complete Week 2 progress goals and record the presentation video.