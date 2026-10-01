const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const { securityHeaders, rateLimiter } = require('./middleware/security');
const { initialSeed } = require('./utils/seedData');

dotenv.config();

const app = express();

// Security Middleware
app.use(securityHeaders);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 200 }));

// Standard Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve file uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const orderRoutes = require('./routes/orderRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const blogRoutes = require('./routes/blogRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const couponRoutes = require('./routes/couponRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Base API route
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'PrintCraft Pro MERN Commercial Press API is online',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Initialize DB & Seed Data
const startServer = async () => {
  const isConnected = await connectDB();
  
  // Populate seed data into global mockDb if DB is in fallback or on first run
  const seed = await initialSeed();
  if (global.mockDb) {
    global.mockDb.users = seed.users;
    global.mockDb.categories = seed.categories;
    global.mockDb.products = seed.products;
    global.mockDb.services = seed.services;
    global.mockDb.quotes = seed.quotes;
    global.mockDb.orders = seed.orders;
    global.mockDb.portfolios = seed.portfolios;
    global.mockDb.blogs = seed.blogs;
    global.mockDb.reviews = seed.reviews;
    global.mockDb.coupons = seed.coupons;
    console.log('[Seed Initialization] Loaded dataset with Admin (admin@printcraftpro.com / admin123) and Customer (customer@example.com / customer123)');
  }

  app.listen(PORT, () => {
    console.log(`[PrintCraft Pro Server] Operational on http://localhost:${PORT}`);
  });
};

startServer();
