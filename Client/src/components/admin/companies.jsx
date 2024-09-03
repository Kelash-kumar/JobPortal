import "../styles/companies.css";
import CompaniesTable from "./companiesTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCompanies from "../hooks/useCompanies";
import axios from "axios";
import { toast } from "react-hot-toast";
import { COMPANIES_API_END_POINT } from "../../constant/constants";
import { SetseacrchFilteredCompanyText } from "../../redux/companiesSlice";
import { useDispatch } from "react-redux";

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allcompanies = useCompanies();
  const [companies, setCompanies] = useState([...allcompanies]);
  const [filterInput, setFilterInput] = useState("");
  
  useEffect(() => {
    dispatch(SetseacrchFilteredCompanyText(filterInput));
  }, [dispatch, filterInput]);

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
        setCompanies(companies.filter((company) => company._id !== id));
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
          placeholder="Search Compnay by Name"
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
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
