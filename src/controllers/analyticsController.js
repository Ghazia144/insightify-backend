const Analytics = require("../models/Analytics");

// POST → save analytics
exports.saveAnalytics = async (req, res) => {
  try {
    const data = await Analytics.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET → analytics
exports.getAnalytics = async (req, res) => {
  try {
    const analytics = await Analytics.find().sort({ createdAt: -1 });
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
