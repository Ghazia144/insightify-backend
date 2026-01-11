const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  label: String,
  value: Number,
  type: {
    type: String,
    enum: ["line", "bar", "pie", "area"]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Analytics", analyticsSchema);
