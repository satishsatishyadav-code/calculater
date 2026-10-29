# Advanced Calculator with Backend

A full-featured web-based calculator with Basic, Scientific, and Programmer modes, built with a full-stack architecture including a Node.js backend.

## Project Structure

```
calculator/
├── frontend/              # Frontend application
│   ├── index.html        # HTML structure
│   ├── styles.css        # CSS styling
│   ├── script.js         # Frontend logic (API calls)
│   └── README.md         # Frontend documentation (this file)
├── backend/              # Backend API server
│   ├── server.js         # Express server
│   ├── package.json      # Backend dependencies
│   ├── requirements.txt  # Backend requirements
│   ├── INSTALL.md        # Backend installation guide
│   ├── routes/           # API routes
│   │   ├── calculate.js  # Calculation API
│   │   ├── memory.js     # Memory API
│   │   └── history.js    # History API
│   └── database/         # Database
│       └── db.js         # SQLite database setup
├── STARTUP.md            # Quick start guide
└── .gitignore           # Git ignore file
```

## Features

### Calculator Modes
- **Basic Mode**: Standard arithmetic operations (+, -, *, /, %)
- **Scientific Mode**: Trigonometric functions, logarithms, exponents, square root, factorial, constants (π, e)
- **Programmer Mode**: Base conversions (DEC, HEX, BIN, OCT) and bitwise operations (AND, OR, XOR, NOT, <<, >>)

### Additional Features
- **Memory Functions**: MC, MR, M+, M- (persisted in database)
- **History Panel**: View and reuse previous calculations (persisted in database)
- **Backend API**: RESTful API for all operations
- **Database**: SQLite for persistent storage
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Dark theme with smooth animations

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- A modern web browser

### Backend Setup

1. Navigate to the backend directory (from project root):
```bash
cd ../backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Open `index.html` in your web browser (in the frontend folder)
2. The frontend will automatically connect to the backend API

## API Endpoints

### Memory API
- `GET /api/memory` - Get current memory value
- `POST /api/memory` - Set memory value
- `DELETE /api/memory` - Clear memory
- `POST /api/memory/add` - Add to memory (M+)
- `POST /api/memory/subtract` - Subtract from memory (M-)

### History API
- `GET /api/history` - Get calculation history
- `POST /api/history` - Add to history
- `DELETE /api/history` - Clear history

### Calculate API
- `POST /api/calculate` - Perform calculation
  - Body: `{ operation, operand1, operand2, expression }`
  - Returns: `{ result }`

### Health Check
- `GET /api/health` - Check API status

## Database

The application uses SQLite for data persistence:
- **Memory table**: Stores memory values
- **History table**: Stores calculation history (last 20 entries)

Database file: `backend/database/calculator.db`

## Usage

### Basic Mode
- Enter numbers and operators to perform calculations
- Press `=` or Enter to calculate
- Use `C` or Escape to clear
- Use `⌫` or Backspace to delete last digit

### Scientific Mode
- Use sin, cos, tan for trigonometric functions (inputs in degrees)
- Use log (base 10) and ln (natural log) for logarithms
- Use √ for square root
- Use ^ for power operations
- Use π and e for mathematical constants
- Use parentheses to build complex expressions

### Programmer Mode
- Select base (DEC, HEX, BIN, OCT) using the base buttons
- Enter numbers in the selected base
- Invalid digits are automatically disabled
- Use bitwise operations: AND, OR, XOR, NOT, <<, >>
- The secondary display shows the decimal equivalent

### Memory Functions
- **MC**: Clear memory
- **MR**: Recall value from memory to display
- **M+**: Add current value to memory
- **M-**: Subtract current value from memory
- The "M" indicator shows when memory has a value
- Memory value is displayed as "M: [value]"

### Keyboard Shortcuts
- Numbers 0-9: Enter numbers
- Operators (+, -, *, /): Perform operations
- Enter or =: Calculate
- Escape or C: Clear
- Backspace: Delete last digit
- Shift+M: Memory Clear (MC)
- Shift+R: Memory Recall (MR)
- Shift+P: Memory Plus (M+)
- Shift+S: Memory Minus (M-)

### History
- Click the "History" button to view calculation history
- Click any history item to reuse that result
- Click "Clear" to clear all history
- History is saved to the database and persists across sessions

## Development

### Backend Development
```bash
cd backend
npm run dev  # Use nodemon for auto-reload
```

### Frontend Development
Simply open `frontend/index.html` in a browser
- No build process required
- Changes to CSS/JS are reflected on refresh

## Technologies Used

### Frontend
- HTML5
- CSS3 (Flexbox, Grid)
- Vanilla JavaScript
- Fetch API for backend communication

### Backend
- Node.js
- Express.js
- SQLite3
- CORS
- Body-parser

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available for educational purposes.

## Author

Created with ❤️ using HTML, CSS, JavaScript, Node.js, and SQLite
