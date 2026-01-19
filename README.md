# Fullstack Task Management Application

## Overview

This is a fullstack web application built using **Next.js** for the frontend and **Node.js with Express** for the backend.
It, currently, includes a complete authentication system and the dashboard with task management features is being worked on.

Individual documentations locations:

- Frontend Documentation: frontend/README.md
- Backend Documentation: backend/README.md
- Database Documentation: backend/db/README.md
- API Documentation: docs/apidocumentation.md

## Frontend Folder Structure

public/<br>
src/<br>
├─ app/<br>
│ ├─ layout.tsx<br>
│ ├─ (auth)/<br>
│ │ ├─ layout.tsx<br>
│ │ ├─ login/<br>
│ │ ├─ signup/<br>
│ │ ├─ forgotpassword/<br>
│ │ └─ resetpassword/<br>
│ ├─ (protected)/<br>
│ │ ├─ layout.tsx<br>
│ │ └─ dashboard/<br>
│<br>
├─ components/<br>
│ ├─ auth/<br>
│ ├─ layout/<br>
│ └─ ui/ # shadcn UI components<br>
│<br>
├─ handlers/ # TanStack queries & mutations<br>
├─ hooks/<br>
├─ lib/<br>
├─ providers/ # TanStack Query Provider<br>
└─ services/ # Axios instance & API requests<br>

## Backend Folder Structure

backend/<br>
├─ controllers/<br>
│ ├─ userController.js<br>
│ └─ taskController.js<br>
│<br>
├─ db/<br>
│ ├─ connect.js<br>
│ ├─ schema.sql<br>
│ └─ setupDatabase.js<br>
│<br>
├─ middleware/<br>
│ ├─ authenticator.js # verifies JWT token<br>
│ └─ authenticateResetToken.js # verifies password reset token<br>
│<br>
├─ models/<br>
│ ├─ userModel.js<br>
│ └─ taskModel.js<br>
│<br>
├─ routes/<br>
│ └─ routes.js<br>
│<br>
├─ .env<br>
└─ index.js # main entry point<br>
