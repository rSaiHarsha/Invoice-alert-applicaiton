const express = require('express');
const axios = require('axios');
const Invoice = require('../models/Invoice');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware to authenticate JWT
// router.use(authenticateJWT);

// Trigger Zapier webhook for past-due invoices
router.post('/trigger', async (req, res) => {
  try {
    const pastDueInvoices = await Invoice.find({ status: 'due', dueDate: { $lt: new Date() } });
    if (pastDueInvoices.length > 0) {
      await axios.post(process.env.ZAPIER_WEBHOOK_URL, { invoices: pastDueInvoices });
      res.json({ message: 'Zapier webhook triggered successfully' });
    } else {
      res.json({ message: 'No past-due invoices found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
