const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  paperType: { type: String, default: '' },
  size: { type: String, default: '' },
  finishOptions: [{ type: String }],
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  artworkUrl: { type: String, default: '' }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  billingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethod: { type: String, default: 'Credit Card / Online Payment' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'paid' },
  orderStatus: {
    type: String,
    enum: ['placed', 'artwork_pending', 'artwork_approved', 'in_production', 'shipped', 'delivered', 'cancelled'],
    default: 'placed'
  },
  artworkProofUrl: { type: String, default: '' },
  artworkApprovalStatus: {
    type: String,
    enum: ['not_required', 'pending', 'approved', 'revision_requested'],
    default: 'pending'
  },
  artworkFeedback: { type: String, default: '' },
  subtotal: { type: Number, required: true },
  taxAmount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  trackingNumber: { type: String, default: '' },
  estimatedDelivery: { type: String, default: '3-5 Business Days' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
