import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./login/loginSlice";
import loadingReducer from "./loading/loadingSlice"
import projectReducer from "./project/projectSlice"
import adminReducer from "./admin/adminSlice"


export const store = configureStore({
    reducer: {
        login: loginReducer,
        loading: loadingReducer,
        project: projectReducer,
        admin: adminReducer
    }
})