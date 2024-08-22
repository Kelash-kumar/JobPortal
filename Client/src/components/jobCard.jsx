import { CiBookmark } from "react-icons/ci";
import {useNavigate} from 'react-router-dom'
// its css is in featuresJob.css

const jobCard = ({ job }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  function jobPostedTimeCalculate(mongodbTime) {
    const createdAt = new Date(mongodbTime);  
    const currentTime = new Date();
    const TimeDifference = currentTime-createdAt;

    const postedDuration= Math.floor(TimeDifference/(1000*24*60*60));
    if(postedDuration===0)return 'Today';
    if(postedDuration===1){
      return `${postedDuration} day`
    }
    if(postedDuration>1){
      return `${postedDuration} days`
    }
 }
  return (
    <div className="job-card">
      <span className="posted">
        {
          jobPostedTimeCalculate(job?.createdAt)
        }
      </span>
      <span className="save">
        <CiBookmark />
      </span>
      <div className="job_compnay">
        {/* <img src={job.logo} alt="logo" /> */}
        <h4>{job?.company?.name}</h4>
      </div>
      <p>{job?.location}</p>
      <h3>{job?.title}</h3>
      <p>{job?.description}</p>
      <div className="job_categories">
        <span className="job_position">{`${job?.position} postion`}</span>
        <span className="job_type">{job?.jobType}</span>
        <span className="job_salary">{`${job?.salary} LPA`}</span>
      </div>
      <br />
      <button
      onClick={()=>navigate(`/${job._id ?? ''}`)}
      >Details</button>
    </div>
  );
};

export default jobCard;
