import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// eslint-disable-next-line react/prop-types
const AdminJobsTable = ({ companies }) => {
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
    <table className="companies-table">
      <thead>
        <tr>
          <th>Job Type</th>
          <th>Company</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredSearchedCompany.lenght > 0 &&
          filteredSearchedCompany.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.industry}</td>
              <td>{company.location}</td>
              <td>
                <div
                  className="action-dots"
                  onClick={() => handleShowMenu(company.id)}
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
                        <li onClick={() => alert(company._id)}>
                          <span className="icon">
                            <RiDeleteBin6Line />
                          </span>
                          Delete
                        </li>
                      </ul>
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

export default AdminJobsTable;
