const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  siteName: { type: String, default: 'PrintCraft Pro' },
  contactEmail: { type: String, default: 'support@printcraftpro.com' },
  contactPhone: { type: String, default: '+1 (800) 555-PRINT' },
  whatsAppNumber: { type: String, default: '+15552345678' },
  currency: { type: String, default: 'USD' },
  taxRate: { type: Number, default: 8.0 },
  freeShippingThreshold: { type: Number, default: 150 },
  enableMaintenance: { type: Boolean, default: false }
});

module.exports = mongoose.model('Setting', settingSchema);
