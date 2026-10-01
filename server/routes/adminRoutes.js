const express = require('express');
const router = express.Router();
const { getAnalytics, getUsers, getInquiries } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/analytics', protect, adminOnly, getAnalytics);
router.get('/users', protect, adminOnly, getUsers);
router.get('/inquiries', protect, adminOnly, getInquiries);

module.exports = router;
