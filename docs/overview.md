# Application Overview

## Architecture

The application follows a **client-server architecture**:

- **Frontend**: Next.js handles UI, routing and data fetching
- **Backend**: Express REST API handles business logic
- **Database**: PostgreSQL hosted on Neon
- **Authentication**: JWT-based authentication

## High-Level Flow

1. User interacts with the frontend UI
2. Frontend sends HTTP requests via Axios
3. Backend validates requests and interacts with PostgreSQL
4. JWT tokens are issued and verified for protected routes
5. Data is returned and cached using TanStack Query

## Design Principles

- Reusable UI components
- Secure authentication flows
- Scalable backend structure
