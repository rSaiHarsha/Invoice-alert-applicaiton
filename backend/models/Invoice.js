const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  recipientEmail: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
