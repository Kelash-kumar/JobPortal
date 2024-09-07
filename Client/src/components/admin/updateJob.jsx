import "../styles/updatedJob.css";
import { useState } from "react";
import axios from "axios";
import { JOBS_API_END_POINT } from "../../constant/constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";

const updateJob = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
  const JobId = params.id;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const adminJobs = useSelector((state) => state.jobs.adminJobs);
  const update_Job = adminJobs.find((job) => job._id === JobId);
  const experienceLevel = Array.from({ length: 8 }, (_, i) => i);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [jobUpdatedData, setJobUpdatedData] = useState({
    title: update_Job.title,
    description: update_Job.description,
    requirements: update_Job.requirements,
    location: update_Job.location,
    salary: update_Job.salary,
    jobType: update_Job.jobType,
    position: update_Job.position,
    experienceLevel: update_Job.experienceLevel,
});

experienceLevel.unshift(jobUpdatedData.experienceLevel)
console.log(jobUpdatedData.experienceLevel);

const handleChange = (e) => {
    
    setJobUpdatedData({
      ...jobUpdatedData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit = async (e) => {
      e.preventDefault();
    //   const token = localStorage.getItem("token");
         toast.success("can not update write now ");
         setTimeout(() => {
             navigate('/admin/jobs')
            
         }, 2000);       
    //   try {
    //     const res = await axios.post(`${JOBS_API_END_POINT}`, jobUpdatedData, {
    //       headers: { Authorization: `Bearer ${token}` },
    //       withCredentials: true,
    //     });

    //     console.log(res.data.job);
    //     if (res.data && res.data.job) {
    //       toast.success("Job has Posted .");
    //       // dispatch(setAdminJobs(res.data.jobs));
    //       navigate("/admin/jobs");
    //     }
    //   } catch (error) {
    //     toast(error.response.data.message);
    //     console.error(
    //       "There was an error creating the job!",
    //       error.response.data.message
    //     );
    //   }
    };

  return (
    <div>
      <h1>Update Details:</h1>
      <form onSubmit={handleSubmit} className="job-Form">
        <div className="job-Form-inputs">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={jobUpdatedData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="job-Form-inputs">
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={jobUpdatedData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="job-Form-inputs">
          <label>Requirements:</label>

          <div className="job-Form-inputs">
            <textarea
              type="text"
              name="requirements"
              value={jobUpdatedData.requirements}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="job-Form-inputs">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={jobUpdatedData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="job-Form-inputs">
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={jobUpdatedData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="job-Form-inputs">
          <label>Job Type:</label>
          <select name="jobType" id="jobType" onChange={handleChange}>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Remote">On-Site</option>
            <option value="Hybird">Hybird</option>
          </select>
        </div>

        <div className="job-Form-inputs">
          <label>Position:</label>
          <input
            type="number"
            name="position"
            value={jobUpdatedData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="job-Form-inputs">
          <label>Experience Level:</label>
          <select name="experienceLevel"  onChange={handleChange}>
            {experienceLevel.map((year) => (
              <option key={year} value={year} >
              {Number(year)}
              </option>
            ))}

            {/* <option value={8}>above 7+</option> */}
          </select>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default updateJob;
