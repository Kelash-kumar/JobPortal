// src/CompanyForm.js
import { useState } from "react";
import axios from "axios"; // You can use fetch if you prefer
import { COMPANIES_API_END_POINT } from "../../constant/constants";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCompanyDetails } from "../../redux/companiesSlice";

const CompanyForm = () => {
  const navigate = useNavigate();
  const dispactch = useDispatch();
  const params = useParams();

  const companyId = params.id;//getting selected company Id
  const Company = useSelector((state) =>state.companies.companies.find((compnay)=>compnay._id===companyId));
  
  const [companyDetails, setCompanyDetails] = useState({
    name: Company?.name || "",
    description: Company?.description || "",
    website: Company?.website || "",
    location: Company?.location || "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setCompanyDetails({ ...companyDetails, logo: file });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");

      for (const key in companyDetails) {
        formData.append(key, companyDetails[key]);
      }

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
        dispactch(updateCompanyDetails(companyId,res.data?.company));
        navigate("/admin/companies")
      }
    } catch (error) {
      console.log(error.message);
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
          value={companyDetails.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={companyDetails.description}
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
          value={companyDetails.website}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={companyDetails.location}
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
