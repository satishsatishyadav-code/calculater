const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get all history
router.get('/', (req, res) => {
    db.all('SELECT * FROM history ORDER BY created_at DESC LIMIT 20', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add to history
router.post('/', (req, res) => {
    const { expression, result } = req.body;
    
    if (!expression || result === undefined || isNaN(result)) {
        res.status(400).json({ error: 'Invalid expression or result' });
        return;
    }

    db.run('INSERT INTO history (expression, result) VALUES (?, ?)', [expression, result], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, expression, result });
    });
});

// Clear history
router.delete('/', (req, res) => {
    db.run('DELETE FROM history', (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'History cleared' });
    });
});

module.exports = router;
