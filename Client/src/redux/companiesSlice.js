import { createSlice } from "@reduxjs/toolkit";

const companiesSlice =createSlice({
  name:"companies",
  initialState:{
    allCompanies:[],
    updatedCompany:{}
  },
  reducers:{
    setAllCompanies:(state,action)=>{
        state.allCompanies=action.payload;
    },
    addCompany:(state,action)=>{
      state.allCompanies.push(action.payload);
    },
    setUpdateCompany:(state,action)=>{
      state.updatedCompany=action.payload;
    }
  }
});
export const  {setAllCompanies,addCompany,setUpdateCompany} = companiesSlice.actions;
export default companiesSlice.reducer;