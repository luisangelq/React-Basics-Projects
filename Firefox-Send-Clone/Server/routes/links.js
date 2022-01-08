const express = require("express");
const router = express.Router();
const linksController = require("../controllers/linksController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  [check("name", "Upload File").not().isEmpty()],
  auth,
  linksController.createLink
);

router.get(
  "/",
  linksController.getLinks
);

router.post("/userLinks", auth, linksController.getUserLinks);

router.get("/:url", linksController.getLink);

router.post("/:url", linksController.checkPassword);

module.exports = router;
