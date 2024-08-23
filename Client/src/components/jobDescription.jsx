import { useParams } from "react-router-dom";
import "./styles/jobDescription.css";
import { useSelector, useDispatch } from "react-redux";
import { setJob } from "../redux/jobSlice";
import {
  JOBS_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "../constant/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

const JobDescription = () => {
  const { id } = useParams();
  const { Job } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const isInitiallyApplied = Job?.applications?.some(
    (application) => application.applicant === user?._id || false
  );

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const date = new Date(Job.createdAt);

  const handleApplyJob = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res && res.data) {
        setIsApplied(true);
        const updatedJob = {
          ...Job,
          applications: [
            ...Job.applications,
            { applicant: user._id }
          ]
        };
        dispatch(setJob(updatedJob))
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message);
    }
  };

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
          setIsApplied(res.data.job.applications.some(
            (application) => application.applicant === user?._id || false
          ));
        }
      } catch (error) {
        console.log(error.response?.data?.message);
      }
    };
    getSingleJob();
  }, [id, dispatch, user._id]);

  if (!Job) {
    return <div>Loading...</div>;
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
      </div>
        <button
          disabled={isApplied}
          className="top_btn"
          onClick={handleApplyJob}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
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
          Total Applicants: <span>{Job?.applications?.length || 0}</span>
        </h1>
        <h1 className="job-desc-value">
          Posted Date: <span>{date.toLocaleDateString()}</span>
        </h1>
        <h1 className="job-desc-value">
          Requirements:
        </h1>
        <ul className="job-requirements-list">
        {Job.requirements.map((row, rowIndex) => (
          <li key={rowIndex} className="job-requirement-row">
            {row.map((requirement, colIndex) => (
              <div key={colIndex} className="job-requirement-item">
                <span className="job-requirement-icon">✓</span>
                <span className="job-requirement-text">{requirement}</span>
              </div>
            ))}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default JobDescription;
