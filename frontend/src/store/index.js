/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./auth"
const store = configureStore({
    reducer: {
        auth: authReducer,
    }
})

export default store