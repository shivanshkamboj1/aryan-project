import React from 'react'

import Chat from './Chat'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { roomEndpoints } from '../../Apis/apis'
import { joinRoom } from '../../operations/apiLogic';

const RoomDashboard = () => {
    const {user} = useSelector((state)=>state.profile)
    const {room} = useSelector((state)=>state.room)
    const userId = user._id
    const userName = user.firstName +" "+user.lastName


    return (
        <div>
            <h2>room dashboard baby</h2>
            <Chat roomId={room.roomId} userId={userId} userName={userName}/>
        </div>
    )
}

export default RoomDashboard