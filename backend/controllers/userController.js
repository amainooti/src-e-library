const { User } = require("../Model/userModel");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    // check if the text fields are empty
    const { name, email, password, department, level } = req.body;

    if (!name || !email || !password || !department || !level) {
        res.status(400).json({ message: "Please fill in the fields" })
    }

    // check if the user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({message: "User already exists! "})
    } else {
        try {
            // hashpasword
            const salt = await bcrypt.genSalt(10);
            const hashpasword = await bcrypt.hash(password, salt);

            // create user
            const user = await User.create({
                name,
                email,
                department,
                level,
                password: hashpasword
            })
            res.status(200).json({
                name,
                email,
                department,
                level,
                password
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}



const loginUser = async (req, res) => {
    // get the fields
    const { email, password } = req.body;
    // check if the fields are there
    if (!email || !password) {
        res.status(400).json({message: "password and email required"})
    }

    // get the user
    const user = await User.findOne({ email })

    // check if the passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400).json({message: "incorrect email or password"})
    }
}


const getUser = async (req, res) => {
    res.status(200).json({message: "user"})
}



module.exports = {
    registerUser,
    loginUser,
    getUser
}