const router = require("express").Router();
const { uploadBook, downloadBook } = require("../controllers/bookController");
const { uploadFile } = require("../utils/helper");

router.post("/", uploadFile.single("documentFile"), uploadBook);
router.get("/:documentId", downloadBook);

module.exports = router;
