import "./styles/Profile.css";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import AppliedJobTable from "./AppliedJobTable";

const Profile = () => {
  const skills = ["HTML", "CSS", "JS", "REACTJS"];

  const appliedJobs = [
    {
      date: '2024-08-01',
      role: 'Frontend Developer',
      company: 'Tech Innovators',
      status: 'Applied'
    },
    {
      date: '2024-07-25',
      role: 'Backend Developer',
      company: 'Code Solutions',
      status: 'Review'
    },
    {
      date: '2024-07-18',
      role: 'Full Stack Developer',
      company: 'Web Experts',
      status: 'Rejected'
    },
    {
      date: '2024-07-10',
      role: 'UI/UX Designer',
      company: 'Creative Minds',
      status: 'Offered'
    }
  ];



  return (
    <>
      <div className="profile-section">
        <div className="profile-container">
          <img
            src="\src\assets\avtar.jpg"
            alt="avatar"
            className="profile-avatar"
          />
          <div className="profile-intro">
            <span className="profile-name">John Doe</span>
            <p className="profile-bio">
              Software Engineer at XYZ Company. Passionate about coding and
              coffee.
            </p>
          </div>
          <i className="profile-icon">
            <FaUserEdit />
          </i>
        </div>

        {/* User More Details */}
        <div className="profile-user-details">
          <i>
            <MdOutlineAlternateEmail />
          </i>
          <p>email</p>
        </div>
        <div className="profile-user-details">
          <i>
            <FaPhone />
          </i>
          <p>+92 36734837</p>
        </div>
        <div className="skills">
          <h4>skills </h4>
          {skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
        <div className="resume">
          <h4>Resume</h4>
          <a href="#">resume</a>
        </div>
        {/* Experience Table Component can go here */}
      </div>
      {/* Applied Jobs */}
      <AppliedJobTable
      jobs={appliedJobs}
      />
    </>
  );
};

export default Profile;
