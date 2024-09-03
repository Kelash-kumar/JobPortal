import "../styles/adminJob.css";
import JobListingTable from "./adminJobsTable";
import { useNavigate } from "react-router-dom";
import useAdminJobs from "../hooks/useAdminJobs";

const Jobs = () => {
  const navigate = useNavigate();
  const allAdminJobs = useAdminJobs();

  return (
    <div className="Jobs-container">
      <h2 className="Jobs-title">Manage All your posted jobs</h2>
      <div className="Jobs-actions">
        <input
          type="text"
          placeholder="Search job  by Name"
          value={""}
          onChange={() => "hell0"}
          className="jobs-filter-input"
        />
        <button
          onClick={() => {
            navigate("/admin/Jobs/register");
          }}
          className="add-job-button"
        >
          create Job
        </button>
      </div>
     <JobListingTable
     jobs={allAdminJobs}
     />
    </div>
  );
};

export default Jobs;
