/* eslint-disable react/prop-types */

import './styles/AppliedJobTable.css';

// eslint-disable-next-line react/prop-types
const AppliedJobs = ({ jobApplication }) => {
  // console.log("==\n"+jobApplication)
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
          {jobApplication.map((jobApplication, index) => (
            <tr key={index} >
              <td>{jobApplication.createAt}</td>
              <td>{jobApplication?.job?.title}</td>
              <td>{jobApplication?.job?.company?.name}</td>
              <td className={`status ${jobApplication.status.toLowerCase()}`}>{jobApplication.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobs;
