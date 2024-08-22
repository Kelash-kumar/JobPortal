/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from "react-router-dom";
import "./styles/jobDescription.css";
import { useSelector, useDispatch } from "react-redux";
import { setJob } from "../redux/jobSlice";
import { setAllApplications } from "../redux/applicationSlice.js";
import { JOBS_API_END_POINT, APPLICATION_API_END_POINT } from "../constant/constants";
import axios from "axios";
import { useEffect } from "react";
import {toast} from 'react-hot-toast'

const JobDescription = () => {
  const { id } = useParams();
  const { Job } = useSelector((state) => state.jobs);
  const { allApplications } = useSelector((state) => state.applications);
  console.log(allApplications)
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        if (res && res.data && res.data.job) {
          
          dispatch(setJob(res.data.job));
        }
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };
    getSingleJob();
  }, [dispatch, id]);

  if (!Job) {
    return <div>Loading...</div>;
  }

  // Default value for applied
  let applied = false;

  // Ensure Job.applications is an array before accessing it
  if (Array.isArray(Job.applications)) {
    applied = Job.applications.includes(id);
  }
  const date = new Date(Job.createdAt);


const handleApplyJob = async()=>{
  try {
    const res = await axios.post(`${ APPLICATION_API_END_POINT}/apply/${id}`,{}, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (res && res.data) {
      dispatch(setAllApplications.push(res.data.newApplication))
      toast.success(res.data.message )
      
      // dispatch(setJob(res.data.job));
    }
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message )
  }
}

  return (
    <div className="job_Description_container">
      <div className="job_Description_container_Top">
        <div className="Top_Heading">
          <h1>{Job.title}</h1>
          <div className="top_details">
            <span>{Job.salary} LPA</span>
            <span>{Job.jobType}</span>
            <span>{Job.position} Openings</span>
          </div>
        </div>
        <button
          disabled={applied}
          className="top_btn"
          onClick={handleApplyJob}
        >
          {applied ? "Applied" : "Apply"}
        </button>
      </div>
      <h1 className="job-desc-title">Job Description</h1>
      <div>
        <h1 className="job-desc-value">
          Role: <span>{Job.title}</span>
        </h1>
        <h1 className="job-desc-value">
          Location: <span>{Job.location}</span>
        </h1>
        <h1 className="job-desc-value">
          Description: <span>{Job.description}</span>
        </h1>
        <h1 className="job-desc-value">
          Experience: <span>{Job.experienceLevel} years</span>
        </h1>
        <h1 className="job-desc-value">
          Salary: <span>{Job.salary} LPA</span>
        </h1>
        <h1 className="job-desc-value">
          Total Applicants: <span>{Job.applications?.length || 0}</span>
        </h1>
        <h1 className="job-desc-value">
          Posted Date: <span>{date.toLocaleDateString()}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
