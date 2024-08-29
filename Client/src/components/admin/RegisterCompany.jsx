import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { COMPANIES_API_END_POINT } from "../../constant/constants";
const RegisterCompany = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${COMPANIES_API_END_POINT}/register`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res.data) {
        toast.success("Company registered successfully");
        navigate("/admin/companies/update")
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="create-company-form-container">
      <form onSubmit={handleRegister} className="create-company-form">
        <h1>Your company Name</h1>
        <p>You can change this name after any time.</p>
        <input
          type="text"
          name="name"
          placeholder="Company Name Goes Here..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="form-buttons">
          <button onClick={() => navigate("/admin/companies")}>cancle</button>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCompany;
