
//Upload file
const multer = require("multer");

const multerConfig = {
    limits: { fileSize: 1000000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + "/../uploads");
        }
    }),
}



exports.createFile = async (req, res, next) => {
    console.log(req.file);
    
}

exports.deleteFile = async (req, res, next) => {

}