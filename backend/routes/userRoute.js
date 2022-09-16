const express = require("express")
const { registerUser, loginUser, getUser } = require("../controllers/userController")
const router = express.Router()
const {protect } = require("../middleware/authMiddleware")


router.post("/register", registerUser)
router.post("/login", protect, loginUser)
router.get("/user", protect, getUser)


module.exports = router