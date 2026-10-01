const Contact = require('../models/Contact');
const Subscriber = require('../models/Subscriber');

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const contactData = { name, email, phone: phone || '', subject, message, status: 'new', createdAt: new Date() };

    if (global.mockDb) {
      contactData._id = 'cnt_' + Date.now();
      global.mockDb.contacts.unshift(contactData);
      return res.status(201).json({ success: true, message: 'Thank you! Your message has been sent to our team.' });
    }

    await Contact.create(contactData);
    res.status(201).json({ success: true, message: 'Thank you! Your message has been sent to our team.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email address is required' });

    if (global.mockDb) {
      const exists = global.mockDb.subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return res.json({ success: true, message: 'You are already subscribed to our printing newsletter!' });
      }
      global.mockDb.subscribers.push({ _id: 'sub_' + Date.now(), email: email.toLowerCase(), subscribedAt: new Date() });
      return res.status(201).json({ success: true, message: 'Subscribed successfully!' });
    }

    const exists = await Subscriber.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.json({ success: true, message: 'You are already subscribed to our newsletter!' });
    }
    await Subscriber.create({ email: email.toLowerCase() });
    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitContact, subscribeNewsletter };
