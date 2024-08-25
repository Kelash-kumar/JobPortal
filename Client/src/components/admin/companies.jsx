import "../styles/companies.css";
import CompaniesTable from "./companiesTable";
import { useState } from "react";
const Companies = () => {
  const [companies, setCompanies] = useState([
    // Replace with your API data or state management solution
    { id: 1, name: "Company A", industry: "Tech", location: "New York" },
    { id: 2, name: "Company B", industry: "Finance", location: "London" },
    { id: 3, name: "Company C", industry: "Health", location: "San Francisco" },
  ]);

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
          //   onClick={() => setEditingCompany({ name: '', industry: '', location: '' })}
          className="add-button"
        >
          Add Company
        </button>
      </div>
      <CompaniesTable
        companies={companies}
        // onEditClick={handleEditClick}
        // onDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default Companies;
