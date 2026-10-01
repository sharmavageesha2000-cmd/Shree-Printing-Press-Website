const Coupon = require('../models/Coupon');

const validateCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;
    if (!code) return res.status(400).json({ success: false, message: 'Coupon code required' });

    let coupon;
    if (global.mockDb) {
      coupon = global.mockDb.coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    } else {
      coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    }

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Invalid or expired promotional code' });
    }

    if (cartTotal && cartTotal < coupon.minPurchase) {
      return res.status(400).json({ success: false, message: `Minimum order total of $${coupon.minPurchase} required for this code.` });
    }

    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (cartTotal * coupon.discountValue) / 100;
    } else {
      discountAmount = coupon.discountValue;
    }

    res.json({
      success: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: Number(discountAmount.toFixed(2))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCoupons = async (req, res) => {
  try {
    const list = global.mockDb ? global.mockDb.coupons : await Coupon.find({});
    res.json({ success: true, coupons: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCoupon = async (req, res) => {
  try {
    const data = req.body;
    data.code = data.code.toUpperCase();
    if (global.mockDb) {
      data._id = 'cpn_' + Date.now();
      global.mockDb.coupons.push(data);
      return res.status(201).json({ success: true, coupon: data });
    }
    const created = await Coupon.create(data);
    res.status(201).json({ success: true, coupon: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { validateCoupon, getCoupons, createCoupon };
