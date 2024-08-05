const Job = require('../Models/job.model');
const errorHandler = require('../utils/errorHandler');
const asyncHandler = require('../utils/asyncHandler');

//methods that need to create for job controller
/**
 * 1- postJob
 * 2- getJobs
 * 3- getJobById
 * 4- updateJob
 */

exports.postJob = asyncHandler(async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Post job',
        });
    } catch (error) {
        return next(new errorHandler(500, error.message));
    }
});