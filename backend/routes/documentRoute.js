const router = require("express").Router();
const {
  uploadBook,
  downloadBook,
  getDocument,
  searchDocument,
  generateThumbnail,
} = require("../controllers/bookController");
const { uploadFile } = require("../utils/helper");

router.post("/upload", uploadFile.single("documentFile"), uploadBook);
router.get("/document/:documentId", downloadBook);
router.get("/document", getDocument);
router.get("/document/search/:documentSearch", searchDocument);
router.get("/document/thumbnail/:documentId", generateThumbnail);

module.exports = router;
