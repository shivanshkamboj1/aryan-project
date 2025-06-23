import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OAuthSuccess = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Token is in cookie, so just redirect to home or fetch user info elsewhere
    navigate('/')
  }, [navigate])

  return <p>Logging you in via Google...</p>
}

export default OAuthSuccess
