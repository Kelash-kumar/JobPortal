import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import applicationSlice from "./applicationSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        jobs:jobSlice,
        applications:applicationSlice
    }
});


export default store;