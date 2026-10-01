const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    let list = global.mockDb ? global.mockDb.products : await Product.find({});

    if (category) {
      list = list.filter(p => p.category.toLowerCase() === category.toLowerCase() || p.slug.toLowerCase().includes(category.toLowerCase()));
    }
    if (featured === 'true') {
      list = list.filter(p => p.isFeatured === true);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }

    res.json({ success: true, count: list.length, products: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let product;
    if (global.mockDb) {
      product = global.mockDb.products.find(p => p.slug === slug || p._id === slug);
    } else {
      product = await Product.findOne({ $or: [{ slug }, { _id: slug }] });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProd = req.body;
    if (!newProd.slug) {
      newProd.slug = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (global.mockDb) {
      newProd._id = 'prod_' + Date.now();
      global.mockDb.products.push(newProd);
      return res.status(201).json({ success: true, product: newProd });
    }

    const created = await Product.create(newProd);
    res.status(201).json({ success: true, product: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (global.mockDb) {
      const idx = global.mockDb.products.findIndex(p => p._id === id || p.slug === id);
      if (idx !== -1) {
        global.mockDb.products[idx] = { ...global.mockDb.products[idx], ...req.body };
        return res.json({ success: true, product: global.mockDb.products[idx] });
      }
    }

    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, product: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (global.mockDb) {
      global.mockDb.products = global.mockDb.products.filter(p => p._id !== id && p.slug !== id);
      return res.json({ success: true, message: 'Product removed' });
    }

    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct };
