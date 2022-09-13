const express = require("express")
const { registerUser, loginUser, getUser } = require("../controllers/userController")
const route = express.Router()


route.post("/register", registerUser)
route.post("/login", loginUser)
route.get("/user", getUser)


module.exports = route