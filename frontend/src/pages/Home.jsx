import React, { useContext, useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Google from './Google'
import Signup from './Signup'
import { useDispatch, useSelector } from 'react-redux'
import { createRoom, logout } from '../operations/apiLogic'
import Navbar from '../components/common/Navbar'

const Home = () => {  
    const {token}  = useSelector((state)=>state.auth)
    const {room}  = useSelector((state)=>state.room)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cs =' border border-black p-2' 

    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Home