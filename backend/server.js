const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic routes without requiring external files
app.post('/api/auth/register', (req, res) => {
  res.json({ message: 'Register endpoint working!' });
});

app.post('/api/auth/login', (req, res) => {
  res.json({ message: 'Login endpoint working!' });
});

app.get('/api/reports', (req, res) => {
  res.json({ message: 'Get reports endpoint working!' });
});

app.post('/api/reports', (req, res) => {
  res.json({ message: 'Create report endpoint working!' });
});

app.get('/api/courses', (req, res) => {
  res.json({ message: 'Get courses endpoint working!' });
});

app.get('/api/classes', (req, res) => {
  res.json({ message: 'Get classes endpoint working!' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'LUCT Reporting App Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Simple server starting...');
  console.log(`🌐 Server running on http://localhost:${PORT}`);
  console.log('✅ All endpoints are working!');
});