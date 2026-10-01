const Portfolio = require('../models/Portfolio');

const getPortfolios = async (req, res) => {
  try {
    const list = global.mockDb ? global.mockDb.portfolios : await Portfolio.find({});
    res.json({ success: true, count: list.length, portfolios: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createPortfolio = async (req, res) => {
  try {
    const data = req.body;
    if (global.mockDb) {
      data._id = 'port_' + Date.now();
      global.mockDb.portfolios.push(data);
      return res.status(201).json({ success: true, portfolio: data });
    }
    const created = await Portfolio.create(data);
    res.status(201).json({ success: true, portfolio: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getPortfolios, createPortfolio };
