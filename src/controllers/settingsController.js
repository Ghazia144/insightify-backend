const Settings = require("../models/Settings");
const bcrypt = require("bcryptjs"); // Agar aap encryption use kar rahi hain

exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const data = { ...req.body };

    // Agar password field bhari hui hai to use hash karein
    if (data.password && data.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    } else {
      delete data.password; // Khali password ko ignore karein taake purana overwrite na ho
    }

    const settings = await Settings.findOneAndUpdate({}, data, { new: true, upsert: true });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};