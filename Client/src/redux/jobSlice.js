import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
  name: "Jobs",
  initialState: {
    allJobs: [],
    Job: {},
    adminJobs:[],
    JobSearchText:'',
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setJob: (state, action) => {
      state.Job = action.payload;
    },
    setAdminJobs:(state,action) =>{
      state.adminJobs=action.payload;
    },
    setJobSearchText:(state,action) =>{
      state.JobSearchText=action.payload;
    },
  },
});

export const {setAllJobs,setJob,setAdminJobs,setJobSearchText}=JobSlice.actions;
export default JobSlice.reducer;
