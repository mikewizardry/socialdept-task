# BookmarkHub

A simple, modern bookmark manager built with Next.js, TypeScript, and PostgreSQL. You can sign up with Clerk, organize bookmarks into categories, and search or filter them easily. The UI is responsive and uses Tailwind CSS and Shadcn UI.

## Setup

1. Clone this repo and install dependencies with:
   ```bash
   pnpm install
   ```

2. Copy `env-example.txt` to `.env.local` and fill in your database and Clerk keys.

3. Push the database schema:
   ```bash
   pnpm db:push
   ```

4. Start the dev server:
   ```bash
   pnpm dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

**Main stack:** Next.js, TypeScript, Drizzle ORM, Clerk, Tailwind CSS, Shadcn UI.
