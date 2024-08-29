import { createSlice } from "@reduxjs/toolkit";

const companiesSlice =createSlice({
  name:"companies",
  initialState:{
    allCompanies:[],
    company:{}
  },
  reducers:{
    setAllCompanies:(state,action)=>{
        state.allCompanies=action.payload;
    },
  }
});
export const  {setAllCompanies} = companiesSlice.actions;
export default companiesSlice.reducer;