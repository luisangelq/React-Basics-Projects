const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/email",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("email", "Please enter an email").notEmpty(),
  ],
  authController.isEmailExist
)

router.post(
  "/",
  [
    check("email", "Add a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  authController.signIn
);

router.get("/", auth, authController.userData);

module.exports = router;
