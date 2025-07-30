import React, { useContext, useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Google from './Google'
import Signup from './Signup'
import { useDispatch, useSelector } from 'react-redux'
import { createRoom, logout } from '../operations/apiLogic'
import Navbar from '../components/common/Navbar'
import { authEndpoints } from '../operations/apis'
import { apiConnector } from '../operations/apiconnector'
const {CHECK}=authEndpoints
const Home = () => {  
    const {token}  = useSelector((state)=>state.auth)
 
    const navigate = useNavigate();
    useEffect(()=>{
        const checkUser  = async()=>{
            try {
                const response = await apiConnector('GET', `${CHECK}`,{}, {Authorization: `Bearer ${token}`,Verify: "true"});
                if(response.success){
                    console.log("token is valid")
                }
            } catch (error) {
                localStorage.clear()
            }
        }
        checkUser()
    },[])
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Home