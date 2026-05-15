# Online Examination System (Full-Stack Backend)

This is the backend server for the Online Examination System. It uses Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or Cloud Atlas)

## Setup

1. Open a terminal in the `server/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server/` directory:
   ```env
   MONGODB_URI=mongodb+srv://your_connection_string
   PORT=5000
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/auth/login`: Authenticate/Register a user.
- `GET /api/exams`: Fetch all available exams.
- `POST /api/exams`: Create a new exam (Admin).
- `POST /api/results`: Submit exam results.
- `GET /api/rankings`: Fetch global leaderboard.
