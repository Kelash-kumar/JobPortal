const express = require('express');
const {authenticateUser,authorizedUser}=require('../middlewares/authMidleware');
const{registerCompany,getCompanies,getCompanyById,updateCompany,deleteCompany} = require('../controllers/companyControllers');
const router = express.Router();


router.route('/register').post(authenticateUser,authorizedUser('recruiter'),registerCompany);
router.route('/').get(authenticateUser,authorizedUser('recruiter'),getCompanies);
router.route('/:id').get(authenticateUser,authorizedUser('recruiter'),getCompanyById);
router.route('/:id').put(authenticateUser,authorizedUser('recruiter'),updateCompany);
router.route('/:id').delete(authenticateUser,authorizedUser('recruiter'),deleteCompany);
module.exports = router;