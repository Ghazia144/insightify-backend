const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
// Request logger: logs every incoming method and URL
app.use((req, res, next) => {
  console.log(`[req] ${req.method} ${req.url}`);
  next();
});
// Connect DB
connectDB();
app.get("/", (req, res) => {
  res.send("ROOT OK");
});

app.get("/api", (req, res) => {
  res.send("API OK");
});


// Routes
app.use("/api/newsletter", require("./routes/newsletterRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/insights", require("./routes/insightRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
