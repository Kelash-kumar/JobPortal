import "../styles/companies.css";
import CompaniesTable from "./companiesTable";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCompanies from "../hooks/useCompanies";

const Companies = () => {
  const navigate = useNavigate();
  const companies = useCompanies();
 
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
      />
    </div>
  );
};

export default Companies;
