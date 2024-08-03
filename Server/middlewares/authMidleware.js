const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
// Middleware to authenticate user by checking token
const authenticateUser = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }
      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized user, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized user, no token" });
  }
};


//midddleware to check if user is admin
 const authorizedUser = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      next();
    } else {
      res.status(401).json({ message: "Not authorized as an admin" });
  }
 }
}
module.exports = {authenticateUser, authorizedUser};
