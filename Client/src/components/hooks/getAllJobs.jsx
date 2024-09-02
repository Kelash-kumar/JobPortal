import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOBS_API_END_POINT } from "../../constant/constants";
import { setAllJobs } from "../../redux/jobSlice";

const getAllJobs = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/all-jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if(res.data){
         
          dispatch(setAllJobs(res.data.jobs));
        

        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchJobs();
  }, []);
};
export default getAllJobs;
