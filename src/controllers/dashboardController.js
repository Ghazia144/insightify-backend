const DashboardStats = require("../models/DashboardStats");

// POST → create / update dashboard stats
exports.saveDashboardStats = async (req, res) => {
  try {
    const stats = await DashboardStats.create(req.body);
    res.status(201).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET → fetch latest stats
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await DashboardStats.findOne().sort({ updatedAt: -1 });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
