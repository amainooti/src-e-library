const router = require("express").Router();
const {
  uploadBook,
  downloadBook,
  getDocument,
  searchDocument,
} = require("../controllers/bookController");
const { uploadFile } = require("../utils/helper");

router.post("/upload", uploadFile.single("documentFile"), uploadBook);
router.get("/document/:documentId", downloadBook);
router.get("/document", getDocument);
router.get("/search/:documentSearch", searchDocument);

module.exports = router;