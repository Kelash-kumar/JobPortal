const express = require('express');
const{registerCompany} = require('../controllers/companyControllers');
const {authenticateUser,authorizedUser}=require('../middlewares/authMidleware');
const router = express.Router();


router.route('/register').post(authenticateUser,authorizedUser('recruiter'),registerCompany);

module.exports = router;