const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
  discountValue: { type: Number, required: true },
  minPurchase: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  expiryDate: { type: Date }
});

module.exports = mongoose.model('Coupon', couponSchema);
