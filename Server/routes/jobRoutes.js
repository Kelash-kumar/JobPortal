const express = require('express');
const router = express.Router();
const {authenticateUser,authorizedUser} = require('../middlewares/authMidleware');
const {postJob,getAllJobs,getJobsById} = require('../controllers/job.controller');

router.route('/').post(authenticateUser,authorizedUser('recruiter'),postJob);
router.route('/all-jobs').get(authenticateUser,getAllJobs);
router.route('/:id').get(authenticateUser,getJobsById);
module.exports = router;

