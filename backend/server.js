const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./auth/auth');
const invoiceRoutes = require('./api/invoices');
const zapierRoutes = require('./api/zapier');
const cors = require('cors');  // Import cors
require('dotenv').config();
require('./auth/passport');

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',  // Allow requests from this origin
    credentials: true,  // Allow cookies to be sent
  }));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/zapier', zapierRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
