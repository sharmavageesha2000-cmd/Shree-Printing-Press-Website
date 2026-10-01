const express = require('express');
const router = express.Router();
const { validateCoupon, getCoupons, createCoupon } = require('../controllers/couponController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/validate', validateCoupon);
router.get('/', protect, adminOnly, getCoupons);
router.post('/', protect, adminOnly, createCoupon);

module.exports = router;
