const Task = require("../models/taskModel");
const Project = require("../models/projectModel");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId } = req.body;

    //check if project exists
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //check if user is the owner of the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //create task
    const task = new Task(req.body);
    await task.save();
    res.status(200).json({ msg: "Task Created", task });
    console.log(req.body);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

//get tasks by project
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.query;

    //check if project exists
    const project = await Project.findById(projectId);

    //check if user is the owner of the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //get tasks by project
    const tasks = await Task.find({ projectId });
    res.status(200).json({ msg: "Tasks retrieved", tasks });
    console.log("Succesfull Tasks retrieved request");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

//update task
exports.updateTask = async (req, res) => {
  try {
    const { projectId, taskName, state } = req.body;

    //check if task and project exist
    const project = await Project.findById(projectId);
    const taskId = await Task.findById(req.params.id);

    if (!taskId) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //check if user is the owner of the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //Create new object with updated values
    const taskUpdated = {};
    taskUpdated.taskName = taskName;
    taskUpdated.state = state;

    //update task
    const task = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: taskUpdated },
      { new: true }
    );
    res.status(200).json({ msg: "Task updated", task });
    console.log("Succesfull Task updated request");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

//delete task
exports.deleteTask = async (req, res) => {
  try {
    const { projectId } = req.query;
    //check if task and project exist
    const project = await Project.findById(projectId);
    const taskId = await Task.findById(req.params.id);

    if (!taskId) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //check if user is the owner of the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //delete task
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Task deleted" });
    console.log("Succesfull Task deleted request");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};
