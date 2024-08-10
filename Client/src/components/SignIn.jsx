import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../constants";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";



const SignIn = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
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
        toast.success("loggedIn successfuly");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      return toast.error(error.message);
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
