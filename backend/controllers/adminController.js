
const Admin = require("../Model/adminModel")

const registerAdmin = async (req, res) => {
    res.status(200).json({message: "created"})
}


const loginAdmin = async (req, res) => {
    res.status(200).json({message: "login"})
}


module.exports = {
    registerAdmin,
    loginAdmin
}