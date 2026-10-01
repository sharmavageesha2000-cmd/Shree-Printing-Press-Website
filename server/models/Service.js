const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  icon: { type: String, default: 'Printer' },
  shortDesc: { type: String, required: true },
  fullDesc: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String, default: '' },
  startingPrice: { type: Number, default: 49.99 },
  turnaround: { type: String, default: '24-48 Hours' }
});

module.exports = mongoose.model('Service', serviceSchema);
