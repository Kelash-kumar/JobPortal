//job model 

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide a title"]
    },
    description:{
        type:String,
        required:[true,"Please provide a description"]
    },
    requirements:[{
        type:String,
        required:[true,"Please provide a requirement"]
    }],
    location:{
        type:String,
        required:[true,"Please provide a location"]
    },
    salary:{
        type:Number,
        required:[true,"Please provide a salary"]
    },
    jobType:{
        type:String,
        required:[true,"Please provide a job type"]
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Company"
    },
    position:{
        type:Number,
        required:[true,"Please provide a position"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },// recruiter who posted the job
    applicants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]// students who applied for the job
},{timestamps:true}
);

const Job = mongoose.model("Job",jobSchema);
module.exports = Job;