const Link = require("../models/Link");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");


exports.createLink = async (req, res, next) => {
    //Show express validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { originalName, password, downloads } = req.body;

  const link = new Link({
    originalName,
    url: shortid.generate(),
    fileName: shortid.generate() 
  });
  
  if(req.user) {
    
    if(downloads) {
        link.downloads = downloads;
    }

    if(password) {

        const salt = await bcrypt.genSalt(10);
        link.password = await bcrypt.hash(password, salt);
    }

    link.author = req.user.userId;
  }

  
    

  console.log(link);

  try {
    await link.save();
    res.status(200).json({ msg: "Link created successfully" });

    return next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });

  }
  console.log(link);
};
