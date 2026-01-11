const express = require("express");
const router = express.Router();
const { getUsers, createUser, deleteUser } = require('../controllers/userController');

// Get all users
// router.get("/", getUsers);
// router.get("/", (req, res) => {
//   res.json({ message: "user route working" });
// });

// Add fake user (optional)
router.get("/", getUsers);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router;
