import { toast } from "react-hot-toast"
import { authEndpoints ,roomEndpoints} from "./apis"
import { setLoading,setToken } from "../slices/authSlice"
import { setUser } from "../slices/profileSlice"
import { apiConnector } from "./apiconnector"
import { setParticipant,setRoom } from '../slices/roomSlice'


const {SIGNUP_API,LOGOUT_API,LOGIN_API}=authEndpoints
const {GET_ROOM,CREATE_ROOM,JOIN_ROOM}=roomEndpoints

export function signUp(
  firstName,
  lastName,
  emailId,
  password,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        emailId,
        password
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const token = response?.data?.token
      if (token) {
        localStorage.setItem("token", token)
        dispatch(setToken(token))
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
    //   navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}
export function logout(navigate){
  return async(dispatch)=>{
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response =await apiConnector('POST',LOGOUT_API)
        console.log("logout API RESPONSE............", response)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch(setToken(null))
        dispatch(setUser(null))
        toast.success("Logout succesfully")
        navigate("/")
      } catch (error) {
        console.log("logout API ERROR............", error)
        toast.error("logout failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
}
export function login(emailId,password,navigate){
  return async(dispatch)=>{
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response =await apiConnector('POST',LOGIN_API,{emailId,password})
        console.log("logout API RESPONSE............", response?.data)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(setToken(response.data.token))
        dispatch(setUser(response.data.data))
        toast.success("login succesfully")
        navigate("/")
      } catch (error) {
        console.log("login API ERROR............", error)
        toast.error("login failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
}
export function createRoom(roomName,navigate){
  return async(dispatch)=>{
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response =await apiConnector('POST',CREATE_ROOM,{roomName})
        console.log("createRoom API RESPONSE............", response?.data)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        dispatch(setRoom(response?.data))
        const { room} = response?.data;
        localStorage.setItem("savedRoom",JSON.stringify(room))
        toast.success("createRoom succesfully")
        navigate("/room/dashboard")
      } catch (error) {
        console.log("createRoom API ERROR............", error)
        toast.error("createRoom failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
  }
}
export function joinRoom(roomId,navigate){
  return async(dispatch)=>{
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response =await apiConnector('GET',`${JOIN_ROOM}/${roomId}`)
        console.log("joinRoom API RESPONSE............", response?.data)
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        dispatch(setRoom(response?.data))
        const { room } = response?.data;

        localStorage.setItem("savedRoom",JSON.stringify(room))
        toast.success("joinRoom succesfully")
        navigate("/room/dashboard")
      } catch (error) {
        console.log("joinRoom API ERROR............", error)
        toast.error("joinRoom failed")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
  }
}