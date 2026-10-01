const express = require('express');
const router = express.Router();
const { requestQuote, trackQuoteByNumber, getQuotes, updateQuoteAdmin } = require('../controllers/quoteController');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', upload.single('artworkFile'), (req, res, next) => {
  // Optional auth check without throwing 401 if unauthenticated guest
  if (req.headers.authorization) {
    return protect(req, res, () => requestQuote(req, res));
  }
  requestQuote(req, res);
});

router.get('/track/:quoteId', trackQuoteByNumber);
router.get('/', protect, getQuotes);
router.put('/:id', protect, adminOnly, updateQuoteAdmin);

module.exports = router;
