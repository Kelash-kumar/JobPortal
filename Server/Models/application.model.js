const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
    },// job to which the application is made
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    }
},{timestamps:true}
);

const Application = mongoose.model("Application",applicationSchema);
module.exports = Application;