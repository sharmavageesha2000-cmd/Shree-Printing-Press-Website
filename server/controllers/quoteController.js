const Quote = require('../models/Quote');

const requestQuote = async (req, res) => {
  try {
    const { name, email, phone, company, jobTitle, quantity, paperType, size, finishOptions, notes } = req.body;
    let artworkFile = req.file ? `/uploads/${req.file.filename}` : (req.body.artworkFile || '');

    const quoteId = 'QT-' + Math.floor(10000 + Math.random() * 90000);

    const quoteData = {
      quoteId,
      guestInfo: { name, email, phone, company: company || '' },
      user: req.user ? req.user._id : null,
      jobTitle: jobTitle || 'Custom Printing Job',
      quantity: Number(quantity) || 500,
      paperType: paperType || 'Standard 300 GSM',
      size: size || 'Standard Custom',
      finishOptions: Array.isArray(finishOptions) ? finishOptions : (finishOptions ? finishOptions.split(',') : []),
      artworkFile,
      notes: notes || '',
      status: 'pending',
      quotedPrice: 0,
      createdAt: new Date()
    };

    if (global.mockDb) {
      quoteData._id = 'qt_' + Date.now();
      global.mockDb.quotes.unshift(quoteData);
      return res.status(201).json({ success: true, message: 'Custom quotation request submitted successfully!', quote: quoteData });
    }

    const created = await Quote.create(quoteData);
    res.status(201).json({ success: true, message: 'Custom quotation request submitted successfully!', quote: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const trackQuoteByNumber = async (req, res) => {
  try {
    const { quoteId } = req.params;
    let quote;
    if (global.mockDb) {
      quote = global.mockDb.quotes.find(q => q.quoteId.toLowerCase() === quoteId.toLowerCase() || q._id === quoteId);
    } else {
      quote = await Quote.findOne({ quoteId: new RegExp(`^${quoteId}$`, 'i') });
    }

    if (!quote) {
      return res.status(404).json({ success: false, message: `No quotation record found for ID: ${quoteId}` });
    }

    res.json({ success: true, quote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getQuotes = async (req, res) => {
  try {
    let list;
    if (global.mockDb) {
      if (req.user && req.user.role === 'customer') {
        list = global.mockDb.quotes.filter(q => q.user === req.user._id || (q.guestInfo && q.guestInfo.email === req.user.email));
      } else {
        list = global.mockDb.quotes;
      }
    } else {
      if (req.user && req.user.role === 'customer') {
        list = await Quote.find({ $or: [{ user: req.user._id }, { 'guestInfo.email': req.user.email }] });
      } else {
        list = await Quote.find({}).populate('user', 'name email');
      }
    }

    res.json({ success: true, count: list.length, quotes: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateQuoteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, quotedPrice, adminNotes, validUntil } = req.body;

    if (global.mockDb) {
      const idx = global.mockDb.quotes.findIndex(q => q._id === id || q.quoteId === id);
      if (idx !== -1) {
        if (status) global.mockDb.quotes[idx].status = status;
        if (quotedPrice !== undefined) global.mockDb.quotes[idx].quotedPrice = Number(quotedPrice);
        if (adminNotes !== undefined) global.mockDb.quotes[idx].adminNotes = adminNotes;
        if (validUntil) global.mockDb.quotes[idx].validUntil = new Date(validUntil);
        return res.json({ success: true, quote: global.mockDb.quotes[idx] });
      }
    }

    const updated = await Quote.findByIdAndUpdate(
      id,
      { status, quotedPrice, adminNotes, validUntil },
      { new: true }
    );
    res.json({ success: true, quote: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { requestQuote, trackQuoteByNumber, getQuotes, updateQuoteAdmin };
