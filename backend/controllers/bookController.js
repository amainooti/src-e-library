const exif = require("exiftool");
const fs = require("fs");
const { uploadFile } = require("../utils/helper");
const Document = require("../Model/DocumentModel");

const uploadBook = async (req, res) => {
  try {
    let dataexif = { title: "", author: "" };
    const document = req.file;

    fs.readFile(document.path, function (err, data) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        exif.metadata(data, function (err, metadata) {
          if (err) {
            throw err;
          } else {
            dataexif.author = metadata.author ? metadata.author : "";
            // dataexif.title = metadata.
          }
        });
      }
    });
    dataexif.title = document.originalname;
    // await Document.create({ title: document.orginalname });
    res.status(200).json(dataexif);
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

const getRecentBooks = async (req, res) => {
  try {
    res.status(200).json("Recent Books");
  } catch (err) {
    res.status(401).json("Error occured");
  }
};

module.exports = { uploadBook, downloadBook, getRecentBooks };
