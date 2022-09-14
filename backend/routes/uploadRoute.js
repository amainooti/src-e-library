const router = require("express").Router();
const { uploadBook, downloadBook } = require("../controllers/bookController");

router.post("/", uploadBook);
router.get("/:documentId", downloadBook);

module.exports = router;
