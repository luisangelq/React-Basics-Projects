const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//create a new project
// api/projects
router.post(
  "/",
  auth,
  [check("projectName", "Name is required").not().isEmpty()],
  projectController.createProject
);

router.get("/", auth, projectController.getProjects);

router.put(
  "/:id",
  auth,
  [check("projectName", "Name is required").not().isEmpty()],
  projectController.updateProject
);

router.delete(
  "/:id",
  auth,
  projectController.deleteProject
);

module.exports = router;
