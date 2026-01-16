# Fullstack Task Management Application

## Overview

This is a fullstack web application built using **Next.js** for the frontend and **Node.js with Express** for the backend.
It, currently, includes a complete authentication system and the dashboard with task management features is being worked on.

Individual documentations locations:
- Frontend Documentation: frontend/README.md
- Backend Documentation: backend/README.md
- Database Documentation: backend/db/README.md

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
