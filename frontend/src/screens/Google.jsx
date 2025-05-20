import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const Google = () => {
  function handleClick(e) {
    e.preventDefault()
    window.location.href = import.meta.env.VITE_API_URL + '/auth/google'
  }

  return (
    <div className="flex justify-center items-center h-full mt-6">
      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:shadow-md hover:bg-gray-50 transition-all duration-200"
      >
        <FcGoogle size={20} />
        <span className="text-sm font-medium text-gray-700">Sign in with Google</span>
      </button>
    </div>
  )
}

export default Google
