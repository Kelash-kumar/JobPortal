import { createSlice } from "@reduxjs/toolkit";

const companiesSlice =createSlice({
  name:"companies",
  initialState:{
    allCompanies:[],
    // company:{}
  },
  reducers:{
    setAllCompanies:(state,action)=>{
        state.allCompanies=action.payload;
    },
    addCompany:(state,action)=>{
      state.allCompanies.push(action.payload);
    }
  }
});
export const  {setAllCompanies,addCompany} = companiesSlice.actions;
export default companiesSlice.reducer;