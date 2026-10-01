const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  quoteId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, default: '' }
  },
  jobTitle: { type: String, required: true },
  quantity: { type: Number, required: true },
  paperType: { type: String, default: 'Standard 300 GSM' },
  size: { type: String, default: 'Standard Custom' },
  finishOptions: [{ type: String }],
  artworkFile: { type: String, default: '' },
  notes: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'quoted', 'accepted', 'rejected', 'ordered'],
    default: 'pending'
  },
  quotedPrice: { type: Number, default: 0 },
  adminNotes: { type: String, default: '' },
  validUntil: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quote', quoteSchema);
