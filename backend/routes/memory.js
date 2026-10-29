const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get memory value
router.get('/', (req, res) => {
    db.get('SELECT value FROM memory ORDER BY id DESC LIMIT 1', (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ value: row ? row.value : 0 });
    });
});

// Set memory value
router.post('/', (req, res) => {
    const { value } = req.body;
    
    if (value === undefined || isNaN(value)) {
        res.status(400).json({ error: 'Invalid value' });
        return;
    }

    db.run('INSERT INTO memory (value) VALUES (?)', [value], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, value });
    });
});

// Clear memory
router.delete('/', (req, res) => {
    db.run('DELETE FROM memory', (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Memory cleared' });
    });
});

// Add to memory (M+)
router.post('/add', (req, res) => {
    const { value } = req.body;
    
    if (value === undefined || isNaN(value)) {
        res.status(400).json({ error: 'Invalid value' });
        return;
    }

    db.get('SELECT value FROM memory ORDER BY id DESC LIMIT 1', (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        const currentValue = row ? row.value : 0;
        const newValue = currentValue + value;
        
        db.run('INSERT INTO memory (value) VALUES (?)', [newValue], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ value: newValue });
        });
    });
});

// Subtract from memory (M-)
router.post('/subtract', (req, res) => {
    const { value } = req.body;
    
    if (value === undefined || isNaN(value)) {
        res.status(400).json({ error: 'Invalid value' });
        return;
    }

    db.get('SELECT value FROM memory ORDER BY id DESC LIMIT 1', (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        const currentValue = row ? row.value : 0;
        const newValue = currentValue - value;
        
        db.run('INSERT INTO memory (value) VALUES (?)', [newValue], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ value: newValue });
        });
    });
});

module.exports = router;
