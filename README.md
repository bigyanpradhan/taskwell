# Fullstack Task Management Application

## Overview

This is a fullstack web application built using **Next.js** for the frontend and **Node.js with Express** for the backend.
It, currently, includes a complete authentication system and the dashboard with task management features is being worked on.

## Tech Stack

### Frontend

- Next.js
- Shadcn UI
- Tailwind CSS
- TanStack Query
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- PostgreSQL (Neon Console)
- JSON Web Token (JWT)
- Nodemailer

## Features

### Completed

- User signup
- User signin
- JWT-based authentication
- Protected routes
- Forgot password using email (reset link)
- Reset / change password
- Frontend and backend validations

### In Progress

- Dashboard UI
- Dashboard backend logic

### Planned

- Task CRUD operations
- Filters and sorting
- Performance optimizations
- Zod for form validation

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (Neon)
- npm / yarn / pnpm

### Environment Variables

#### Backend

- CONNECTION_STRING=
- JWT_SECRET_KEY=
- GMAIL_USER=
- GMAIL_PASS= //App password not the actual gmail password

#### Frontend

None

```bash
# Backend
npm install
node setupDatabase.js
npm run dev

#Frontend
npm install
npm run dev
```

## Frontend Folder Structure

public/
src/
├─ app/
│ ├─ layout.tsx
│ ├─ (auth)/
│ │ ├─ layout.tsx
│ │ ├─ login/
│ │ ├─ signup/
│ │ ├─ forgotpassword/
│ │ └─ resetpassword/
│ ├─ (protected)/
│ │ ├─ layout.tsx
│ │ └─ dashboard/
│
├─ components/
│ ├─ auth/
│ ├─ layout/
│ └─ ui/ # shadcn UI components
│
├─ handlers/ # TanStack queries & mutations
├─ hooks/
├─ lib/
├─ providers/ # TanStack Query Provider
└─ services/ # Axios instance & API requests

## Backend Folder Structure

backend/
├─ controllers/
│ ├─ userController.js
│ └─ taskController.js
│
├─ db/
│ ├─ connect.js
│ ├─ schema.sql
│ └─ setupDatabase.js
│
├─ middleware/
│ ├─ authenticator.js # verifies JWT token
│ └─ authenticateResetToken.js # verifies password reset token
│
├─ models/
│ ├─ userModel.js
│ └─ taskModel.js
│
├─ routes/
│ └─ routes.js
│
├─ .env
└─ index.js # main entry point
