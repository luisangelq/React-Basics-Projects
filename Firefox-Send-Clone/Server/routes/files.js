const express = require("express");
const router = express.Router();
const filesController = require("../controllers/filesController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post("/",
    auth,
    filesController.createFile
);


module.exports = router;