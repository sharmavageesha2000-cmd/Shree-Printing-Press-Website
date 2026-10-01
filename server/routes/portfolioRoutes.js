const express = require('express');
const router = express.Router();
const { getPortfolios, createPortfolio } = require('../controllers/portfolioController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getPortfolios);
router.post('/', protect, adminOnly, createPortfolio);

module.exports = router;
