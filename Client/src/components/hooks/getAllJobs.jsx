import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { JOBS_API_END_POINT } from "../../constant/constants";

const getAllJobs = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/alljobs`, {
          withCredentials: true,
        });

        if (res.data) {
          console.log(res.data);
          dispatch({
            setAllJobs: res.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default getAllJobs;
