import { IoEllipsisVerticalSharp } from "react-icons/io5";
// eslint-disable-next-line react/prop-types
import { useState } from "react";
const CompaniesTable = ({ companies }) => {
  const [showMenu, setShowMenu] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleShowMenu = (companyId) => {
    if (showMenu === companyId) {
      setShowMenu(null);
      setSelectedCompany(null);
    } else {
      setShowMenu(companyId);
      setSelectedCompany(companyId);
    }
  };

  return (
    <table className="companies-table">
      <thead>
        <tr>
          <th>Company Logo</th>
          <th>Company Name</th>
          <th>Industry</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company.id}>
            <td>{company.name}</td>
            <td>{company.industry}</td>
            <td>{company.location}</td>
            <td>
              <div
                className="action-dots"
                onClick={() => handleShowMenu(company.id)}
              >
                <IoEllipsisVerticalSharp />
                {showMenu === company.id && (
                  <div className="popup-menu">
                    <button>
                     Edit
                    </button>
                    <button>
                    Delete
                    </button>
                  </div>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompaniesTable;
