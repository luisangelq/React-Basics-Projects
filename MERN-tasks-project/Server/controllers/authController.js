const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array()[0].msg });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

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
        res.json({ msg: "User Logged ", token });
        console.log("Succesfull Authentication Request");
      }
    );


  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: " Server Error "});
  }
};

exports.getLoggedUser = async (req, res) => {

  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: " Server Error "});
  }

}
