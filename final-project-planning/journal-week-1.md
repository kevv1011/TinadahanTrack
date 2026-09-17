# Reflection Journal

## Week of: September 17, 2026

## My goal this week
My goal was to complete all project planning documentation for TindahanTrack, initialize the full-stack repository, and build out the complete frontend user interface so development can shift entirely to backend integration next week.

## What I did
I designed a mobile-first UI tailored for a sari-sari store owner, breaking the interface down into reusable atoms, molecules, and organisms. After scaffolding the React frontend and Node/Express backend, I implemented the full design system in CSS. I also built out quality-of-life UI features like a sticky search bar, toast notifications, and category dropdowns so the app feels like a real, reactive retail system even without the database connected.

## What blocked me
My biggest blocker was a build tool issue. When I ran the Vite setup command, it overwrote the component files I had already organized in the `src/` folder. I had to manually restore the directory. I am also temporarily blocked from testing my API routes because I need to manually install PostgreSQL on my machine before I can run the database setup commands.

## What I learned
I learned that strictly planning the component tree beforehand makes setting up the actual file structure incredibly fast. I also realized the value of building out the frontend with "empty states" and placeholder functions first; it allows you to completely validate the mobile user experience before worrying about database queries or API latency.