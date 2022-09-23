const jwt = require("jsonwebtoken");
const { User } = require("../Model/userModel");
const { Roles } = require("../utils/helper");

const protect = async (req, res, next) => {
  let token;

  // jwt is a Bearer token that works with headers

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get the token from the header
      token = req.headers.authorization.split(" ")[1];

      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // GET user
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      res.status(403).json({ error: "Access Denied." });
    }
  }
  if (!token) {
    res.status(403).json({ error: "Access Denied, No Token!" });
  }
};

const adminProtect = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user?.roles?.includes(Roles?.Admin)) {
      return res
        .status(403)
        .json({ error: "Access Denied! You are not authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: "Access Denied! You are not authorized" });
  }
};

module.exports = {
  protect,
  adminProtect,
};
