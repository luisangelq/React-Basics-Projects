const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if there are any errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }
  try {
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
        expiresIn: 120, // 2 hours
      },
      (err, token) => {
        if (err) throw err;
        res.json({ msg: "User created successfully", token });

        console.log(req.body);
        console.log("Successfull Register Request");
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send({});
  }
};
