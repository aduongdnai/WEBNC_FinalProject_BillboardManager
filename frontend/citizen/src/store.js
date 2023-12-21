import { configureStore } from "@reduxjs/toolkit";
import viewportReducer from "./reducers/viewportReducer";

const store = configureStore({
    reducer:{
        viewport: viewportReducer
    }
})
export default store