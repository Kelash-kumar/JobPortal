import { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types
const CompaniesTable = ({ companies, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(null);

  const { seacrchFilteredCompanyText } = useSelector(
    (state) => state.companies
  );

  const [filteredSearchedCompany, setFilteredSearchedCompany] =
    useState(companies);

  const handleShowMenu = (companyId) => {
    setShowMenu(showMenu === companyId ? null : companyId);
  };

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const filteredCompany = companies.filter((company) => {
      if (!seacrchFilteredCompanyText) return true;
      return company?.name
        ?.toLowerCase()
        .includes(seacrchFilteredCompanyText.toLowerCase());
    });
    setFilteredSearchedCompany(filteredCompany);
  }, [companies, seacrchFilteredCompanyText]);

  return (
    <div className="companies-table-container">
      <h1>List Of All Companies</h1>
      {/*  
eslint-disable-next-line react/prop-types
*/}
      {filteredSearchedCompany.length !== 0 ? (
        <div className="companies-card-container">
          {/*  
eslint-disable-next-line react/prop-types
*/}
          {filteredSearchedCompany.map((company) => (
            <div key={company._id} className="company-card">
              <div className="company-card-header">
                <img
                  src={company.logo || "https://via.placeholder.com/150"}
                  alt="Logo"
                  className="company-logo"
                />
                <div
                  className="action-dots"
                  onClick={() => handleShowMenu(company._id)}
                >
                  <IoEllipsisHorizontalOutline />
                  {showMenu === company._id && (
                    <div className="popup-menu">
                      <ul className="popup-menu-actions">
                        <li
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                        >
                          <span className="icon">
                            <TiEdit />
                          </span>
                          Edit
                        </li>
                        <li onClick={() => onDelete(company._id)}>
                          <span className="icon">
                            <RiDeleteBin6Line />
                          </span>
                          Delete
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="company-card-body">
                <h2 className="company-name">{company.name}</h2>
                <p className="company-description">
                  {company.description || "No description available"}
                </p>
                <a
                  href={company.website || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-website"
                >
                  {company.website || "No website available"}
                </a>
                <p className="company-location">
                  {company.location || "Location not provided"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default CompaniesTable;
