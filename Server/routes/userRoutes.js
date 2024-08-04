const express = require('express');
const {authenticateUser,authorizedUser} = require('../middlewares/authMidleware');
const {registerUser,loginUser,forgotPassword,resetPassword,protected,logout} = require('../controllers/authController');
const app = express();

app.route('/register').post(registerUser);
app.route('/signIn').post(loginUser);
app.route('/logout').get(logout);
app.route('/forgot-password').post(forgotPassword);
app.route('/reset-password/:resetToken').put(resetPassword);
app.route('/protected').get(authenticateUser,protected);

module.exports = app;