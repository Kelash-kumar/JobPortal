const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
// Middleware to authenticate user by checking token
const authenticateUser = async (req, res, next) => {
  let token;

  if (req.cookies.token || req.headers.authorization?.startsWith('Bearer')) {  // Corrected typo here
    try {
      token = req.cookies.token || req.headers.authorization.split(' ')[1];  // Corrected typo here

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID in the decoded token
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.id = decoded.id;
      // console.log('User ID at authMiddleware:', req.id);

      next();
    } catch (err) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token!' });
  }
};



//midddleware to check if user is admin
 const authorizedUser = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      next();
    } else {
      res.status(401).json({ message: `Not authorized as an ${requiredRole  }` });
  }
 }
}
module.exports = {authenticateUser, authorizedUser};
