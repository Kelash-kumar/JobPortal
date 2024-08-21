import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    allApplications: [],
    Application: {},
  },
  reducers: {
    setAllApplications: (state, action) => {
      state.allApplications = action.payload;
    },
    setApplication: (state, action) => {
      state.Application = action.payload;
    },
  },
});

export const {setAllApplications,setApplication}=applicationSlice.actions;
export default applicationSlice.reducer;
