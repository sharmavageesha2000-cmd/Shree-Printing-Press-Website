const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  client: { type: String, default: 'Corporate Client' },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  specs: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
