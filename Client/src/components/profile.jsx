import "./styles/Profile.css";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import AppliedJobTable from "./AppliedJobTable";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../constant/constants";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../redux/authSlice";
const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const appliedJobs = [
    {
      date: "2024-08-01",
      role: "Frontend Developer",
      company: "Tech Innovators",
      status: "Applied",
    },
    {
      date: "2024-07-25",
      role: "Backend Developer",
      company: "Code Solutions",
      status: "Review",
    },
    {
      date: "2024-07-18",
      role: "Full Stack Developer",
      company: "Web Experts",
      status: "Rejected",
    },
    {
      date: "2024-07-10",
      role: "UI/UX Designer",
      company: "Creative Minds",
      status: "Offered",
    },
  ];

  const [editProfile, setEditProfile] = useState(false);
  const [inputData, setInputData] = useState({
    name: user.name,
    phoneNumber: user.phoneNumber,
    bio: user.profile.bio,
    skills: user.profile.skills,
    profilePhoto: null,
    resume: null,
  });

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setInputData({
      ...inputData,
      profilePhoto: file,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputData({
      ...inputData,
      resume: file,
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      for (const key in inputData) {
        formData.append(key, inputData[key]);
      }
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data) {
        dispatch(setUser(res.data.user));
        setEditProfile(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="profile-section">
        <div className="profile-container">
          <img
            src='/src/assets/avtar.jpg'
            alt="avtar"
            className="profile-avatar"
          />
          <div className="profile-intro">
            <span className="profile-name">{user.name}</span>
            <p className="profile-bio">{user.profile.bio}</p>
          </div>
          <i className="profile-icon" onClick={handleEditProfile}>
            <FaUserEdit />
          </i>
        </div>

        {/* User More Details */}
        <div className="profile-user-details">
          <i>
            <MdOutlineAlternateEmail />
          </i>
          <p>{user.email}</p>
        </div>
        <div className="profile-user-details">
          <i>
            <FaPhone />
          </i>
          <p>{user.phoneNumber}</p>
        </div>
        <div className="skills">
          <h4>Skills</h4>
          {user.profile.skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
        <div className="resume">
          <h4>Resume</h4>
           <span>
            {user.profile.resumeOriginalName}
           </span>
        </div>
      </div>
      {/* Applied Jobs */}
      <AppliedJobTable jobs={appliedJobs} />

      {/** Update profile */}
      <div className={`modal ${editProfile ? "show" : ""}`}>
        <div className="modal-content">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={inputData.name}
              placeholder="Name"
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phoneNumber"
              value={inputData.phoneNumber}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Bio:
            <textarea
              name="bio"
              value={inputData.bio}
              maxLength={130}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <label>
            Skills:
            <input
              type="text"
              name="skills"
              value={inputData.skills}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Profile Photo:
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleProfilePhotoChange}
            />
          </label>
          <label>Resume:</label>
          <input
            type="file"
            name="resume"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleEditProfile}>Close</button>
        </div>
      </div>
      <div
        className={`modal-overlay ${editProfile ? "show" : ""}`}
        onClick={handleEditProfile}
      ></div>
    </>
  );
};

export default Profile;
