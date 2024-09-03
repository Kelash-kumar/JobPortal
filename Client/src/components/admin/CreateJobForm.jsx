import { useState } from "react";
import axios from "axios";
import "../styles/CreateJobForm.css";
import { JOBS_API_END_POINT } from "../../constant/constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateJobForm = () => {

  const navigate = useNavigate();

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "",
    position: "",
    experienceLevel: "",
  });

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(`${JOBS_API_END_POINT}`, jobData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      

      console.log(res.data.job);
      if (res.data && res.data.job) {
        toast.success("Job has Posted .");
        // dispatch(setAdminJobs(res.data.jobs));
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast(error.response.data.message);
      console.error(
        "There was an error creating the job!",
        error.response.data.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={jobData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={jobData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div>
        <label>Requirements:</label>

        <div>
          <input
            type="text"
            name="requirements"
            value={jobData.requirements}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={jobData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Salary:</label>
        <input
          type="number"
          name="salary"
          value={jobData.salary}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Job Type:</label>
        <select name="jobType" id="jobType" onChange={handleChange}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Remote">On-Site</option>
          <option value="Hybird">Hybird</option>
        </select>
      </div>

      <div>
        <label>Position:</label>
        <input
          type="number"
          name="position"
          value={jobData.position}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Experience Level:</label>
        <input
          type="number"
          name="experienceLevel"
          value={jobData.experienceLevel}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Create Job</button>
    </form>
  );
};

export default CreateJobForm;
