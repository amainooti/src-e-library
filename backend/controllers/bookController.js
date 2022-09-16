const fs = require("fs");
const path = require("path");
const { PDFNet } = require("@pdftron/pdfnet-node");
const { addMetadata } = require("../utils/helper");
const Document = require("../Model/DocumentModel");

const uploadBook = async (req, res) => {
  try {
    const documentSent = req.file;
    const { title, author } = req.body;
    const newTitle = !title ? documentSent.originalname : title;
    // let document = await Document.findOne({ title: newTitle });
    // if (document) {
    //   return res.status(401).json({ error: "Document already exist!" });
    // }
    document = await Document.create({
      title: newTitle,
      author: author,
      urlPath: documentSent.path,
    });

    // addMetadata(documentSent.path, newTitle);

    res.status(200).json(document);
  } catch (err) {
    console.log(err);
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
    const documentSearch = req.params.documentSearch;
    const listDocuments = await Document.find({
      title: { $regex: new RegExp(documentSearch.toLowerCase(), "i") },
    }).limit(5);
    res.status(200).json(listDocuments);
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "An error occured" });
  }
};

const generateThumbnail = async (req, res) => {
  console.log("Running");
  const documentId = req.params.documentId;
  console.log(documentId);
  const document = await Document.findById(documentId).lean();
  if (!document) {
    res.sendStatus(404);
  }
  console.log(document);
  const outputPath = path.resolve(__dirname, "../public/thumbnails");
  const inputPath = path.resolve(__dirname, `../${document.urlPath}`);
  console.log(outputPath);
  const getThumbFromDocument = async () => {
    const doc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
    await doc.initSecurityHandler();
    const pdfDraw = await PDFNet.PDFDraw.create(92);
    const currPage = await doc.getPage(1);
    await pdfDraw.export(currPage, outputPath, "PNG");
  };
  PDFNet.runWithCleanup(getThumbFromDocument)
    .then(() => {
      fs.readFile(outputPath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end(err);
        } else {
          res.setHeader("ContentType", "application/png");
          res.end(data);
        }
      });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.end(err);
    });
};

module.exports = {
  uploadBook,
  downloadBook,
  getDocument,
  searchDocument,
  generateThumbnail,
};
