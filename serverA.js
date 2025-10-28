const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.disable('x-powered-by');

// Serve static files with cache control
app.use(express.static(__dirname, {
    maxAge: '1h',
    etag: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/portal', (req, res) => {
    res.sendFile(path.join(__dirname, 'portal.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

// Health check endpoint (important for Render)
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ✅ ADD THESE LOGOUT ROUTES
app.post('/api/logout', (req, res) => {
    // If using sessions, you would destroy the session here
    // For now, we'll just return success and let frontend handle redirect
    console.log('Logout request received');
    res.json({ 
        success: true, 
        message: 'Logged out successfully',
        redirect: '/'
    });
});

app.get('/logout', (req, res) => {
    // Simple GET logout for direct links
    console.log('GET logout request');
    res.redirect('/');
});

// Catch-all for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler for API routes
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
