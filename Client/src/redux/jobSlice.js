import { createSlice } from "@reduxjs/toolkit";

const JobSlice = createSlice({
  name: "Jobs",
  initialState: {
    allJobs: [],
    Job: {},
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setJob: (state, action) => {
      state.Job = action.payload;
    },
  },
});

export const {setAllJobs,setJob}=JobSlice.actions;
export default JobSlice.reducer;
