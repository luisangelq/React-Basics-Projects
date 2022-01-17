const Link = require("../models/Link");
const shortid = require("shortid");
//Upload file
const multer = require("multer");
const fs = require("fs");

exports.createFile = (req, res, next) => {
  const multerConfig = {
    limits: { fileSize: 1024 * 1024 * 10 },
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        const ext = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${ext}`);
      },
    }),
  };

  try {
    const upload = multer(multerConfig).single("file");

    upload(req, res, (error) => {
      if (!error) {
        console.log(req.file.filename);
        return res
          .status(200)
          .json({ msg: "File uploaded successfully", file: req.file.filename });
      } else {
        console.error(error.code);
        res.status(500).json({ msg: "File Too Large, Sign Up For More Size!" });

        return next();
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.download = async (req, res, next) => {
  try {
    const linkObj = await Link.findOne({ fileName: req.params.download });
    if (!linkObj) {
      res
        .status(400)
        .json({ msg: "File not found or file expired", expired: true });
    }
    if (linkObj) {
      if (linkObj.downloads > 0) {
        res.download(`${__dirname}/../uploads/${req.params.download}`);
        linkObj.downloads = linkObj.downloads - 1;
        await linkObj.save();
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.deleteFile = async (req, res, next) => {
  try {
    fs.unlinkSync(`${__dirname}/../uploads/${req.file}`);

    res.status(200).json({ msg: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};
