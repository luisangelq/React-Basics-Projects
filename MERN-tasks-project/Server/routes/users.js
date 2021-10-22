//Routes to create users
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { check } = require("express-validator");

//Create User

//api/users
router.post(
  "/",
  [
    check("userName", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  userController.createUser
);

module.exports = router;
