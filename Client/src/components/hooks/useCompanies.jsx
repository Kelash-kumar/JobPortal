import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompanies } from "../../redux/companiesSlice";
import { COMPANIES_API_END_POINT } from "../../constant/constants";

const useCompanies = () => {
  const dispatch = useDispatch();
  const allCompanies = useSelector((state) => state.companies.allCompanies);
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
          console.log(res.data.companies)
          dispatch(setAllCompanies(res.data.companies));
        }
      } catch (error) {
        console.log("Failed to fetch companies:", error.message);
      }
    };

    
    fetchCompanies();
  }, [allCompanies.length, dispatch, token]);

  return allCompanies;
};

export default useCompanies;
