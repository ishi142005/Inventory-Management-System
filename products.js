const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection

// POST route to add a product
router.post('/add', (req, res) => {
  const { name, price, quantity, category, description } = req.body;

  if (!name || !price || !quantity || !category || !description) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const query = 'INSERT INTO products (name, price, quantity, category, description) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, price, quantity, category, description], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding product', error: err });
    }
    res.status(200).json({ message: 'Product added successfully', productId: result.insertId });
  });
});

// GET route to retrieve all products
router.get('/', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching products', error: err });
    }
    res.status(200).json(result);
  });
});

module.exports = router;
