const express = require('express');
const {authenticateUser,authorizedUser}=require('../middlewares/authMidleware');
const{registerCompany,getCompanies,getCompanyById,updateCompany} = require('../controllers/companyControllers');
const router = express.Router();


router.route('/register').post(authenticateUser,authorizedUser('recruiter'),registerCompany);
router.route('/').get(authenticateUser,authorizedUser('recruiter'),getCompanies);
router.route('/:id').get(authenticateUser,authorizedUser('recruiter'),getCompanyById);
router.route('/:id').put(authenticateUser,authorizedUser('recruiter'),updateCompany);
module.exports = router;