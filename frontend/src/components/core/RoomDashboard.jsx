import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { socket } from "../../operations/socket"
import Video from './Video'
import Chat from './Chat'
import { useNavigate } from 'react-router-dom'

const RoomDashboard = () => {
  const { user } = useSelector((state) => state.profile)
  const { room } = useSelector((state) => state.room)
  const navigate = useNavigate()
  const roomId = room?.roomId
  const userId = user?._id
  const userName = `${user?.firstName} ${user?.lastName}`

  useEffect(() => {
    if(!roomId){
      navigate('/roo')
    }
    if (roomId && userId) {
      console.log("Joining room:", roomId)
      socket.emit("joinRoom", { roomId, userId })
    }
  }, [roomId, userId])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-indigo-600 text-white py-4 text-center shadow">
        <h2 className="text-2xl font-bold">Room Dashboard</h2>
        <p className="text-sm">Room ID: <span className="font-mono">{roomId}</span></p>
      </header>

      <div className="flex flex-col md:flex-row flex-1 p-4 gap-4">
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 text-indigo-600">Video</h3>
          <Video roomId={roomId} userId={userId} />
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 text-indigo-600">Chat</h3>
          <Chat roomId={roomId} userId={userId} userName={userName} />
        </div>
      </div>
    </div>
  )
}

export default RoomDashboard
