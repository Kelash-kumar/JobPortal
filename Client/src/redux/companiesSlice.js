import { createSlice } from "@reduxjs/toolkit";

const companiesSlice =createSlice({
  name:"companies",
  initialState:{
   companies:[]
  },
  reducers:{
    setAllCompanies:(state,action)=>{
        state.companies=action.payload;
    },
    addCompany:(state,action)=>{
      state.companies.push(action.payload);
    },
    updateCompanyDetails:(state,action)=>{
     const {id,details}=action.payload;
     const company=state.companies.find((company) =>company._id===id);
     if(company){
      Object.assign(company,details);
     }
    }
  }
});
export const  {setAllCompanies,addCompany,updateCompanyDetails} = companiesSlice.actions;
export default companiesSlice.reducer;