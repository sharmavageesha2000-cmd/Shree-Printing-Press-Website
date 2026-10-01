const express = require('express');
const router = express.Router();
const { submitContact, subscribeNewsletter } = require('../controllers/contactController');

router.post('/', submitContact);
router.post('/subscribe', subscribeNewsletter);

module.exports = router;
