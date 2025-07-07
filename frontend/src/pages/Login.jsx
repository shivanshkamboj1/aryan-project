import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../operations/apiLogic'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    emailId: 'a@gmail.com',
    password: '12345678'
  })

  const changeHandler = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(login(form.emailId, form.password, navigate))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Log in to Your Account</h2>
        
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label htmlFor='emailId' className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              id='emailId'
              name='emailId'
              type="email"
              value={form.emailId}
              onChange={changeHandler}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label htmlFor='password' className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id='password'
              name='password'
              type="password"
              value={form.password}
              onChange={changeHandler}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <button
            type='submit'
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
