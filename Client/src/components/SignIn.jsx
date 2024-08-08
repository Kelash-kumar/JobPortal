import { Link } from "react-router-dom";
import { useState } from "react";
const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeInputHandler = (e) => {
    return setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmitHandler = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
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
        <button type="submit">Sign In</button>
        <br />
        <span>
          Already Have an Account? <Link to="/login">SignIn Here</Link>
        </span>
      </form>
    </div>
  );
};

export default SignIn;
