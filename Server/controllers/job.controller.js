const Job = require("../Models/job.model");
const errorHandler = require("../utils/errorHandler");
const asyncHandler = require("../utils/asyncHandler");
const Company = require("../Models/company.model");
//methods that need to create for job controller
/**
 * 1- postJob
 * 2- getAllJobs
 * 3- getJobById
 * 4- updateJob
 */

exports.postJob = asyncHandler(async (req, res, next) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      position,
      experienceLevel,
    } = req.body;
    const userId = req.user._id;

    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !position ||
      !experienceLevel
    ) {
      return next(new errorHandler(400, "Please provide all required fields"));
    }
    const company = await Company.findOne({ userId });
    if (!company) {
      return next(new errorHandler(400, "user has no company"));
    }
    const job = await Job.create({
      title,
      description,
      requirements,
      location,
      salary: Number(salary),
      jobType,
      position,
      experienceLevel,
      company: company._id,
      createdBy: userId,
    });
    if (!job) {
      return next(new errorHandler(400, "Failed to post job"));
    }
    res.status(200).json({
      success: true,
      message: "Post job",
      data: job,
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

exports.getAllJobs = asyncHandler(async (req, res, next) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query);
    if(!jobs){
      return next(new errorHandler(404,'No jobs availabe '));
    }
    res.status(200).json({
      success:true,
      message:'successfully got all jobs',
      jobs
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

exports.getJobsById = asyncHandler(async(req,res,next) =>{
  try {
   const jobId = req.params.id;
   const job = await Job.findById({_id:jobId});
   if(!job){
    return next(new errorHandler(404,"This job is not exist."));
   } 
   res.status(200).json({
    success:true,
    message:'successfully found the job.',
    job
   });

  } catch (error) {
    return next(new errorHandler(500,error.message));
  }
});
