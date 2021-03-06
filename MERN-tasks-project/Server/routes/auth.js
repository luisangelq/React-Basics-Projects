//Routes to handle authentication
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

//Login User
//api/users
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  authController.authUser
);

//Get Logged User
router.get("/", auth, authController.getLoggedUser);

module.exports = router;
