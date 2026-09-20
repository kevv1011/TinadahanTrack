# Weekly Increment Report
**Week of:** September 24, 2026

**What changed this week**
- Successfully connected the Node/Express backend to a live Neon PostgreSQL database in the cloud, bypassing the need for a local installation, and ran the seed script to populate realistic data.
- Replaced the frontend's mock data logic with live `fetch()` API calls to handle full CRUD operations for inventory management.
- Polished the UI by replacing placeholder actions with a fully functional Edit/Delete React modal, upgrading all icons to professional `lucide-react` vectors, and implementing a persistent Dark Mode theme toggle.
- Performed a major architectural refactoring of the repository into a strict `/client` and `/server` monorepo structure to align perfectly with the course's final project template requirements.
- Updated the `deploy.yml` GitHub Actions pipeline to ensure the newly nested React `/client` still deploys flawlessly to GitHub Pages.

**Why**
Connecting the frontend to a real cloud database transitions TindahanTrack from a static prototype into a true full-stack application. Refactoring the repository into a clean monorepo was critical to satisfying the course's structural requirements and keeping the API separation clean. Finally, the UI polishes (like Dark Mode and the Edit Modal) dramatically enhance the app's professional feel and usability for end-users.

**What broke or what I got stuck on**
During the monorepo restructure, moving the React app into the `/client` folder broke the local development environment because Vite's internal cache was still looking for files in the root directory, resulting in a blank white screen. I had to learn how to force clear the Vite cache (`npm run dev -- --force`) and manually reinstall the `node_modules` to fix the paths. Additionally, the repository restructure broke our GitHub Pages deployment until I manually updated the `deploy.yml` pipeline to point to the new `./client` working directory.

**What is left**
- Implement Week 3 POS features, including the "Quick Cart" batch-deduction tool and the Recent Transactions history feed.
- Add Dashboard Analytics (like a Donut chart showing total inventory value) to give store owners better insights.
- Deploy the Express API to Render to bring the backend fully online for public access.
