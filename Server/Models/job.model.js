//job model

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    requirements: [
      {
        type: [String],
        required: [true, "Please provide a requirement"],
      },
    ],
    location: {
      type: String,
      required: [true, "Please provide a location"],
    },
    salary: {
      type: Number,
      required: [true, "Please provide a salary"],
    },
    jobType: {
      type: String,
      required: [true, "Please provide a job type"],
    },
    position: {
      type: Number,
      required: [true, "Please provide a position"],
    },
    experienceLevel: {
        type: Number,
        },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // recruiter who posted the job
    applications:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    }] // all applications for this job that are pending, accepted or rejected
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
