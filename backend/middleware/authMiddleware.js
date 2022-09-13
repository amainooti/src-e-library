const jwt = require("jsonwebtoken")
const { User } = require("../Model/userModel")


const protect = async (req, res, next) => {
    let token;

    // jwt is a Bearer token that works with headers

    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // get the token from the header
            token = req.headers.authorization.split(" ")[1]

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // GET user
            req.user = await User.findById(decoded.id).select("-password")
            next()

        } catch (error) {
            console.log(error)
            res.status(401).json({message: "access denied."})
        }
    } if (!token) {
        res.status(401).json({message: "access denied, no token."})
    }
}

module.exports = {
    protect
}