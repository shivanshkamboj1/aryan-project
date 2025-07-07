import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from '../../../frontend/src/slices/authSlice'
import { signUp } from '../operations/apiLogic'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Form submitted:', data)
    dispatch(setSignupData(data))
    dispatch(signUp(data.firstName, data.lastName, data.emailId, data.password, navigate))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Create Your Account</h2>
        
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="emailId" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id="emailId"
              type="email"
              name="emailId"
              value={data.emailId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  )
}

export default Signup
