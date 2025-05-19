import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import {jwtDecode} from 'jwt-decode';

const OAuthSuccess = () => {
const navigate = useNavigate()
const { setUser } = useContext(UserContext)

useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get('token')
    console.log("Token from query param:", token) // Make sure this prints valid token
    if (token) {
        try {
        localStorage.setItem('token', token)
        console.log("Token stored successfully")
        const user = jwtDecode(token);
        console.log("usr is",user)
        setUser(user)
        navigate('/')
        } catch (err) {
        console.error("Error saving token:", err)
        }
    } else {
        console.warn("No token found in URL")
        navigate('/login')
    }
}, [])


  return <p>Logging you in via Google...</p>
}

export default OAuthSuccess
