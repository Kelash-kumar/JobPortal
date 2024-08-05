const Application = require("../Models/application.model");
const Job = require("../Models/job.model");
const errorHandler = require("../utils/errorHandler");
const asyncHandler = require("../utils/asyncHandler");

//here role is student
exports.applyJob = asyncHandler(async (req, res, next) => {
  try {
    const jobId = req.params.id; //appying for this job
    const applicant_Id = req.user.id; //student who apply for this.

    // check job existenece:
    let job = await Job.findById(jobId);
    if (!job) {
      return next(new errorHandler(400, "This job is no more available"));
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: applicant_Id,
    });
    if (existingApplication) {
      return next(
        new errorHandler(400, "you have already applied for this job")
      );
    }

    const newApplication = await Application.create({
      applicant: applicant_Id,
      job: jobId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    res.status(200).json({
      success: true,
      message: "You have Applied for job successfully.",
      newApplication,
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

//here role is student
exports.getAppliedJobs = asyncHandler(async (req, res, next) => {
  try {
    const applicant_Id = req.user.id;
    const applications = await Application.find({
      applicant: applicant_Id,
    }).populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "company",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!applications) {
      return next(
        new errorHandler(400, "You have not applied for any job yet.")
      );
    }

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});

//role is admin
//getting all the applications who applied for the job;
exports.getApplications = asyncHandler(async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return next(new errorHandler(400, "No job found with this id"));
    }
    const applications = await Application.find({ job: jobId }).populate(
      "applicant"
    );
    if (!applications) {
      return next(new errorHandler(400, "No applications found for this job"));
    }
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    return next(new errorHandler(500, error.message));
  }
});
