import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { COMPANIES_API_END_POINT } from "../../constant/constants";
import {setAllCompanies  } from "../../redux/companiesSlice";

const getCompanies = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const   fetchCopmanies = async () => {
      try {
        const res = await axios.get(`${COMPANIES_API_END_POINT}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if(res.data){
         
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error.message);
      }
    };
   fetchCopmanies();
  }, [dispatch, token]);
};
export default getCompanies;
