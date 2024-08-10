const express = require('express');
const {authenticateUser,authorizedUser} = require('../middlewares/authMidleware');
const {registerUser,loginUser,forgotPassword,resetPassword,logout,updateProfile} = require('../controllers/authController');
const router = express.Router();
const upload = require('../middlewares/upload');
 
router.route('/register').post(upload.single("profilePhoto"),registerUser);
router.route('/signIn').post(loginUser);
router.route('/logout').get(logout);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:resetToken').patch(resetPassword);
router.route('/profile/update').put(authenticateUser,updateProfile);

module.exports = router;