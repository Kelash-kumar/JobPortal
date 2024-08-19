import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { USER_API_END_POINT } from "../constant/constants";
import axios from "axios";
import {setUser} from '../redux/authSlice'
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      if (res.data) {
        dispatch(setUser(null));
        toast.success("Logout successfully");
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
            <Link className="nav-list-elements_link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-list-elements_link" to="/jobs">
              jobs
            </Link>
          </li>
          <li>
            <Link className="nav-list-elements_link" to="/browse">
              browse
            </Link>
          </li>
        </ul>
      </div>
      {user ? (
        <div className="nav-profile-popup">
          <div className="avtar">
            <img
              src={user?.profile?.profilePhoto || "/src/assets/avtar.jpg"}
              alt="user-profile"
            />
          </div>
          <div className="nav-profile-popup-details">
            <div className="user_info_container">
              <div className="avtar">
                <img
                  src={user?.profile?.profilePhoto || "/src/assets/avtar.jpg"}
                  alt="user-profile"
                />
              </div>
              <div className="user_details">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="option">
              <div className="option_inner">
                <i>
                  <FaUser />
                </i>
                <a className="option_profile_btn">
                  <Link to={"/user/profile"}>view profile</Link>
                </a>
              </div>
              {/* <div className="option_inner">
                <i>
                  <FaEdit />
                </i>
                <a className="option_profile_btn">
                  <Link to={'/user/profile/update'}>
                  Edit profile
                  </Link>
                  </a>
              </div> */}
              <div className="option_inner">
                <i>
                  <FaSignOutAlt />
                </i>
                <a>
                  <Link to="/logout" onClick={handleLogout}>
                    Logout
                  </Link>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="login_register_option">
          <div>
            <button onClick={() => navigate("/signin")}>Login</button>
            <button
              onClick={() => navigate("/signup")}
              style={{ backgroundColor: "#ffc107" }}
            >
              SignUp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
