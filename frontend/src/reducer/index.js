import {combineReducers} from "@reduxjs/toolkit";
import profileSlice from  "../slices/profileSlice"
import authSlice from  "../slices/authSlice"
import roomSlice from  "../slices/roomSlice"
const rootReducer = combineReducers({
    auth:authSlice,
    profile:profileSlice,
    room:roomSlice
})
export default rootReducer
