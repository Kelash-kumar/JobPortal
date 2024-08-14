import { useState } from "react";
import "./styles/updateProfile.css";
import axios from "axios";
import {USER_API_END_POINT} from "../constant/constants";
import { toast } from "react-hot-toast";



const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    phoneNumber: "",
    bio: "",
    skills: [],
    resume: null,
    resumeOriginalName: "",
    profilePhoto: "",
    experience: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProfile({
      ...profile,
      [name]: files[0],
      resumeOriginalName: files[0]?.name || "",
    });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperience = [...profile.experience];
    updatedExperience[index][name] = value;
    setProfile({
      ...profile,
      experience: updatedExperience,
    });
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [
        ...profile.experience,
        { title: "", company: "", duration: "" },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in profile) {
      if (key === "experience") {
        formData.append(key, JSON.stringify(profile[key]));
      } else {
        formData.append(key, profile[key]);
      }
    }

    // Send form data to API
    axios
      .put(`${USER_API_END_POINT}/profile/update`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
       toast.error(err.message);
      });
  };

  
  return (
    <div className="user-profile-container">
      <h2>Update Profile</h2>
      <form className="user-profile-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        {/* <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div> */}
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={profile.bio}
            maxLength={130}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={profile.skills}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Resume:</label>
          <input type="file" name="resume" onChange={handleFileChange} />
          {profile.resumeOriginalName && (
            <p className="file-upload-info">{profile.resumeOriginalName}</p>
          )}
        </div>
        <div>
          <label>Profile Photo:</label>
          <input type="file" name="profilePhoto" onChange={handleFileChange} />
        </div>
        <div className="user-profile-experience">
          <label>Experience:</label>
          {profile.experience.map((exp, index) => (
            <div key={index}>
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={exp.title}
                onChange={(e) => handleExperienceChange(index, e)}
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, e)}
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, e)}
              />
            </div>
          ))}
          <button
            type="button"
            className="add-experience-button"
            onClick={addExperience}
          >
            Add Experience
          </button>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
