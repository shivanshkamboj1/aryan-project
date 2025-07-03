import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { createRoom } from '../../operations/apiLogic';

const RoomDash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const ref = useRef(null);

  const [isCreate,setIsCreate]=useState(true);

  const handlechange=()=>{
    const room = ref.current.value
    if (!room) return
    if(isCreate){
      dispatch(createRoom(room,navigate))
    }
    else{
      navigate(`/room/${room}`)
    }
  }

  return (
    <div>
      <h2>room dashboard</h2>
      
      <button
        className={`border border-black p-2.5 ${isCreate && 'bg-amber-200' }`}
        onClick={() => setIsCreate(true)}
      >
        create room
      </button>
      
      <button
        className={`border border-black p-2.5 ${!isCreate && 'bg-amber-200'}`}
        onClick={() => setIsCreate(false)}
      >
        join room
      </button>


        <div>
            <h2>{isCreate?"Create room":"Join room"}</h2>
            <label htmlFor='roomId'>{isCreate?"Enter room name":"enter room id"}</label>
            <input ref={ref} id='roomId'className='border border-black'/>
            <button onClick={handlechange}>{isCreate?"Create room":"Join room"}</button>
        </div>
      

    </div>
  );
};

export default RoomDash;
