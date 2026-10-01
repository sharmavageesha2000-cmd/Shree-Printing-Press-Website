const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  title: { type: String, default: 'Default Address' },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'USA' },
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'employee', 'admin'], default: 'customer' },
  phone: { type: String, default: '' },
  company: { type: String, default: '' },
  addresses: [addressSchema],
  wishlist: [{ type: String }], // Product IDs or slugs
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
