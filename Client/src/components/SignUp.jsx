import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../constants";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    profile: null,  // Initialize as null
  });

  const changeInputHandler = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value });
  };

  const changeProfileHandler = (e) => {
    return setData({ ...data, profile: e.target.files?.[0] });
  };

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("role", data.role);

    // if (data.profile) {
    //   formData.append("profile", data.profile);
    // }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/signin");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmitHandler}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={data.name}
            onChange={changeInputHandler}
            required
          />
        </div>
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
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            name="phoneNumber"
            value={data.phoneNumber}
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
        <div className="profile-and-role">
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
          </div>
          <div className="user-profile">
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={changeProfileHandler}
              />
              Profile
            </label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <span>
          Already Have an Account? <Link to="/login">Sign In Here</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
