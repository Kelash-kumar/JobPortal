/* eslint-disable react/prop-types */
import { IoEllipsisHorizontalOutline } from "react-icons/io5"; // eslint-disable-next-line react/prop-types
import { useState } from "react";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {setUpdateCompany} from '../../redux/companiesSlice'
import { useDispatch} from "react-redux";



// eslint-disable-next-line react/prop-types
const CompaniesTable = ({ companies }) => {

const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(null);
  const nagivate = useNavigate();
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
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {companies.length!=0?
        companies.map((company) => (
          <tr key={company._id}>
            <td>logo</td>
            <td>{company?.name}</td>
            <td>{company?.location ? company?.location : "N/A"}</td>
            <td>
              <div
                className="action-dots"
                onClick={() => handleShowMenu(company._id)}
              >
                <IoEllipsisHorizontalOutline />
                {showMenu === company._id && (
                  <div className="popup-menu">
                    <ul className="popup-menu_edits_actions">
                      <li
                        onClick={() =>{
                           dispatch(setUpdateCompany(company))
                          return nagivate(`/admin/companies/${company._id}`)
                        }
                        }
                      >
                        <span className="icon">
                          <TiEdit />
                        </span>
                        Edit
                      </li>
                      <li>
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
        )):<div>Loading</div>}
      </tbody>
    </table>
  );
};

export default CompaniesTable;
