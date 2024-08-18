const express = require('express');
const {authenticateUser,authorizedUser} = require('../middlewares/authMidleware');
const {registerUser,loginUser,forgotPassword,resetPassword,logout,updateProfile} = require('../controllers/authController');
const router = express.Router();
 
router.route('/register').post(registerUser);
router.route('/signIn').post(loginUser);
router.route('/logout').get(logout);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:resetToken').patch(resetPassword);
router.route('/profile/update').put(authenticateUser,updateProfile);

module.exports = router;