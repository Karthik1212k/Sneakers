const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ===== Helper to check required fields =====
const validateFields = (fields, reqBody) => {
  for (const field of fields) {
    if (!reqBody[field]) return `${field} is required`;
  }
  return null;
};

// LOGIN
router.post("/login", async (req, res) => {
  // Ensure req.body exists
  if (!req.body) return res.status(400).json({ msg: "Request body missing" });

  const error = validateFields(["email", "password"], req.body);
  if (error) return res.status(400).json({ msg: error });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // If user does not exist, create a new one
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        // A default name is added, you can change this as you see fit
        name: "New User",
        email,
        password: hashedPassword,
      });
      await user.save();
    } else {
      // If user exists, check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;