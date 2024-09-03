import { TiEdit } from "react-icons/ti";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobListingTable = ({ jobs }) => {
  const navigate = useNavigate();
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
                <td>{job.title}</td>
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
                          <li
                            onClick={() =>
                              navigate(`/admin/job/${job._id}`)
                            }
                          >
                            <span className="jobs-action-icon">
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
