const BASE_URL = import.meta.env.VITE_API_URL 

// AUTH ENDPOINTS
export const authEndpoints = {
  GOOGLE_LOGIN:+ BASE_URL +'/user/auth/google',
  // SENDOTP_API: BASE_URL + "/user/sendotp",
  SIGNUP_API: BASE_URL + "/user/signup",
  LOGIN_API: BASE_URL + "/user/login",
  LOGOUT_API: BASE_URL + "/user/logout",
  RESETPASSTOKEN_API: BASE_URL + "/user/resetpasswordtoken",
  RESETPASSWORD_API: BASE_URL + "/user/resetpassword",
  CHANGE_PASSWORD_API: BASE_URL + "/user/changepassword",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/room/createroom",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/room/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/room/instructorDashboard",
}

// STUDENTS ENDPOINTS
export const roomEndpoints = {
  GET_ROOM:BASE_URL + "/room/getroom",
  CREATE_ROOM: BASE_URL + "/room/createroom",
  JOIN_ROOM: BASE_URL + "/room/joinroom",
  LEAVE_ROOM: BASE_URL + "/room/leaveroom",
  GETLIST_ROOM: BASE_URL + "/room/getparticipantslist",
  UPDATE_ROOM: BASE_URL + "/room/updateroom",
  DELETE_ROOM: BASE_URL + "/room/deleteroom",
}


// CONTACT-US API
// export const contactusEndpoint = {
//   CONTACT_US_API: BASE_URL + "/reach/contact",
// }

// // SETTINGS PAGE API
// export const settingsEndpoints = {
//   UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
//   UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",

//   DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
// }
