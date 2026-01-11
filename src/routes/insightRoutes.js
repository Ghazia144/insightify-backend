const express = require("express");
const router = express.Router();
const {
  generateInsight,
  getInsights,
} = require("../controllers/insightController");

router.post("/generate", generateInsight);
router.get("/", getInsights);

module.exports = router;
