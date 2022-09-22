const router = require("express").Router();
const {
  uploadBook,
  downloadBook,
  getDocument,
  searchDocument,
  downloadDocument,
  generateThumbnail,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
  getAllTags,
} = require("../controllers/bookController");
const { uploadFile } = require("../utils/helper");

router.get("/document", getDocument);
router.get("/tags", getAllTags);
router.post("/upload", uploadFile.single("document"), uploadBook);
router.get("/document/:documentId", getDocumentById);
router.put("/document/:documentId", updateDocumentById);
router.delete("/document/:documentId", deleteDocumentById);
router.get("/document/search/:documentSearch", searchDocument);
router.get("/document/thumbnail/:documentId", generateThumbnail);
router.get("/document/download/:documentId", downloadDocument);

module.exports = router;
