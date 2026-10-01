const User = require('../models/User');
const Order = require('../models/Order');
const Quote = require('../models/Quote');
const Product = require('../models/Product');
const Contact = require('../models/Contact');

const getAnalytics = async (req, res) => {
  try {
    let ordersList = global.mockDb ? global.mockDb.orders : await Order.find({});
    let quotesList = global.mockDb ? global.mockDb.quotes : await Quote.find({});
    let productsList = global.mockDb ? global.mockDb.products : await Product.find({});
    let usersList = global.mockDb ? global.mockDb.users : await User.find({});

    const totalRevenue = ordersList.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
    const activeOrders = ordersList.filter(o => ['placed', 'artwork_pending', 'artwork_approved', 'in_production', 'shipped'].includes(o.orderStatus)).length;
    const pendingQuotes = quotesList.filter(q => q.status === 'pending').length;
    const totalCustomers = usersList.filter(u => u.role === 'customer').length;

    // Monthly revenue mock distribution
    const revenueByMonth = [
      { month: 'Jan', revenue: 14200 },
      { month: 'Feb', revenue: 18900 },
      { month: 'Mar', revenue: 22400 },
      { month: 'Apr', revenue: 21000 },
      { month: 'May', revenue: 28500 },
      { month: 'Jun', revenue: 34100 },
      { month: 'Jul', revenue: 39800 },
      { month: 'Aug', revenue: totalRevenue || 42500 }
    ];

    const orderStatusDistribution = {
      placed: ordersList.filter(o => o.orderStatus === 'placed').length,
      artwork_pending: ordersList.filter(o => o.orderStatus === 'artwork_pending').length,
      in_production: ordersList.filter(o => o.orderStatus === 'in_production').length,
      shipped: ordersList.filter(o => o.orderStatus === 'shipped').length,
      delivered: ordersList.filter(o => o.orderStatus === 'delivered').length
    };

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: ordersList.length,
        activeOrders,
        pendingQuotes,
        totalCustomers,
        totalProducts: productsList.length
      },
      revenueByMonth,
      orderStatusDistribution,
      recentOrders: ordersList.slice(0, 5),
      recentQuotes: quotesList.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const list = global.mockDb ? global.mockDb.users : await User.find({}).select('-password');
    res.json({ success: true, count: list.length, users: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getInquiries = async (req, res) => {
  try {
    const list = global.mockDb ? global.mockDb.contacts : await Contact.find({});
    res.json({ success: true, count: list.length, inquiries: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAnalytics, getUsers, getInquiries };
