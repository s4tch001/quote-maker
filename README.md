# Quote Maker

Quote Maker is a Next.js application for creating professional quotes and managing business customers.

## Tech Stack

- Next.js 16.2.11
- React 19.2.4
- TypeScript 5.9.3
- Tailwind CSS 4
- Prisma 7.9.0 with PostgreSQL
- Base UI toast primitives
- React Hook Form
- Zod
- TanStack Query
- Axios

## Prerequisites

Install these before running the project:

- Node.js 20.9 or newer
- npm, included with Node.js
- Git

Check your local versions:

```bash
node --version
npm --version
git --version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/s4tch001/quote-maker.git
cd quote-maker
```

Install dependencies from the lockfile:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the Next.js development server with Turbopack.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after running `npm run build`.

```bash
npm run lint
```

Runs ESLint for code quality checks.

## Project Structure

```txt
app/                 Next.js App Router routes, layouts, and route handlers
app/(auth)/          Authentication pages
app/(root)/          Main application route group
app/api/             API route handlers
components/          Reusable React components
components/ui/       shadcn-style UI components
lib/                 Shared utilities, schema, and providers
public/              Static assets
```

## shadcn Notes

The UI components live in `components/ui`. The toast helper supports method-style calls with a position option:

```tsx
import { toast } from "@/components/ui/toast"

toast.add({
  type: "success",
  description: "Successfully Registered",
  position: "bottom-left",
})
```

Supported toast positions:

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

## Environment Variables

Copy `.env.example` to `.env` and set the PostgreSQL connection string required by Prisma:

```bash
Copy-Item .env.example .env
```

Never commit real secrets. Local environment files are ignored by `.gitignore`:

```txt
.env*
```

Keep generated build output, dependencies, local caches, and database dumps out of Git.
