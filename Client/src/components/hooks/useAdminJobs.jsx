import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { JOBS_API_END_POINT } from "../../constant/constants";
import { setAdminJobs } from "../../redux/jobSlice";

const useAdminJobs = () => {
  const dispatch = useDispatch();

  // Select adminJobs from the Redux store
  const adminJobs = useSelector((state) => state.jobs.adminJobs);

  // Retrieve token from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/admin/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if ( res.data && res.data.jobs) {
          dispatch(setAdminJobs(res.data.jobs));
        } 
      } catch (error) {
          console.error("API Error:", error.message);
      }
    };

    fetchAdminJobs();

  }, [adminJobs?.length,dispatch, token]);

  return adminJobs;
};

export default useAdminJobs;
