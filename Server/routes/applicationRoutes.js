const express = require('express');
const {authenticateUser,authorizedUser}=require('../middlewares/authMidleware');
const{applyJob,getAppliedJobs,getApplications} = require('../controllers/application.controllers');
const router = express.Router();

router.route('/apply/:id').post(authenticateUser,authorizedUser("student"),applyJob);
router.route('/students/applied').get(authenticateUser,authorizedUser("student"),getAppliedJobs);
router.route('/applied').get(authenticateUser,authorizedUser("recruiter"),getApplications);//company can see all applications for a job
module.exports = router;
