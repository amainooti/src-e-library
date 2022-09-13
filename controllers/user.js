const { response } = require("express")

const registerUser = async (req, res) => {
    res.status(200).json({message: "registered"})
}


const loginUser = async (req, res) => {
    res.status(200).json({ message: "logged in" })
}


const getUser = async (req, res) => {
    res.status(200).json({message: "user"})
}



module.exports = {
    registerUser,
    loginUser,
    getUser
}