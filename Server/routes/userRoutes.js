const express = require('express');
const {authenticateUser,authorizedUser} = require('../middlewares/authMidleware');
const {registerUser,loginUser,forgotPassword,resetPassword,logout,updateProfile} = require('../controllers/authController');
const app = express();

app.route('/register').post(registerUser);
app.route('/signIn').post(loginUser);
app.route('/logout').get(logout);
app.route('/forgot-password').post(forgotPassword);
app.route('/reset-password/:resetToken').patch(resetPassword);
app.route('/profile/update').put(authenticateUser,updateProfile);

module.exports = app;