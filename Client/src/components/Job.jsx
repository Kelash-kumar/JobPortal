import JobCard from "./jobCard";
import "./styles/job.css";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((state) => state.jobs);
  return (
    <div className="jobs_section">
      <div className="jobs_filter">
        <FilterCard />
      </div>
      <div className="jobs_container">
        {allJobs.length <= 0 ? (
          <span>Jobs not Found.</span>
        ) : (
          allJobs.map((job, index) => <JobCard key={index} job={job} />)
        )}
      </div>
    </div>
  );
};

export default Jobs;

//  style={{
//   display: "flex",
//   justifyContent: "space-around",
//   flexWrap: "wrap",
//   alignItems: "center",
// }}
