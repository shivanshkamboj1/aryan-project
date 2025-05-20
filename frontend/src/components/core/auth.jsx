
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'
function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children
  } else {
    return <Navigate to="/pending" />
  }
}

export default OpenRoute;