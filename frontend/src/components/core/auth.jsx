import React from 'react'
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'
function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } else {
    return <Navigate to="/room" />
  }
}

export default OpenRoute;