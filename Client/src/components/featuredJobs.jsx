import "./styles/featuredJobs.css";
import JobCard from "./jobCard";




// eslint-disable-next-line react/prop-types
const FeaturedJobs = ({jobs}) => {

  // const jobs = [
  //   {
  //     title: "Frontend Developer",
  //     company: "Tech Corp",
  //     description:
  //       "This phrase can also mean being right up against the line between two different things. If your short story toes the line between fantasy and science fiction",
  //     location: "New York, NY",
  //     type: "Full-time",
  //     position: "2",
  //     salary: "20",
  //     logo: "data:image/png;base64,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",
  //   },
  //   {
  //     title: "Backend Developer",
  //     description:
  //       "This phrase can also mean being right up against the line between two different things. If your short story toes the line between fantasy and science fiction",
  //     company: "Innovatech",
  //     location: "San Francisco, CA",
  //     type: "Remote",
  //     position: "2",
  //     salary: "20",
  //     logo: "data:image/png;base64,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",
  //   },
  //   {
  //     title: "UI/UX Designer",
  //     description:
  //       "This phrase can also mean being right up against the line between two different things. If your short story toes the line between fantasy and science fiction",
  //     company: "Creative Labs",
  //     location: "Austin, TX",
  //     type: "Part-time",
  //     position: "2",
  //     salary: "20",
  //     logo: "data:image/png;base64,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",
  //   },
  // ];
  return (
    <div className="featured-container">
      <h2 className="featured-title">Latest and Top Jobs Opening</h2>
      <div className="featured-jobs ">
      {
      // eslint-disable-next-line react/prop-types
     jobs.length >0 && jobs.slice(0,6).map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
        </div>;
    </div>
  );
};
export default FeaturedJobs;
