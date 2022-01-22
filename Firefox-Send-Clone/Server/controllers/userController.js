const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });
const { validationResult } = require("express-validator");

exports.createUser = async (req, res) => {
  //Show express validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if email already exists
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Create new user
  user = new User(req.body);

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  try {
    await user.save();
    //Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    console.log(token);

    res.json({ msg: "User created successfully", token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
