# Quick Start Guide

## Option 1: Frontend-Only (No Installation Required) ⭐ Recommended

### Step 1: Open the Calculator

Navigate to the frontend folder and open `index.html`:
- Go to `C:\Genrative AI\frontend\`
- Double-click `index.html`
- Calculator opens in your browser

### Step 2: Use the Calculator

The calculator works immediately with:
- All modes (Basic, Scientific, Programmer)
- Memory functions (MC, MR, M+, M-)
- History panel
- Keyboard shortcuts
- Data persistence using localStorage

**That's it! No installation needed.**

---

## Option 2: With Backend (Optional - Requires Node.js)

### Step 1: Install Node.js

1. Download from: https://nodejs.org/
2. Install the LTS version
3. Restart your command prompt

### Step 2: Start the Backend

Open a terminal/command prompt and run:

```bash
cd backend
npm install
npm start
```

You should see:
```
Connected to SQLite database
Calculator API server running on port 3000
API available at http://localhost:3000/api
```

### Step 3: Open the Frontend

Open `frontend/index.html` in your web browser

### Benefits of Backend
- SQLite database for data persistence
- RESTful API for future integrations
- Better data management

---

## Testing the Calculator

1. Try a basic calculation: 5 + 3 =
2. Check memory: Type 10, click M+, then MR
3. Check history: Click the History button
4. Refresh the page - your memory and history should persist

---

## Troubleshooting

### Frontend-Only Mode
- **Calculator won't open**: Make sure you're opening `frontend/index.html`
- **Data not persisting**: Check that localStorage is enabled in your browser
- **Buttons not working**: Try a different browser (Chrome, Firefox, Edge)

### With Backend
- **Backend won't start**: Make sure Node.js is installed (`node --version`)
- **npm not recognized**: Restart command prompt after installing Node.js
- **Frontend can't connect**: Make sure backend is running on port 3000
- **Database errors**: Delete `backend/database/calculator.db` and restart backend

---

## Stopping the Backend

If you started the backend, press `Ctrl+C` in the terminal where it's running.

