const express = require("express");
const router = express.Router();
const filesController = require("../controllers/filesController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");


const upload = multer({ dest: "./uploads/" });

router.post("/",
    auth,
    upload.single("file"),
    filesController.createFile
);

router.delete("/:id",
    auth,
    filesController.deleteFile
);

module.exports = router;