const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

// Routes for each page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/portal', (req, res) => {
    res.sendFile(path.join(__dirname, 'portal.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

// API endpoint for health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`ClearPro Aligner server running on port ${PORT}`);
    console.log(`Access the application at: http://localhost:${PORT}`);
});
