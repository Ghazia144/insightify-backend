const Newsletter = require("../models/newsLetter");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const exists = await Newsletter.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already subscribed" });

    await Newsletter.create({ email });
    res.json({ msg: "Subscription successful!" });
    console.log(req.body);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
