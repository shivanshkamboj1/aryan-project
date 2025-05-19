import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from '../config/axios'
import Google from './Google'

const Signup = () => {

    const [ data, setData ] = useState({
        firstName:"",
        lastName:"",
        emailId:"",
        password:""
    })
    const { setUser } = useContext(UserContext)

    const navigate = useNavigate()
    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    function submitHandler(e) {

        e.preventDefault()

        axios.post('/user/signup', 
            data
        ).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            navigate('/')
        }).catch((err) => {
            console.log(err.response.data)
        })
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6">Register</h2>
                <form
                    onSubmit={submitHandler}
                >
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="firstName">First name</label>
                        <input
                            name="firstName"
                            type="text"
                            id="firstName"
                            value={data.firstName}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your first name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Last name</label>
                        <input
                            name="lastName"
                            type="text"
                            id="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            name="emailId"
                            type="email"
                            id="emailId"
                            value={data.emailId}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            value={data.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Signup
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
            <Google/>
        </div>
    )
}

export default Signup