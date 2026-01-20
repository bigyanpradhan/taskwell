# BACKEND DOCUMENTATION

For backend, Node.js with Express.js is used to create a REST API for the Task Management and Postman was used to test out the endpoints and their responses as well. Postgres is used as the database and is hosted on the Neon Console. Zod is also used for input validation and a JSON Web Token is used for authentication purposes. The tech stack along with some important dependencies used are:

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (Neon Console)
- JSON Web Token (JWT)
- Nodemailer
- Zod

## Security measures

- JWT-based authentication
- Helmet for headers security
- CORS configuration for request origin filtering
- Request rate limiting

## Authentication Flow

The backend uses a JWT-based authentication.

1. The user logs in with valid credentials or signs up with valid inputs,
2. The backend issues a signed JWT access token
3. Token must be sent in **Authorization** header as: **Authorization: Bearer <token>**
4. Protected routes are guarded by the 'authenticator' middleware(Both the dashboard and reset password functionality)
5. Password reset uses a time-limited reset token verified by the authenticator as well.

## Testing

- Backend APIs were tested manually using Postman
- The functionalities(Authenticator, CRUD Ops, Protected routes) were validated manually
- Error cases were tested manually
  Note: Have been trying to add unit testing currently in backend

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL (Neon)
- npm

### Required Environment Variables (Create and Set the .env file in the backend directory)

- CONNECTION_STRING=(if hosted somewhere online)
- JWT_SECRET_KEY=(generated from online sources)
- GMAIL_USER=(your GMAIL email)
- GMAIL_PASS= (App password not the actual gmail password / needs 2-factor authentication)

### Setting Up and Running the Project

```bash
npm install //In order to install all dependencies
node setupDatabase.js //To setup database tables/functions/triggers
npm start //running the actual backend server locally
```
