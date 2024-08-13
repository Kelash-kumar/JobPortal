import "./styles/Profile.css";

const Profile = () => {
  return (
    <div className="profile_section">
      <div className="user_info_side_bar">
        <img
          src="\src\assets\avtar.jpg"
          alt="user-avatar"
          className="user-avatar"
        />
        <div className="user_name">
          <span>John Doe</span>
          <span>@johndoe</span>
        </div>
        <p className="user-bio">
          Passionate developer with a love for building web applications and
          exploring new technologies.
        </p>
        <div className="skills">
          <h4>Skills</h4>
          <ul className="ul">
            <li>React</li>
            <li>Node.js</li>
            <li>JavaScript</li>
            <li>CSS</li>
            <li>HTML</li>
          </ul>
        </div>
        <div className="hobbies">
          <h4>Hobbies</h4>
          <ul className="ul">
            <li>Coding</li>
            <li>Music</li>
            <li>Traveling</li>
            <li>Gaming</li>
          </ul>
        </div>
      </div>

      <div className="user-details">
        <div className="basic_info_container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Basic Info</h3>
          </div>

          <div className="basic_details">
            <div className="info-item">
              <strong>Full Name:</strong>
              <span>John Doe</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong>
              <span>johndoe@example.com</span>
            </div>
            <div className="info-item">
              <strong>Location:</strong>
              <span>San Francisco, CA</span>
            </div>
            <div className="info-item">
              <strong>Phone:</strong>
              <span>(123) 456-7890</span>
            </div>
            <div className="info-item">
              <strong>Education:</strong>
              <span>Bachelor of Science in Computer Science</span>
            </div>
            <div className="info-item">
              <strong>Website:</strong>
              <span>
                <a href="https://johndoe.com">johndoe.com</a>
              </span>
            </div>
          </div>
        </div>

        <div className="experience">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Experience</h3>
          </div>
          <ul>
            <li>
              <i>icon</i>
              <strong>Frontend Developer</strong> at XYZ Corp (2018-2020)
            </li>
            <li>
              <i>icon</i>
              <strong>Backend Developer</strong> at ABC Inc (2020-2023)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
