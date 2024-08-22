import axios from "axios";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { APPLICATION_API_END_POINT } from "../../constant/constants";
// import { setAllApplications } from "../../redux/applicationSlice";

const getAllApplications = () => {
//   const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const getAllApplications = async () => {
      try {
        const res = axios.get(`${APPLICATION_API_END_POINT}/all`,{
            headers:{
                "Content-Type":'application/json',
                Authorization:`Bearer ${token}`
            }
        });
        if(res.data){
            console.log(res.data);
        }
            
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllApplications();
  }, []);
};

export default getAllApplications;
