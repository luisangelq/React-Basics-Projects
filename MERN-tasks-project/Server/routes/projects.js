const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

const { check } = require('express-validator');

//create a new project
// api/projects
router.post('/',

    [
        check('name', 'Name is required').not().isEmpty()
    ],

    projectController.createProject
)

module.exports = router;