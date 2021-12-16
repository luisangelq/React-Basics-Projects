const express = require("express");
const router = express.Router();
const linksController = require("../controllers/linksController");
const filesController = require("../controllers/filesController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [check("originalName", "Upload File").not().isEmpty()],
  auth,
  linksController.createLink
);

router.get("/:url", linksController.getLink, filesController.deleteFile);

module.exports = router;
