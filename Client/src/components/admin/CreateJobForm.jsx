import { useState } from "react";
// import axios from 'axios';
import "../styles/CreateJobForm.css";

const CreateJobForm = () => {
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
    
    // try {
    //   const response = await axios.post('/api/jobs', jobData); // Change this to your actual API endpoint
    //   console.log('Job created successfully:', response.data);
    //   // Optionally, reset the form or redirect after successful creation
    // } catch (error) {
    //   console.error('There was an error creating the job!', error);
    // }
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
          type='text'
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
        <select name='jobType' id="jobType"
        onChange={handleChange}
        >
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
