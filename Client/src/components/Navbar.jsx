import { Link,useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";




const Navbar = () => {
  const navigate = useNavigate();
  const user = false;
  return (
    <div className="navbar-container">
      <div className="navbar">
        <h1>
          Job<span>Portal</span>
        </h1>
      </div>
      <div className="nav-list-elements">
        <ul>
          <li>
            <Link className="nav-list-elements_link" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-list-elements_link" to="/jobs">
              Jobs
            </Link>
          </li>
          <li>
            <Link className="nav-list-elements_link" to="/browse" Link>
              Browse
            </Link>
          </li>
        </ul>
      </div>
      {user ? (
        <div className="nav-profile-popup">
          <button>Profile</button>
          <div className="nav-profile-popup-details">
            <div className="user_info_container">
              <div className="avtar">
                <img src="../../public/avtar.jpg" alt="user-profile" />
              </div>
              <div className="user_details">
                <h4>kelash kumar</h4>
                <p>kelash@outlook.com</p>
              </div>
            </div>

            <div className="option">
              <div>
                <i>
                  <FaUser />
                </i>
                <button>view profile</button>
              </div>
              <div>
                <i>
                  <FaSignOutAlt />
                </i>
                <button>logout</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="login_register_option">
          <div>
            <button onClick={()=>navigate('/signin')}>Login</button>
            <button onClick={()=>navigate('/signup')}>SignUp</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
