const express = require("express")
const { registerUser, loginUser, getUser } = require("../controllers/user")
const route = express.Router()


route.post("/", registerUser)
route.post("/login", loginUser)
route.get("/user", getUser)


module.exports = route