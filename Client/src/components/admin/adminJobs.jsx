import "../styles/adminJob.css";
import JobListingTable from "./adminJobsTable";
import { useNavigate } from "react-router-dom";
import useAdminJobs from "../hooks/useAdminJobs";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { setJobSearchText } from "../../redux/jobSlice";

const Jobs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allAdminJobs = useAdminJobs();
  const [filteredJobText, setFilteredJobText] = useState("");
  useEffect(() => {
    dispatch(setJobSearchText(filteredJobText));
  }, [dispatch, filteredJobText]);
  return (
    <div className="Jobs-container">
      <h2 className="Jobs-title">Manage All your posted jobs</h2>
      <div className="Jobs-actions">
        <input
          type="text"
          placeholder="Search job  by Name"
          value={filteredJobText}
          onChange={(e) => setFilteredJobText(e.target.value)}
          className="jobs-filter-input"
        />
        <button
          onClick={() => {
            navigate("/admin/Job/create");
          }}
          className="add-job-button"
        >
          create Job
        </button>
      </div>
      <JobListingTable jobs={allAdminJobs} />
    </div>
  );
};

export default Jobs;
