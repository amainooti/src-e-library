const fs = require("fs");
const path = require("path");
const { PDFNet } = require("@pdftron/pdfnet-node");
const { addMetadata } = require("../utils/helper");
const Document = require("../Model/DocumentModel");
const { fromPath } = require("pdf2pic");

const uploadBook = async (req, res) => {
  try {
    const documentSent = req.file;
    const { title, author, pageCount, description } = req.body;
    const newTitle = !title ? documentSent.originalname : title;
    // let document = await Document.findOne({ title: newTitle });
    // if (document) {
    //   return res.status(401).json({ error: "Document already exist!" });
    // }
    document = await Document.create({
      title: newTitle,
      author: author,
      urlPath: documentSent.path,
      noOfPages: pageCount,
      description: description,
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

const getDocumentById = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const document = await Document.findById(documentId).lean();
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ error: "Document does not exist" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "An Error Occured" });
  }
};

const downloadDocument = async (req, res) => {
  try {
    const documentId = req.params.documentId;
    const document = await Document.findById(documentId).lean();
    if (!document) {
      res.sendStatus(500);
    }
    const inputPath = path.resolve(__dirname, `../${document.urlPath}`);
    res.download(inputPath);
  } catch (err) {
    res.status(500).end(err);
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
  try {
    const documentId = req.params.documentId;
    const document = await Document.findById(documentId).lean();
    if (!document) {
      res.sendStatus(500);
    }
    const outputPath = path.resolve(__dirname, "../public/thumbnails");
    const inputPath = path.resolve(__dirname, `../${document.urlPath}`);
    const outputFile = `${outputPath}/${document.urlPath}.png`;
    // const getThumbFromDocument = async () => {
    //   const doc = await PDFNet.PDFDoc.createFromFilePath(inputPath);
    //   await doc.initSecurityHandler();
    //   const pdfDraw = await PDFNet.PDFDraw.create(92);
    //   const currPage = await doc.getPage(1);
    //   await pdfDraw.export(currPage, outputPath, "PNG");
    // };

    // PDFNet.runWithCleanup(getThumbFromDocument)
    //   .then(() => {
    //     fs.readFile(outputPath, (err, data) => {
    //       if (err) {
    //         res.statusCode = 500;
    //         res.end(err);
    //       } else {
    //         res.setHeader("ContentType", "application/png");
    //         res.end(data);
    //       }
    //     });
    //   })
    //   .catch((err) => {
    //     res.statusCode = 500;
    //     res.end(err);
    //   });
    const options = {
      density: 100,
      saveFilename: `${document._id}`,
      savePath: outputPath,
      format: "png",
      width: 600,
      height: 600,
    };
    const storeAsImage = fromPath(inputPath, options);
    const pageToConvertAsImage = 1;
    await storeAsImage(pageToConvertAsImage).then((resolve) => {
      return resolve;
    });
    fs.readFile(`${outputPath}/${document._id}.1.png`, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(err);
      } else {
        res.setHeader("ContentType", "application/png");
        res.end(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end(err);
  }
};

module.exports = {
  uploadBook,
  downloadBook,
  getDocument,
  searchDocument,
  generateThumbnail,
  downloadDocument,
  getDocumentById,
};
