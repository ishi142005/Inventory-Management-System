const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db'); // Assuming db.js handles the database connection

dotenv.config(); // Load environment variables from .env

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Serve static files from the 'frontend' directory outside the backend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Sample route for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));  // Serve the index.html file
});

// Routes for products and orders
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
