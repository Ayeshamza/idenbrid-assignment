var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var imageUpload = multer({
  storage: storage,
});

module.exports = imageUpload;
