const Project = require("../models/projectModel");

exports.createProject = (req, res) => {
  try {
    const project = new Project(req.body);
    project.save();
    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
