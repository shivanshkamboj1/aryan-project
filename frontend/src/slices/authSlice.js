import { createSlice } from "@reduxjs/toolkit";

//selector
const initialState={
    signupData:null,
    loading:false,
    token: localStorage.getItem("token") || null
}
//dispatch
const authSlice =createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
    }
})
export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer