import "../styles/companies.css";
import CompaniesTable from "./companiesTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCompanies from "../hooks/useCompanies";
import axios from "axios";
import { COMPANIES_API_END_POINT } from "../../constant/constants";
import { toast } from "react-hot-toast";


const Companies = () => {
  const navigate = useNavigate();
  
  
  const allcompanies = useCompanies();
  const [companies,setCompanies]=useState([...allcompanies]);
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`${COMPANIES_API_END_POINT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (res) {
        toast.success("deleted");
       setCompanies(companies.filter((company)=>company._id!==id));
      }
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="companies-container">
      <h2 className="companies-title">Manage Companies</h2>
      <div className="companies-actions">
        <input
          type="text"
          placeholder="Filter Companies"
          //   value={filterText}
          //   onChange={handleFilterChange}
          className="filter-input"
        />
        <button
          onClick={() => {
            navigate("/admin/companies/register");
          }}
          className="add-button"
        >
          Add Company
        </button>
      </div>
      <CompaniesTable companies={companies} onDelete={handleDelete} />
    </div>
  );
};

export default Companies;
