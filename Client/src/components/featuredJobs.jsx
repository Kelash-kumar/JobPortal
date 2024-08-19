import "./styles/featuredJobs.css";
import JobCard from "./jobCard";
// eslint-disable-next-line react/prop-types
const FeaturedJobs = ({jobs}) => {

  return (
    <div className="featured-container">
      <h2 className="featured-title">Latest and Top Jobs Opening</h2>
      <div className="featured-jobs ">
      {
      // eslint-disable-next-line react/prop-types
     jobs.length >0 && jobs.slice(0,6).map((job) => (
          <JobCard key={job?._id} job={job} />
        ))}
        </div>;
    </div>
  );
};
export default FeaturedJobs;
