import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-r from-indigo-50 to-white px-4">
      <h1 className="text-5xl font-bold text-indigo-600 mb-4 text-center">
        Welcome to Our App 🚀
      </h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-8">
        Collaborate, Learn, and Connect with ease. Create your own rooms or join existing ones to start your journey.
      </p>
      <div className="flex gap-4">
        {
          !token ? 
          <>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
            >
              Log In
            </button>
            </>
            : <>
            <button
              onClick={() => navigate('/room')}
              className="px-6 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
            >
              Go to room
            </button>
            </>
        }
      </div>
    </div>
  )
}

export default LandingPage
