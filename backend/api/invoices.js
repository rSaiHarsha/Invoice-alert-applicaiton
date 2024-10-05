const express = require('express');
const mongoose = require('mongoose');
const Invoice = require('../models/Invoice');
// const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware to authenticate JWT
// router.use(authenticateJWT);

// Get all due invoices for the authenticated user
router.get('/due', async (req, res) => {
  try {
    const invoices = await Invoice.find({ status: 'due' });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/paid', async (req, res) => {
  try {
    const invoices = await Invoice.find({ status: 'paid' });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find({  });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
