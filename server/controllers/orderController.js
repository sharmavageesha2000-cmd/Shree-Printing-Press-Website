const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, paymentMethod, subtotal, taxAmount, shippingFee, discountAmount, totalAmount } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart items are required' });
    }

    const orderId = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const userId = req.user ? req.user._id : 'usr_guest';

    const orderData = {
      orderId,
      user: userId,
      items,
      shippingAddress: shippingAddress || { street: '123 Main St', city: 'City', state: 'State', zipCode: '10001', country: 'USA' },
      billingAddress: billingAddress || shippingAddress,
      paymentMethod: paymentMethod || 'Credit Card / Online Payment',
      paymentStatus: 'paid',
      orderStatus: 'placed',
      artworkProofUrl: items[0]?.artworkUrl || 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
      artworkApprovalStatus: 'pending',
      artworkFeedback: '',
      subtotal: Number(subtotal) || 100,
      taxAmount: Number(taxAmount) || 8,
      shippingFee: Number(shippingFee) || 15,
      discountAmount: Number(discountAmount) || 0,
      totalAmount: Number(totalAmount) || 123,
      trackingNumber: 'TRK-' + Math.floor(100000 + Math.random() * 900000) + 'US',
      estimatedDelivery: '3-5 Business Days',
      createdAt: new Date()
    };

    if (global.mockDb) {
      orderData._id = 'ord_' + Date.now();
      global.mockDb.orders.unshift(orderData);
      return res.status(201).json({ success: true, message: 'Order placed successfully!', order: orderData });
    }

    const order = await Order.create(orderData);
    res.status(201).json({ success: true, message: 'Order placed successfully!', order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    let list;
    if (global.mockDb) {
      if (req.user && req.user.role === 'customer') {
        list = global.mockDb.orders.filter(o => o.user === req.user._id);
      } else {
        list = global.mockDb.orders;
      }
    } else {
      if (req.user && req.user.role === 'customer') {
        list = await Order.find({ user: req.user._id });
      } else {
        list = await Order.find({}).populate('user', 'name email company');
      }
    }

    res.json({ success: true, count: list.length, orders: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let order;
    if (global.mockDb) {
      order = global.mockDb.orders.find(o => o._id === id || o.orderId === id);
    } else {
      order = await Order.findOne({ $or: [{ _id: id }, { orderId: id }] });
    }

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, trackingNumber, artworkProofUrl } = req.body;

    if (global.mockDb) {
      const idx = global.mockDb.orders.findIndex(o => o._id === id || o.orderId === id);
      if (idx !== -1) {
        if (orderStatus) global.mockDb.orders[idx].orderStatus = orderStatus;
        if (trackingNumber) global.mockDb.orders[idx].trackingNumber = trackingNumber;
        if (artworkProofUrl) global.mockDb.orders[idx].artworkProofUrl = artworkProofUrl;
        return res.json({ success: true, order: global.mockDb.orders[idx] });
      }
    }

    const updated = await Order.findByIdAndUpdate(
      id,
      { orderStatus, trackingNumber, artworkProofUrl },
      { new: true }
    );
    res.json({ success: true, order: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const approveOrRejectArtwork = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, feedback } = req.body; // action: 'approved' | 'revision_requested'

    if (global.mockDb) {
      const idx = global.mockDb.orders.findIndex(o => o._id === id || o.orderId === id);
      if (idx !== -1) {
        global.mockDb.orders[idx].artworkApprovalStatus = action;
        if (feedback) global.mockDb.orders[idx].artworkFeedback = feedback;
        if (action === 'approved') {
          global.mockDb.orders[idx].orderStatus = 'in_production';
        }
        return res.json({ success: true, message: `Artwork status updated to ${action}`, order: global.mockDb.orders[idx] });
      }
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    order.artworkApprovalStatus = action;
    if (feedback) order.artworkFeedback = feedback;
    if (action === 'approved') {
      order.orderStatus = 'in_production';
    }
    await order.save();

    res.json({ success: true, message: `Artwork status updated to ${action}`, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createOrder, getOrders, getOrderById, updateOrderStatus, approveOrRejectArtwork };
