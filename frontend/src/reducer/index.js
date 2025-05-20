import {combineReducers} from "@reduxjs/toolkit";
import profileSlice from  "../slices/profileSlice"
import authSlice from  "../slices/authSlice"
const rootReducer = combineReducers({
    auth:authSlice,
    profile:profileSlice
})
export default rootReducer
