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
  if (linkObj.downloads === 1) {
    req.file = linkObj.fileName;

    //Delete the link in the database
    await Link.findOneAndDelete({ url: req.params.url });

    next();
  }

  if (linkObj.downloads > 1) {
    linkObj.downloads = linkObj.downloads - 1;
    await linkObj.save();
  }
};

exports.deleteFile = async (req, res, next) => {
  console.log(req.file);
  try {
    fs.unlinkSync(`${__dirname}/../uploads/${req.file}`);
  } catch (error) {
    console.error("HOLA");
    res.status(500).json({ msg: "Server Error" });
  }
};
