const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// Get dashboard summary stats
router.post("/", dashboardController.saveDashboardStats); 
router.get("/stats", dashboardController.getDashboardStats);

module.exports = router;
