const User = require("../Models/user.model");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("../utils/asyncHandler");
const errorHandler = require("../utils/errorHandler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const exp = require("constants");

const sendResponseToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
  
    data: { user },
  });
};

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
    sendResponseToken(newUser, 201, res); //token sent
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    //provide user role;
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
    if (!isMatch) {
      return next(new errorHandler(401, "Invalid credentials"));
    }
    res.status(200).cookie("token", generateToken(user._id), {
      httpOnly: true,
      sameSite:'restrict',
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});
exports.logout = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
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
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${generatedResetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: \n\n ${resetURL}.\n\nIf you didn't forget your password, please ignore this email!`;

    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    res.status(200).json({
      message: `Reset password email has been sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new errorHandler(500, error.message));
  }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token);
    if (!token) {
      return next(new errorHandler(400, "Token is invalid"));
    }
    if (!password) {
      return next(new errorHandler(400, "Please provide a password"));
    }
    const user = await User.findOne({})
      .where("resetPasswordToken")
      .equals(token)
      .where("resetPasswordExpire")
      .gt(Date.now());
    if (!user) {
      return next(new errorHandler(400, "Invalid token "));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    user.password = hashedPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});


exports.protected = asyncHandler((req,res)=>{
  res.status(200).json({message:'i am authorized'})
})