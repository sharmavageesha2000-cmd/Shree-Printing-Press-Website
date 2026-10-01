const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
  try {
    const list = global.mockDb ? global.mockDb.blogs : await Blog.find({});
    res.json({ success: true, count: list.length, blogs: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let blog;
    if (global.mockDb) {
      blog = global.mockDb.blogs.find(b => b.slug === slug || b._id === slug);
    } else {
      blog = await Blog.findOne({ $or: [{ slug }, { _id: slug }] });
    }
    if (!blog) return res.status(404).json({ success: false, message: 'Article not found' });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug) data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (global.mockDb) {
      data._id = 'blog_' + Date.now();
      global.mockDb.blogs.push(data);
      return res.status(201).json({ success: true, blog: data });
    }
    const created = await Blog.create(data);
    res.status(201).json({ success: true, blog: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getBlogs, getBlogBySlug, createBlog };
