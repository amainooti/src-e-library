const exif = require("exiftool");
const fs = require("fs");
const { uploadFile } = require("../utils/helper");
const Document = require("../Model/DocumentModel");

const uploadBook = async (req, res) => {
  try {
    const document = req.file;
    // fs.readFile(document.path, function (err, data) {
    //   if (err) {
    //     console.log(err);
    //     throw err;
    //   } else {
    //     exif.metadata(data, function (err, metadata) {
    //       if (err) {
    //         console.log(err);
    //         throw err;
    //       } else {
    //         console.log(metadata);
    //       }
    //     });
    //   }
    // });

    res.status(200).json("Upload working");
  } catch (err) {
    res.status(401).json({ error: "An error occured" });
  }
};

const downloadBook = async (req, res) => {
  try {
    res.status(200).json("Download Working");
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "An error occured" });
  }
};

module.exports = { uploadBook, downloadBook };
