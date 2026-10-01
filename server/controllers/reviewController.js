const Review = require('../models/Review');

const getReviews = async (req, res) => {
  try {
    const list = global.mockDb ? global.mockDb.reviews : await Review.find({ isApproved: true });
    res.json({ success: true, count: list.length, reviews: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { userName, userCompany, productName, rating, comment } = req.body;
    const reviewData = {
      userName: userName || (req.user ? req.user.name : 'Anonymous'),
      userCompany: userCompany || (req.user ? req.user.company : ''),
      productName: productName || 'Print Services',
      rating: Number(rating) || 5,
      comment,
      isApproved: true,
      createdAt: new Date()
    };

    if (global.mockDb) {
      reviewData._id = 'rev_' + Date.now();
      global.mockDb.reviews.unshift(reviewData);
      return res.status(201).json({ success: true, review: reviewData });
    }

    const created = await Review.create(reviewData);
    res.status(201).json({ success: true, review: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getReviews, createReview };
