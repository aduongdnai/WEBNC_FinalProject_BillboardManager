import { configureStore } from "@reduxjs/toolkit";
import viewportReducer from "./reducers/viewportReducer";
import authReducer from "./reducers/authReducer";
const store = configureStore({
    reducer:{
        viewport: viewportReducer,
        auth: authReducer
    }
})
export default store