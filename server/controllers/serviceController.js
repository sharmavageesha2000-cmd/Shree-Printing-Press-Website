const Service = require('../models/Service');

const getServices = async (req, res) => {
  try {
    const list = global.mockDb ? global.mockDb.services : await Service.find({});
    res.json({ success: true, count: list.length, services: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let service;
    if (global.mockDb) {
      service = global.mockDb.services.find(s => s.slug === slug || s._id === slug);
    } else {
      service = await Service.findOne({ $or: [{ slug }, { _id: slug }] });
    }
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug) data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (global.mockDb) {
      data._id = 'srv_' + Date.now();
      global.mockDb.services.push(data);
      return res.status(201).json({ success: true, service: data });
    }
    const service = await Service.create(data);
    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getServices, getServiceBySlug, createService };
