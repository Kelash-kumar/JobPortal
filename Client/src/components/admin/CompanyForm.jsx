// src/CompanyForm.js
import { useState } from "react";
import axios from "axios"; // You can use fetch if you prefer
import { COMPANIES_API_END_POINT } from "../../constant/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateCompany } from "../../redux/companiesSlice";

const CompanyForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const companyId = params.id;
  const { updatedCompany } = useSelector((state) => state.companies);
  // const {allCompanies} = useSelector(state => state.companies);
  const dispactch = useDispatch();
  const [data, setdata] = useState({
    name: updatedCompany?.name || "",
    description: updatedCompany?.description || "",
    website: updatedCompany?.website || "",
    location: updatedCompany?.location || "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setdata({ ...data, logo: file });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      for (const key in data) {
        formData.append(key, data[key]);
      }
      console.log(formData)
      const res = await axios.put(
        `${COMPANIES_API_END_POINT}/${companyId}`,

        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data && res.data.company) {
        console.log(res.data);
        dispactch(setUpdateCompany(res.data.company))
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="company-form">
      <span className="form-back" onClick={() => navigate("/admin/companies")}>
        <FaArrowLeft />{" "}
      </span>
      <h3>Update Details</h3>
      <div className="form-group">
        <label htmlFor="name">Company Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
          rows="4"
          cols="80"
        />
      </div>
      <div className="form-group">
        <label htmlFor="website">Website:</label>
        <input
          type="url"
          id="website"
          name="website"
          value={data.website}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={data.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Logo:</label>
        <input
          type="file"
          accept="image/*"
          name="logo"
          onChange={handleLogoChange}
        />
      </div>
      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/admin/companies")}
        >
          cancel
        </button>
        <button type="submit" className="save-button">
          update
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;
