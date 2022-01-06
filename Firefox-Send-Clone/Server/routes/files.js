const express = require("express");
const router = express.Router();
const filesController = require("../controllers/filesController");

router.post("/", filesController.createFile);

router.get("/:download", filesController.download, filesController.deleteFile);

module.exports = router;
