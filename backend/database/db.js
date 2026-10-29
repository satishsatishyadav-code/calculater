// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// // Create database connection
// const dbPath = path.join(__dirname, 'calculator.db');
// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Error opening database:', err.message);
//     } else {
//         console.log('Connected to SQLite database');
//         initializeTables();
//     }
// });

// // Initialize database tables
// function initializeTables() {
//     // Memory table
//     db.run(`CREATE TABLE IF NOT EXISTS memory (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         value REAL NOT NULL DEFAULT 0,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )`, (err) => {
//         if (err) console.error('Error creating memory table:', err.message);
//     });

//     // History table
//     db.run(`CREATE TABLE IF NOT EXISTS history (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         expression TEXT NOT NULL,
//         result REAL NOT NULL,
//         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )`, (err) => {
//         if (err) console.error('Error creating history table:', err.message);
//     });
// }

// module.exports = db;
