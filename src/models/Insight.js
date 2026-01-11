const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  summary: String,
  risks: [String],
  suggestions: [String],
  prediction: String,
  rawPromptData: Object, // optional (debug / audit)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Insight", insightSchema);
