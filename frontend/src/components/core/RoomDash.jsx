import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../operations/apiLogic';
import Navbar from '../common/Navbar';
useSelector
const RoomDash = () => {
  const {token}  = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isCreate, setIsCreate] = useState(true);

  const handleChange = () => {
    const room = ref.current.value.trim();
    if (!room) return;

    if (isCreate) {
      dispatch(createRoom(room, navigate));
    } else {
      navigate(`/room/${room}`);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Room Dashboard
        </h2>

        {/* Mode Switch Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className={`px-4 py-2 border rounded ${
              isCreate ? 'bg-indigo-100 border-indigo-600' : 'border-gray-300'
            } hover:bg-indigo-50 transition`}
            onClick={() => setIsCreate(true)}
          >
            Create Room
          </button>
          <button
            className={`px-4 py-2 border rounded ${
              !isCreate ? 'bg-indigo-100 border-indigo-600' : 'border-gray-300'
            } hover:bg-indigo-50 transition`}
            onClick={() => setIsCreate(false)}
          >
            Join Room
          </button>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="roomId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {isCreate ? 'Enter Room Name' : 'Enter Room ID'}
            </label>
            <input
              id="roomId"
              ref={ref}
              placeholder={isCreate ? 'e.g. my-room' : 'e.g. 123-abc'}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <button
            onClick={handleChange}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {isCreate ? 'Create Room' : 'Join Room'}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default RoomDash;
