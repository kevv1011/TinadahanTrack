# Reflection Journal

## Week of: September 17, 2026

## My goal this week
My goal was to complete all project planning documentation for TindahanTrack, initialize the full-stack repository, and build out the complete frontend user interface so development can shift entirely to backend integration next week.

## What I did
I designed a mobile-first UI tailored for a sari-sari store owner, breaking the interface down into reusable atoms, molecules, and organisms. After scaffolding the React frontend and Node/Express backend, I implemented the full design system in CSS. I also built out quality-of-life UI features like a sticky search bar, toast notifications, and category dropdowns. Finally, I deployed the frontend to GitHub Pages and implemented a persistent "Demo Mode" using `localStorage` so the app is fully functional and testable before the API is ready.

## What blocked me
My biggest blocker was a build tool issue where Vite's `--overwrite` flag wiped out the `src/` directory containing all my pre-generated component files. I also got blocked during deployment when GitHub Pages showed a blank white screen; I had to learn how to create a GitHub Actions workflow and configure React Router's `basename` to fix the subpath routing. I am also temporarily blocked from testing my backend API routes until I manually install PostgreSQL locally.

## What I learned
I learned that strictly planning the component tree beforehand makes setting up the actual file structure incredibly fast. I also realized the immense value of building out the frontend with `localStorage` persistence first; it allows you to completely validate the mobile user experience and hit deployment milestones without worrying about database queries or API latency.