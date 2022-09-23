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
const { protect, adminProtect } = require("../middleware/authMiddleware");

router.get("/document", getDocument);
router.get("/tags", protect, adminProtect, getAllTags);
router.post(
  "/upload",
  protect,
  adminProtect,
  uploadFile.single("document"),
  uploadBook
);
router.get("/document/:documentId", getDocumentById);
router.put("/document/:documentId", protect, adminProtect, updateDocumentById);
router.delete(
  "/document/:documentId",
  protect,
  adminProtect,
  deleteDocumentById
);
router.get("/document/search/:documentSearch", searchDocument);
router.get("/document/thumbnail/:documentId", generateThumbnail);
router.get("/document/download/:documentId", downloadDocument);

module.exports = router;
