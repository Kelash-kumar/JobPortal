import { TiEdit } from "react-icons/ti";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { MdPeopleOutline } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const JobListingTable = ({ jobs }) => {
  const [showMenu, setShowMenu] = useState(null);

  const handleShowMenu = (jobId) => {
    setShowMenu(showMenu === jobId ? null : jobId);
  };
  return (
    <div className="job-table-container">
      <table className="job-table">
        <thead>
          <tr>
            <th>Job Title</th>
            <th>job</th>
            <th>Location</th>
            <th>Date Posted</th>
            {/* <th>Status</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job._id}>
                <td>
                  {/* <Link to={`/admin/job/:${job._id}`}> */}
                  {job.title}
                  {/* </Link> */}
                </td>
                <td>{job.company?.name}</td>
                <td>{job.location}</td>
                <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                {/* <td className={`status ${job.status?.toLowerCase()}`}>{job.status}</td>  */}
                <td>
                  <div
                    className="jobs-action-dot"
                    onClick={() => handleShowMenu(job._id)}
                  >
                    <IoEllipsisHorizontalOutline />
                    {showMenu === job._id && (
                      <div className="job-popup-menu">
                        <ul className="job-popup-menu-actions">
                        <li >
                            <Link to={`/admin/job/${job._id}`} className="icon" style={{
                              color:'black',
                              textDecoration:'none'
                              } }>
                              <span >
                                <TiEdit />
                              </span>
                             <span  style={{paddingLeft:'8px'}}>Edit</span>
                            </Link  >
                          </li>
                          <li >
                            <Link to={`/admin/job/application/applied/${job._id}`} className="icon" style={{
                              color:'black',
                              textDecoration:'none'
                              } }>
                              <span >
                                <MdPeopleOutline />
                              </span>
                             <span  style={{paddingLeft:'8px'}}>Applicants</span>
                            </Link  >
                          </li>
                          {/* <li>
                            <span className="icon">
                              <RiDeleteBin6Line />
                            </span>
                            Delete
                          </li> */}
                          <li >
                            <Link className="icon" style={{
                              color:'black',
                              textDecoration:'none'
                              } }>
                              <span >
                                <MdOutlineDescription />
                              </span>
                             <span  style={{paddingLeft:'8px'}}>More</span>
                            </Link  >
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-jobs">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobListingTable;
