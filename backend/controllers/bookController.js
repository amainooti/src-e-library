const { uploadFile } = require("../utils/helper");
const Document = require("../Model/DocumentModel");

const uploadBook = async (req, res) => {
  try {
    const documentUrls = [];

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
