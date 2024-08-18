import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { setLoading, setUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../constant/constants";



const SignIn = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    role:""
  });
  const { loading } = user;
  const changeInputHandler = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/signIn`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        localStorage.setItem("token",res.data.token);
        dispatch(setUser(res.data.user))
        toast.success("loggedIn successfuly");
        navigate("/");
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="auth_body">
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmitHandler}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={changeInputHandler}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={data.password}
            onChange={changeInputHandler}
            required
          />
        </div>
        <div className="role-options">
            <label>Select your Role:</label>
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={data.role === "student"}
                onChange={changeInputHandler}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={data.role === "recruiter"}
                onChange={changeInputHandler}
              />
              Recruiter
            </label>
          </div><br/>
        {loading ? <p>loading...</p> : <button type="submit">Sign In</button>}
        <br />
        <span>
         Do not have Account? <Link to="/signup">Sign Up Here</Link>
        </span>
      </form>
    </div>
    </div>
  );
};

export default SignIn;
