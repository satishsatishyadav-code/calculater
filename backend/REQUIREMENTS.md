# Advanced Calculator - Requirements

## Backend Requirements

### System Requirements
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Backend Dependencies
The backend requires the following npm packages:

```
express: ^4.18.2
cors: ^2.8.5
sqlite3: ^5.1.6
body-parser: ^1.20.2
```

### Installation
```bash
cd backend
npm install
```

### Dev Dependencies
```
nodemon: ^3.0.1 (for development with auto-reload)
```

## Frontend Requirements

### Browser Requirements
- Modern web browser with JavaScript enabled
- Supported browsers:
  - Google Chrome 90+
  - Mozilla Firefox 88+
  - Safari 14+
  - Microsoft Edge 90+

### Frontend Dependencies
- None (pure HTML/CSS/JavaScript)
- Uses Fetch API for backend communication

## Database
- SQLite3 (included via npm package)
- No separate database installation required

## Installation Summary

1. Install Node.js from https://nodejs.org/
2. Navigate to backend directory
3. Run `npm install`
4. Start backend with `npm start`
5. Open frontend/index.html in a browser

## Optional Development Tools
- VS Code or any code editor
- Postman or similar API testing tool
- SQLite browser (optional, for viewing database)
