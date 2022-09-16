const router = require("express").Router();
const {
  uploadBook,
  downloadBook,
  getDocument,
  searchDocument,
  downloadDocument,
  generateThumbnail,
} = require("../controllers/bookController");
const { uploadFile } = require("../utils/helper");

router.post("/upload", uploadFile.single("document"), uploadBook);
router.get("/document/:documentId", downloadBook);
router.get("/document", getDocument);
router.get("/document/search/:documentSearch", searchDocument);
router.get("/document/thumbnail/:documentId", generateThumbnail);
router.get("/document/download/:documentId", downloadDocument);

module.exports = router;
