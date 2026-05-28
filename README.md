# ChaiForms

A futuristic full-stack form builder platform built with modern web technologies.
Create immersive forms, collect submissions, manage responses, and build cinematic form experiences with a beautiful sacred-tech inspired UI.

---
### Live URL : https://chaiforms-web.vercel.app/

### Demo Credentials :
email : rohit@gmail.com

password : Rohit12345

# Features

* Futuristic cinematic UI
* Full authentication system
* Protected dashboard
* Create & manage forms
* Dynamic form fields
* Public form sharing
* Form submissions
* Submission analytics
* CSV export
* Dashboard metrics
* Multiple form themes
* Responsive design
* tRPC API architecture
* PostgreSQL + Drizzle ORM
* Monorepo architecture

---

# Tech Stack

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* React Hook Form
* Recharts
* Lucide Icons
* tRPC Client

## Backend

* Node.js
* Express
* tRPC
* PostgreSQL
* Drizzle ORM
* JWT Authentication
* Cookie-based Auth

## Database

* Supabase PostgreSQL

## Monorepo

* Turborepo
* PNPM Workspaces

---

# Project Structure

```bash
apps/
  web/          # Next.js frontend
  api/          # Express + tRPC backend

packages/
  database/     # Drizzle ORM + schema
  trpc/         # Shared tRPC setup
  services/     # Business logic
  logger/
  typescript-config/
  eslint-config/
```

---

# Screenshots

## Login Page

* Futuristic sacred-tech login experience
* Cinematic glassmorphism UI

## Dashboard

* Analytics overview
* Form management
* Activity feed
* Submission charts

## Form Builder

* Dynamic fields
* Theme selection
* Visibility controls

## Submissions

* Submission tracking
* Detailed response viewer
* CSV export support

---

# Demo Credentials

Use these credentials to explore the platform:

```bash
Email: rohit@gmail.com
Password: Rohit12345
```

---

# Getting Started

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/chaiforms.git
```

---

## 2. Install Dependencies

```bash
pnpm install
```

---

## 3. Setup Environment Variables

Create `.env` files.

### apps/api/.env

```env
PORT=8080

DATABASE_URL=your_supabase_database_url

JWT_SECRET=your_jwt_secret
```

### apps/web/.env

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 4. Run Database Migrations

```bash
pnpm drizzle-kit push
```

---

## 5. Start Development Server

```bash
pnpm dev
```

---

# Production Deployment

## Frontend

Deploy frontend on:

* Vercel

## Backend

Deploy backend on:

* Render

## Database

Use:

* Supabase PostgreSQL

---

# Authentication

ChaiForms uses:

* JWT authentication
* HTTP-only cookies
* Protected tRPC procedures
* Client-side session validation

---

# Available Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm format
pnpm drizzle-kit push
pnpm drizzle-kit studio
```

---

# Form Themes

Current supported themes:

* sacred-tech
* cyberpunk
* anime
* startup-os

---

# Roadmap

* AI form generation
* Form analytics AI
* WebSocket live submissions
* Team collaboration
* Payment integration
* Public templates marketplace
* Email workflows
* Custom domains

---

# Author

Built by Rohit Chornele

Portfolio:

https://rohitchornele.online/

---

# License

MIT License

---

# ChaiForms Vision

ChaiForms is not just another form builder.

It is designed to feel like a futuristic creator operating system inspired by cinematic interfaces, sacred geometry aesthetics, and immersive digital experiences.
