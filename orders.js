const express = require('express');
const router = express.Router();
const db = require('../db'); // Database connection

// POST route to place an order
router.post('/place', (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  const query = 'INSERT INTO orders (product_id, quantity) VALUES (?, ?)';
  db.query(query, [product_id, quantity], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error placing order', error: err });
    }
    res.status(200).json({ message: 'Order placed successfully', orderId: result.insertId });
  });
});

// GET route to retrieve all orders
router.get('/', (req, res) => {
  const query = 'SELECT * FROM orders';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching orders', error: err });
    }
    res.status(200).json(result);
  });
});

module.exports = router;
