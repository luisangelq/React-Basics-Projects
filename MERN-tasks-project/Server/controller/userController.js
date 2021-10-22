const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Check if there are any errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User(req.body);

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user in the database
    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign token
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 7200, // 2 hours
      },
      (err, token) => {
        if (err) throw err;
        res.json({ msg: "User created successfully", token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send({});
  }
};
