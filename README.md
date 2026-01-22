# Fullstack Task Management Application

## Overview

This is a fullstack web application built using **Next.js** for the frontend and **Node.js with Express** for the backend. It includes a complete authentication system and the dashboard with task management features. The backend contains complete CRUD operation for Task management along with security measures implemented using npm packages such as helmet, cors and express-rate-limt. The frontend utilizes the DRY principle with reusable components utilized, both Custom and third-party ones, for developing an intuitive UI/UX.

Individual documentations locations:

- Frontend Documentation: frontend/README.md
- Backend Documentation: backend/README.md
- Database Documentation: backend/db/README.md
- API Documentation: docs/apidocumentation.md
- API Documentation(**In Swagger**): Run the backend and go to http://localhost:8000/api-docs/. For more info see the Backend Documentation.

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
├─ services/ # Axios instance & API requests<br>
└─ README.md/ # Frontend Documentation<br>

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
├─ index.js # main entry point<br>
└─ README.md/ # Backend Documentation<br>

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/bigyanpradhan/taskwell.git
```

2. Setup Backend

```bash
cd backend
```

Follow the instructions in the backend documentation

3. Setup Frontend

```bash
cd .. // Get into the root directory of you repo
cd frontend
```

Follow the instructions in the frontend documentation

4. Verify

Open the http://localhost:3000 to see the application.

Note: Make sure the ports 3000(frontend) and 8000(backend) aren't taken up by others. Or you can change the ports in order to run the application.
