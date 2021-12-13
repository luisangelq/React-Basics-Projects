const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { check } = require("express-validator");

router.post("/", 

    authController.signIn

);

router.get("/",
    authController.userData
);

module.exports = router;