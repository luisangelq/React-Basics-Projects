const Link = require("../models/Link");
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const cron = require("node-cron");
const fs = require("fs");

const deleteExpiredLinksAndFiles = async () => {
  try {
    //Find all links that have expired
    const expiredLinks = await Link.find({ expires: { $lte: Date.now() } });

    if (expiredLinks.length > 0) {
      expiredLinks.forEach(async (link) => {
        //Delete file
        fs.unlinkSync(`${__dirname}/../uploads/${link.fileName}`);
      });

      await Link.deleteMany({ expires: { $lte: Date.now() } });

      console.log("Expired links and files deleted");
    }
  } catch (err) {
    console.error(err.message);
  }
};
//execute the cron job every minute
cron.schedule("*/10 * * * * *", deleteExpiredLinksAndFiles);

exports.createLink = async (req, res, next) => {
  //Show express validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, content, password, downloads, expires, size } = req.body;

  console.log(req.body);

  const link = new Link({
    url: shortid.generate(),
    fileName: name,
    content: content,
    downloads: downloads,
    expires: expires,
    size: size,
  });

  if (req.user) {
    if (downloads) {
      link.downloads = downloads;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }

    link.author = req.user.userId;
  }

  console.log(link);

  try {
    await link.save();
    res.status(200).json({ msg: "Link created successfully", link });

    return next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
  console.log(link);
};

//Get Links
exports.getLinks = async (req, res, next) => {
  try {
    const links = await Link.find({}).select("url author -_id");
    res.status(200).json({ links });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

//Get Link
exports.getLink = async (req, res, next) => {
  try {
    //Validate the url
    const linkObj = await Link.findOne({ url: req.params.url });

    if (!linkObj) {
      console.log("Link not found");
      res.status(404).json({ msg: "Link not found" });

      return;
    } else {
      console.log(linkObj);
      res.status(200).json({ linkObj });
    }

    return next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
