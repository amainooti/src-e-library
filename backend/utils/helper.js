const multer = require("multer");

const DOCUMENTDIR = "./public/documents";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DOCUMENTDIR);
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + "." + file.originalname.split("."));
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .pdf, .docx format are allowed"));
    }
  },
});

module.exports = { uploadFile };
