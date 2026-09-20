# Reflection Journal
**Week of:** September 24, 2026

**My goal this week**
My goal was to transition TindahanTrack from a static prototype into a fully functional, database-driven application by wiring the React frontend to the Express backend. I also aimed to refactor our monolithic repository into the strict `/client` and `/server` monorepo structure required by the final project template.

**What I did**
I connected our Express backend to a cloud-hosted Neon PostgreSQL database and wrote the seed script to populate it. I then updated the React frontend to make live `fetch()` calls for full CRUD operations, while carefully maintaining our `localStorage` demo mode as a fallback. I also implemented a robust Edit/Delete React modal, upgraded the interface to use `lucide-react` icons, and added a persistent Dark Mode. Finally, I restructured the entire repository into a monorepo and updated the CI/CD pipeline so GitHub Pages continues deploying smoothly.

**What blocked me**
My biggest blocker was dealing with build cache issues after restructuring the repository. When I moved all the frontend code into the `/client` folder, the local Vite dev server started serving a blank white screen because it couldn't find the relocated files. I had to stop the server, force clear the `.vite` cache, and run a clean `npm install` inside the new directory to get the environment working again.

**What I learned**
I learned that file paths and build caches in React/Vite are incredibly sensitive to structural changes, and moving a project requires updating everything from `node_modules` to GitHub Action workflows. I also realized how much smoother database integration is when using a cloud provider like Neon; it completely bypassed the headaches of installing and configuring PostgreSQL locally on Windows.
