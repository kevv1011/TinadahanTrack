# Final Project

## My project repository
Public repository: (Link to be added by user)
Live app (if deployed): (Pending)

## What it is
TindahanTrack is a mobile-first inventory dashboard built with React, Node/Express, and PostgreSQL, designed to help neighborhood sari-sari stores track stock levels and automate reorder alerts.

## How to run it

### 1. Database Setup (PostgreSQL)
1. Install PostgreSQL on your local machine.
2. Open your terminal and create the database:
   ```bash
   createdb tindahantrack
   ```
3. Load the table schema and sample data:
   ```bash
   psql -d tindahantrack -f server/schema.sql
   ```

### 2. Backend API Setup
1. Open a new terminal and navigate to the backend folder:
   ```bash
   cd server
   npm install
   ```
2. Create your environment variables file:
   ```bash
   cp .env.example .env
   ```
3. Edit the `.env` file and set the `DATABASE_URL` (replace `your_username` and `your_password` with your actual Postgres credentials):
   `DATABASE_URL=postgres://your_username:your_password@localhost:5432/tindahantrack`
4. Start the Express server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a second terminal window in the project root:
   ```bash
   npm install
   cp .env.example .env
   ```
2. Open the `.env` file and set `VITE_USE_MOCK_API=false` to connect to the real API instead of demo mode.
3. Start the React development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## Presentation
- Video: (Pending for Week 3)
- Slides: (Pending for Week 3)
- Square image: (Pending for Week 3)
