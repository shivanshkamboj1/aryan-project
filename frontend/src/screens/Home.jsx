import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Google from './Google'
import Signup from './Signup'
import { useDispatch, useSelector } from 'react-redux'
import { createRoom, logout } from '../operations/apiLogic'

// import Navbar from '../components/common/Navbar'

const Home = () => {  
    const {token}  = useSelector((state)=>state.auth)
    const {room}  = useSelector((state)=>state.room)
    const dispatch = useDispatch();
    console.log(token)
    const navigate = useNavigate();
    const cs =' border border-black p-2' 
    return (
        <div>
            <h2>Homepage bitch</h2>
            {/* <Navbar/> */}
            {!token? <div>
                    <button className= {cs} onClick={()=>navigate('/signup')}>signup</button>
                    <button className={cs} onClick={()=>navigate('/login')}>login</button>
                </div>: 
                <div>
                    {room&&<div>
                        room name is {room.name} and id is {room.roomId}
                        <button className={cs} onClick={navigate(`${room.roomId}`)}>go to room</button>
                    </div>}
                    hoooh logged in beta ji
                    <button className={cs} onClick={()=>dispatch(logout(navigate))}>Logout</button>
                    <button className={cs} onClick={()=>dispatch(createRoom("jalepino"))}>create room</button>
                </div>
            }
            {/* <div className=' bg-black'>hi</div> */}
            {/* <Signup/> */}
        </div>
    )
}

export default Home