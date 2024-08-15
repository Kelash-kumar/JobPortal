/* eslint-disable react/prop-types */

import './styles/AppliedJobTable.css';

// eslint-disable-next-line react/prop-types
const AppliedJobs = ({ jobs }) => {
  return (
    <div className="applied-jobs-section">
      <h3 className="applied-jobs-title">Applied Jobs</h3>
      <table className="applied-jobs-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Job Role</th>
            <th>Company</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={index} >
              <td>{job.date}</td>
              <td>{job.role}</td>
              <td>{job.company}</td>
              <td className={`status ${job.status.toLowerCase()}`}>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobs;
