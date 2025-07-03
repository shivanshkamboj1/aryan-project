import React, { useState, useContext, useEffect } from 'react'
import { Link,  useNavigate } from 'react-router-dom'

import Google from './Google'
import {useDispatch, useSelector} from 'react-redux'
import { setSignupData } from '../slices/authSlice'
import { signUp } from '../operations/apiLogic'
const Signup = () => {
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const {signupData} = useSelector((state)=>state.auth)

    const [data,setData]=useState({
        firstName: '',
        lastName: '',
        emailId: '',
        password: ''
    });
    const handlechange = (event)=>{
        const {name,value}=event.target
        setData ((prev)=>({
            ...prev,[name]:value
        }))
    }
    const submithandler=(e)=>{
        e.preventDefault();
        console.log('Form submitted:', data); 
        dispatch(setSignupData(data))
        dispatch(signUp(data.firstName,data.lastName,data.emailId,data.password,navigate))
    }

    
    return (
        <div>
            <form onSubmit={submithandler}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                id="firstName"
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handlechange}
                required
                />
            </div>

            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                id="lastName"
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handlechange}
                required
                />
            </div>

            <div>
                <label htmlFor="emailId">Email</label>
                <input
                id="emailId"
                type="email"
                name="emailId"
                value={data.emailId}
                onChange={handlechange}
                required
                />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input
                id="password"
                type="password"
                name="password"
                value={data.password}
                onChange={handlechange}
                required
                />
            </div>

            <button type="submit">Submit</button>
            </form>

        </div>
    )
}

export default Signup