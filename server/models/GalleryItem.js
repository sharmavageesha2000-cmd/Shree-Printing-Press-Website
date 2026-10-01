const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Factory', 'Office', 'Machines', 'Products', 'Events', 'Team', 'Customer Work'], default: 'Factory' },
  image: { type: String, required: true },
  caption: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GalleryItem', gallerySchema);
