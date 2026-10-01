const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, default: '' },
  basePrice: { type: Number, required: true },
  images: [{ type: String }],
  paperOptions: [{ name: String, extraCost: Number }],
  sizeOptions: [{ name: String, multiplier: Number }],
  finishOptions: [{ name: String, extraCost: Number }],
  quantityTiers: [{ quantity: Number, pricePerUnit: Number }],
  isFeatured: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  turnaroundTime: { type: String, default: '2-4 Business Days' },
  rating: { type: Number, default: 5 },
  reviewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
