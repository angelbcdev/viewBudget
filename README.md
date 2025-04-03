# Full Stack TypeScript Application

This is a full-stack application with a Vite + React frontend and Express backend, both using TypeScript.

## Project Structure

```
.
├── client/          # Vite + React frontend
└── server/          # Express backend
```

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

### Backend
- `npm run dev`: Start the development server with hot reload
- `npm run build`: Build the TypeScript files
- `npm start`: Start the production server

### Frontend
- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build locally 