import React from 'react'

const Google = () => {
  function handleClick(e) {
    e.preventDefault()
    // Redirect to the backend route that starts the Google OAuth flow
    window.location.href = import.meta.env.VITE_API_URL+'/auth/google'
  }

  return (
    <button onClick={handleClick}>Login with Google</button>
  )
}

export default Google
