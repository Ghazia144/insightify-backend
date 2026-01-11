const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  adminName: { type: String, default: "Admin User" },
  adminEmail: { type: String, default: "admin@test.com" },
  password: { type: String, select: false }, // Security ke liye select false
  notifications: { type: Boolean, default: true },
  twoFactor: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Settings", settingsSchema);