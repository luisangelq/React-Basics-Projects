const Project = require("../models/projectModel");
const { validationResult } = require("express-validator");

exports.createProject = (req, res) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const project = new Project(req.body);
    //save owner of project
    project.owner = req.user.id;

    project.save();
    res.status(200).json(project);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

//update project
exports.updateProject = async (req, res) => {
  // Check for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //extract project info
  const { name } = req.body;
  const projectUpdated = {};

  if (name) projectUpdated.name = name;

  try {
    //check id
    
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
