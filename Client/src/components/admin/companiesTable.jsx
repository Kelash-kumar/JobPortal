import { IoEllipsisHorizontalOutline } from "react-icons/io5";// eslint-disable-next-line react/prop-types
import { useState } from "react";
import { TiEdit } from "react-icons/ti";import { RiDeleteBin6Line } from "react-icons/ri";


const CompaniesTable = ({ companies }) => {
  const [showMenu, setShowMenu] = useState(null);

  const handleShowMenu = (companyId) => {
    if (showMenu === companyId) {
      setShowMenu(null);
    } else {
      setShowMenu(companyId);
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
            <td>LOGO</td>
            <td>{company.name}</td>
            <td>{company.industry}</td>
            <td>{company.location}</td>
            <td>
              <div
                className="action-dots"
                onClick={() => handleShowMenu(company.id)}
              >
                <IoEllipsisHorizontalOutline />
                {showMenu === company.id && (
                  <div className="popup-menu">
                    <ul className="popup-menu_edits_actions">
                      <li><span className="icon"><TiEdit/></span>Edit</li>
                      <li><span className="icon"><RiDeleteBin6Line/></span>Delete</li>
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

export default CompaniesTable;
