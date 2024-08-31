import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompanies } from "../../redux/companiesSlice";
import { COMPANIES_API_END_POINT } from "../../constant/constants";

const useCompanies = () => {
  const dispatch = useDispatch();
  const {companies} = useSelector((state) => state.companies);
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(COMPANIES_API_END_POINT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        if (res) {
          // console.log(res.data.companies)
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Failed to fetch companies:", error.message);
      }
    };

    
    fetchCompanies();
  }, [companies.length, dispatch, token]);

  return companies;
};

export default useCompanies;
