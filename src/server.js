const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added for better form handling
app.use(cors());

// Request logger
app.use((req, res, next) => {
  console.log(`[req] ${req.method} ${req.url}`);
  next();
});

// Connect DB
connectDB();

// Test Routes
app.get("/", (req, res) => {
  res.send("Insightify Backend is LIVE ✔");
});

app.get("/api", (req, res) => {
  res.send("API is working fine ✔");
});

// Routes - Spelling Check: newsLetterRoutes vs newsletterRoutes
app.use("/api/newsletter", require("./routes/newsLetterRoutes")); 
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/insights", require("./routes/insightRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server!" });
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

module.exports = app;