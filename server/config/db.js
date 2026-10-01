const mongoose = require('mongoose');

// In-Memory fallback store for seamless execution without a live MongoDB instance
global.mockDb = {
  users: [],
  products: [],
  categories: [],
  services: [],
  quotes: [],
  orders: [],
  portfolios: [],
  blogs: [],
  reviews: [],
  coupons: [],
  contacts: [],
  subscribers: []
};

const connectDB = async () => {
  const connUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/printcraft_pro';
  try {
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 2000
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log(`[MongoDB Connection Note] Could not connect to local/remote MongoDB instance (${error.message}).`);
    console.log(`[MongoDB Dynamic Mode] Operating with hybrid memory state and seed initialization enabled for rapid execution.`);
    return false;
  }
};

module.exports = connectDB;
