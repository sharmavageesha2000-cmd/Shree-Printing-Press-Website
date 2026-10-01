const express = require('express');
const router = express.Router();
const { getBlogs, getBlogBySlug, createBlog } = require('../controllers/blogController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, adminOnly, createBlog);

module.exports = router;
