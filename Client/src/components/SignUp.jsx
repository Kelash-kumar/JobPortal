// import './Auth.css';
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    profile: "",
  });

  const changeInputHandler = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value });
  };

  const changeProfileHandler = (e) =>{
    return setData({ ...data, profile: e.target.profile?.[0] });

  }

  const handleSubmitHandler = (e) => {
    e.preventDefault();
    console.log(data);
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
          <label>Phone</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            value={data.phone}
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
            <label>Select your Role? :</label>
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={data.role === "student"}
                onChange={changeInputHandler}
              />
              student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={data.role === "recruiter"}
                onChange={changeInputHandler}
              />
              recruiter
            </label>
          </div>
          <div className="user-profile">
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={changeProfileHandler}
              />
              profile
            </label>
          </div>
        </div>
        <button type="submit" >
          Sign Up
        </button>
        <span>
          Already Have an Account? <Link to="/login">SignIn Here</Link>
        </span>
      </form>
    </div>
  );
};

export default SignUp;
