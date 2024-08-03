const express = require('express');
const router = express.Router();
const {registerUser,loginUser,forgotPassword} = require('../controllers/authController');

router.post('/register',registerUser);
router.post('/signIn',loginUser);
router.post('/forgot-password',forgotPassword);
// router.patch('/reset-password/:token',resetPassword);


module.exports = router;