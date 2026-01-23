# FRONTEND DOCUMENTATION

For frontend, Next.js is used to create a the UI for the Task Management and TailwindCSS is used to style the UI. Shadcn UI along with lucide-react is used to provide reusable components and icons to make the UI better and intuitive. Zod is also used here for form validation purpose and for token validation in frontend jwt-decode is used. Protected routes were created using the jwt-decode. TanStack Query and axios are used in order to fetch the data from the backend.

## Tech Stack

- Next.js
- Shadcn UI
- Tailwind CSS
- TanStack Query
- Axios
- Lucide React

## Testing

- Normal User testing is done
- Error cases(mostly) were tested manually
- Unit testing using JEST for the zod schema and the user and task services(API communication)

## Setup Instructions

### Prerequisites

- npm

### Required Environment Variables (Set the .env file in the backend directory)

No env file is required for the frontend.

### Setting Up and Running the Project

```bash
npm install //In order to install all dependencies
npm run dev //running the actual frontend locally
```

## Testing Instructions

Run the Following command.

```bash
cd frontend //If not already in the frontend directory
npm test //To run the jest test script
```
