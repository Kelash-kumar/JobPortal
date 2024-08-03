const User = require("../Models/user.model");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("../utils/asyncHandler");
const errorHandler = require("../utils/errorHandler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    data: { user },
  });
};
// @desc    Register user

exports.registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(
        new errorHandler(400, "Please provide name, email and password")
      );
    }
    const user = await User.findOne({ email });
    if (user) {
      return next(new errorHandler(400, "User already exists"));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
    });
    sendToken(newUser, 201, res);
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});
exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorHandler(400, "Please provide email and password"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new errorHandler(400, "User does not exist in the database.")
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return next(new errorHandler(401, "Invalid credentials"));
    }

    sendToken(user, 200, res);
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new errorHandler("Invalid email"));
    }
    const generatedResetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = generatedResetToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();
    const reset_url = `${req.protocol}://localhost:3000/api/v1/auth/reset-password/${token}`;
    sendEmail(
      user.email,
      "reset password ",
      `your reset password url link is below and it will expires in 10 minutes  : /n/n ${reset_url}`
    );
    res.status(200).json({
      message: `Reset password email has sent to you at ${user.email}`,
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

exports.resetPassword = asyncHandler(async (req, res) => {
  try {
    const { password } = req.body;
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});
