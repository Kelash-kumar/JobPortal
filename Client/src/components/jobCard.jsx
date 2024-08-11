import { CiBookmark } from "react-icons/ci";
// its css is in featuresJob.css
const jobCard = ({job}) => {
  return (
   
     
          <div  className="job-card">
            <span className="posted">2 hr ago</span>
            <span className="save">
              <CiBookmark />
            </span>
            <div className="job_compnay">
              <img src={job.logo} alt="logo" />
              <h4>{job.company}</h4>
            </div>
            <p>{job.location}</p>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <div className="job_categories">
              <span className="job_position">{`${job.position} postion`}</span>
              <span className="job_type">{job.type}</span>
              <span className="job_salary">{`${job.salary} LPA`}</span>
            </div>
            <br />
            <button>Details</button>
          </div>
     
  );
};

export default jobCard;
