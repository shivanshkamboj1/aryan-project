import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { roomEndpoints } from '../../Apis/apis'
import { apiConnector } from '../../Apis/apiconnector'
import { useDispatch } from 'react-redux'
import { joinRoom } from '../../operations/apiLogic'
const {GET_ROOM}=roomEndpoints


const RoomDetails = () => {
  const { roomId } = useParams()
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [state, setState] = useState({
    loading: false,
    error:null,
    room: null,
    participants: [],
  })

  useEffect(() => {
    if (!roomId) return

    const fetchData = async () => {
      const toastId = toast.loading("Loading...")
      setState(prev => ({ ...prev, loading: true }))

      try {
        const response = await apiConnector('GET', `${GET_ROOM}/${roomId}`)
        console.log("API response:", response)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        setState({
          loading: false,
          room: response.data.room,
          error:null,
          participants: response.data.participants,
        })

        toast.success("Fetched participants")
      } catch (error) {
        console.error("API ERROR:", error)
        setState({
          loading: false,
          error: error.response.data.message,
          room: null,
          participants: []
        });

        toast.error("Room fetch failed")
      }

      toast.dismiss(toastId)
    }

    fetchData()
  }, [roomId])
  const joinRoomHandler = () => {
    if (!state.room) {
      toast.error("Room not loaded yet!");
      return;
    }
    dispatch(joinRoom(roomId,navigate))

  };
  if(state.loading){
    return<div>loading</div>
  }
  if(state.error){
    return <div>{state.error}</div>
  }
  if (!state.room) {
    return <div>No room data available</div>
  }
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Room Details</h2>
      
      {state.loading && <p>Loading...</p>}

      {state.room && (
        <div className="mb-4">
          <p><strong>Room Name:</strong> {state.room.name}</p>
          <p><strong>Room ID:</strong> {roomId}</p>
          <p><strong>Host Name:</strong> {state.room.host.firstName +" "+ state.room.host.lastName}</p>
          <p><strong>Host ID:</strong> {state.room.host?._id}</p>
          <p><strong>Expires At:</strong> {new Date(state.room.expiresAt).toLocaleString()}</p>
        </div>
      )}

      <h3 className="text-lg font-semibold">Participants ({state.participants.length})</h3>
      <ul className="list-disc pl-6">
        {state.participants.map((p, idx) => (
          <li key={idx}>{p.firstName || p._id}</li>
        ))}
      </ul>
      <button onClick={joinRoomHandler}>Join room finally</button>
    </div>
  )
}

export default RoomDetails
