import { configureStore } from "@reduxjs/toolkit";
import viewportReducer from "./reducers/viewportReducer";
import reportReducer from "./reducers/reportReducer";
const store = configureStore({
    reducer:{
        viewport: viewportReducer,
        report: reportReducer,
    }
})
export default store