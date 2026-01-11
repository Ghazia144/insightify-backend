const Contact = require("../models/contact");

exports.contactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    

    await Contact.create({ name, email, subject, message });

    res.json({ msg: "Message received!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
