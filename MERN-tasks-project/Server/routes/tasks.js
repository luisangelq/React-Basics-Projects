const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Create Task
router.post(
  "/",
  auth,
  [
    check("taskName", "Name is required").not().isEmpty(),
    check("projectId", "Project is required").not().isEmpty(),
  ],

  taskController.createTask
);

//Get tasks by project
router.get("/", auth, taskController.getTasksByProject);

//Update task
router.put(
    "/:id",
    auth,
    [
        check("taskName", "Name is required").not().isEmpty(),
        check("projectId", "Project is required").not().isEmpty(),
    ],
    taskController.updateTask
);

//Delete task
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
