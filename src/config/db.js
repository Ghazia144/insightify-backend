const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("URI Check:", process.env.MONGO_URI ? "Found" : "Not Found"); 
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✔");
  } catch (error) {
    console.error("MongoDB Error ❌", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
