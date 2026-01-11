const mongoose = require("mongoose");

const dashboardStatsSchema = new mongoose.Schema({
  totalUsers: Number,
  activeUsers: Number,
  monthlyRevenue: Number,
  growthRate: Number,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DashboardStats", dashboardStatsSchema);
