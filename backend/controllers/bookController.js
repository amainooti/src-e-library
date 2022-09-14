const { addMetadata } = require("../utils/helper");
const Document = require("../Model/DocumentModel");

const uploadBook = async (req, res) => {
  try {
    const documentSent = req.file;
    const { title, author } = req.body;
    const newTitle = !title ? documentSent.originalname : title;
    console.log(title);
    let document = await Document.findOne({ title: newTitle });
    if (document) {
      return res.status(401).json({ error: "Document already exist!" });
    }
    console.log(newTitle);
    document = await Document.create({
      title: newTitle,
      author: author,
      urlPath: documentSent.path,
    });

    // addMetadata(documentSent.path, newTitle);

    res.status(200).json(document);
  } catch (err) {
    console.log(err);
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

const getDocument = async (req, res) => {
  try {
    const qnew = req.query.new;
    let documents;
    if (qnew) {
      console.log("new");
      documents = await Document.find().sort({ createdAt: -1 }).limit(6);
    } else {
      documents = await Document.find().sort({ createdAt: -1 });
    }
    res.status(200).json(documents);
  } catch (err) {
    console.log(err);
    res.status(401).json("Error occured");
  }
};

const searchDocument = async (req, res) => {
  try {
    const documentSearch = req.params.bookSearch;
    const listDocuments = await Document.find({
      title: { $regex: new RegExp(documentSearch.toLowerCase(), "i") },
    }).limit(5);
    res.status(200).json(listDocuments);
  } catch (err) {
    res.status(401).json({ error: "An error occured" });
  }
};

module.exports = {
  uploadBook,
  downloadBook,
  getDocument,
  searchDocument,
};
