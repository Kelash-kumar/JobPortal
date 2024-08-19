const User = require("../Models/user.model");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("../utils/asyncHandler");
const errorHandler = require("../utils/errorHandler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const upload = require("../middlewares/upload");
const cloudinary = require("cloudinary").v2;
const { getDataUriParser } = require("../utils/getDatauri");

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
    const { name, email, phoneNumber, password, role } = req.body;

    if (!name || !email || !password || !role || !phoneNumber) {
      return next(
        new errorHandler(
          400,
          "Please provide name, email ,phoneNumber , password and role "
        )
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
      phoneNumber,
      role,
      profilePhoto: req.file ? req.file.path : null,
    });
    sendResponseToken(newUser, 201, res); //token sent
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return next(
        new errorHandler(400, "Please provide email ,password & role")
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new errorHandler(400, "User does not exist in the database.")
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new errorHandler(401, "Invalid password "));
    }

    if (user.role !== role) {
      return next(new errorHandler(401, "UnAthorized! Not valid Role  "));
    }
    const token = generateToken(user._id);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })
      .json({
        success: true,
        token,
        user,
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

exports.updateProfile = [
  upload.fields([{ name: "profilePhoto" }, { name: "resume" }]),
  asyncHandler(async (req, res, next) => {
    try {
      // getting all field form user;
      const formData = Object.assign({}, req.body);
      const { name, phoneNumber, bio, skills } = formData;
  

     
      // getting files profilePhoto and resume;
      const profilePhoto = req.files["profilePhoto"] ? req.files["profilePhoto"][0]: null;
      const resume = req.files["resume"] ? req.files["resume"][0] : null;
      let uploadedProfilePhotoUrl = null;
      let uploadedResumeURI = null;

      // Handling the ProfilePhoto upload
      if (profilePhoto) {
        const profilePhotoDataURI = getDataUriParser(profilePhoto);
        
        const uploadProfilePhoto = await cloudinary.uploader.upload(
          profilePhotoDataURI
        );
        uploadedProfilePhotoUrl = uploadProfilePhoto.secure_url;
      }

      // Handling the resume upload;
      if (resume) {
        const resumeDataURI = getDataUriParser(resume);
        const uploadResume = await cloudinary.uploader.upload(resumeDataURI);
        uploadedResumeURI = uploadResume.secure_url;
      }

      // Handliing the Skills array;
      const skillsArray = skills.split(",");
      const userId = req.user.id;
      // checking use existence:
      const user = await User.findById(userId);

      if (!user) {
        return next(new errorHandler(404, "User not found"));
      }

      if (name) user.name = name;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (skillsArray)  user.profile.skills = skillsArray;
      if (uploadedProfilePhotoUrl)user.profile.profilePhoto = uploadedProfilePhotoUrl;
      if (uploadedResumeURI){ 
       
        user.profile.resume=uploadedResumeURI;
        user.profile.resumeOriginalName=resume.originalname;
      }

      await user.save();
      res.status(200).json({
        success: true,
        message: "profile updated successfully",
        user
      });

    } catch (error) {
      console.log(error)
      return next(new errorHandler(500, error.message));
    }
  }),
];

// exports.updateProfile = [
//   upload.fields([{ name: "profilePhoto" }, { name: "resume" }]),
//   asyncHandler(async (req, res, next) => {
//     try {
//       const formData = Object.assign({}, req.body);
//       const { name, phoneNumber, bio, skills } = formData;

//       if (!name || !phoneNumber || !bio || !skills) {
//         return next(new errorHandler(404, "Fill all fields"));
//       }

//         //  cloudinary goes here
//         if (Object.entries(req.files).length != 0 && req.files) {
//           if (req.files.profilePhoto != undefined)
//             user.profile.profilePhoto = req.files.profilePhoto[0].filename;
//           if (req.files.resume != undefined) {
//             user.profile.resume = req.files.resume[0].filename;
//             user.profile.resumeOriginalName = req.files.resume[0].originalname;
//           }
//         }

//       const skillsArray = skills.split(",");

//       const userId = req.user.id; //from middleware;

//       const user = await User.findById(userId);

//       if (!user) {
//         return next(new errorHandler(404, "User not found"));
//       }

//       user.name = name;
//       user.phoneNumber = phoneNumber;
//       user.profile.bio = bio;
//       user.profile.skills = skillsArray;

//       await user.save();
//       res.status(200).json({
//         success: true,
//         message: "Profile updated successfully",
//         user,
//       });
//     } catch (error) {
//       return next(new errorHandler(500, error.message));
//     }
//   }),
// ];
