const express = require('express');
const router = express.Router();
const { getServices, getServiceBySlug, createService } = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);
router.post('/', protect, adminOnly, createService);

module.exports = router;
