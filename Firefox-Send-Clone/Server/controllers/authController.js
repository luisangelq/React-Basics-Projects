const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const { validationResult } = require("express-validator");

exports.isEmailExist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(200).json({ msg: "User Exists", exist: true });
  } else {
    res.status(200).json({ msg: "User Doesn't Exist", exist: false });
  }
}

exports.signIn = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    res.status(422).json({ msg: "This User Doesn't Exist" });

    return next();
  }

  if (bcrypt.compareSync(password, user.password)) {
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

    res.status(200).json({ msg: "User Logged In Successfully", token });
  } else {
    res.status(422).json({ msg: "Invalid Password" });

    return next();
  }
};

exports.userData = (req, res) => {
    console.log(req.user);
  res.status(200).json({user: req.user});
};
