import "../styles/companies.css";
import CompaniesTable from "./companiesTable";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCompanies from "../hooks/useCompanies";
import { useSelector, useDispatch } from "react-redux";
import { updateCompanyDetails } from "../../redux/companiesSlice";


const Companies = () => {
  const navigate = useNavigate();
  const dispactch = useDispatch();

  const companies = useCompanies();
  const handleDelete = (id) =>{
   const deletedCompany=companies.find((company) =>company._id===id)
          dispactch(updateCompanyDetails(deletedCompany))
  }
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
            onClick={() =>{
                  navigate('/admin/companies/register')
            }}
          className="add-button"
        >
          Add Company
        </button> 
      </div>
      <CompaniesTable
        companies={companies}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Companies;
