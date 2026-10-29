const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const memoryRoutes = require('./routes/memory');
const historyRoutes = require('./routes/history');
const calculateRoutes = require('./routes/calculate');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/memory', memoryRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/calculate', calculateRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Calculator API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Calculator API server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});
