const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log("File", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImage = multer({ storage: storage });

module.exports = uploadImage;