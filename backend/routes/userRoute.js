const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  resetPasswordRequestContoller,
  resetPasswordController,
} = require("../controllers/userController");
const route = express.Router();
const { protect } = require("../middleware/authMiddleware");

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/user", protect, getUser);
route.post("/requestResetPassword", resetPasswordRequestContoller);
route.post("/resetPassword", resetPasswordController);
// route.get("/verify", protect)

module.exports = route;
