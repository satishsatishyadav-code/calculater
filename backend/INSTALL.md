# Backend Installation Guide

## Prerequisites

You need to install Node.js first before setting up the backend.

### Installing Node.js on Windows

1. Download Node.js from the official website: https://nodejs.org/
2. Download the LTS (Long Term Support) version (recommended)
3. Run the installer (.msi file)
4. Follow the installation wizard
5. Make sure to check "Add to PATH" during installation
6. Restart your command prompt/terminal after installation

### Verify Installation

Open a new command prompt and run:
```bash
node --version
npm --version
```

You should see version numbers (e.g., v18.x.x and 9.x.x or higher).

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd C:\Genrative AI\backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install the dependencies listed in `package.json`:
- express (web framework)
- cors (cross-origin resource sharing)
- sqlite3 (database)
- body-parser (request body parsing)
- nodemon (development tool - optional)

You can also view the full requirements in `backend/REQUIREMENTS.md`

### Step 3: Start the Backend Server

```bash
npm start
```

You should see:
```
Connected to SQLite database
Calculator API server running on port 3000
API available at http://localhost:3000/api
```

### Step 4: Test the API

Open another terminal and test:
```bash
curl http://localhost:3000/api/health
```

Or open in browser: http://localhost:3000/api/health

You should see:
```json
{
  "status": "OK",
  "message": "Calculator API is running"
}
```

## Development Mode

For development with auto-reload:
```bash
npm run dev
```

This uses nodemon to automatically restart the server when files change.

## Troubleshooting

### "node is not recognized"
- Restart your command prompt after installing Node.js
- Verify Node.js is in your PATH
- Try reinstalling Node.js

### "npm install" fails
- Make sure you have internet connection
- Try: `npm install --force`
- Clear npm cache: `npm cache clean --force`

### Port 3000 already in use
- Stop other services using port 3000
- Or change the port in server.js:
  ```javascript
  const PORT = process.env.PORT || 3001; // Change to 3001
  ```

### Database errors
- The database file is created automatically
- Location: `backend/database/calculator.db`
- If corrupted, delete the file and restart the server

## Next Steps

After the backend is running:
1. Open `frontend/index.html` in your browser
2. The calculator will connect to the backend API
3. Memory and history will be saved to the database

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.
