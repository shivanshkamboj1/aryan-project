import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { roomEndpoints } from '../../operations/apis';
import { apiConnector } from '../../operations/apiconnector';
import { useDispatch } from 'react-redux';
import { joinRoom } from '../../operations/apiLogic';

const { GET_ROOM } = roomEndpoints;

const RoomDetails = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    loading: false,
    error: null,
    room: null,
    participants: [],
  });

  useEffect(() => {
    if (!roomId) return;

    const fetchData = async () => {
      const toastId = toast.loading("Loading room details...");
      setState(prev => ({ ...prev, loading: true }));

      try {
        const response = await apiConnector('GET', `${GET_ROOM}/${roomId}`);
        console.log("API response:", response);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        setState({
          loading: false,
          room: response.data.room,
          error: null,
          participants: response.data.participants,
        });

        toast.success("Room loaded");
      } catch (error) {
        console.error("API ERROR:", error);
        setState({
          loading: false,
          error: error?.response?.data?.message || "Failed to load room",
          room: null,
          participants: [],
        });

        toast.error("Room fetch failed");
      }

      toast.dismiss(toastId);
    };

    fetchData();
  }, [roomId]);
   useEffect(() => {
    if (state.error) {
      setTimeout(() => navigate('/room'), 3000);
    }
  }, [state.error, navigate]);
  const joinRoomHandler = () => {
    if (!state.room) {
      toast.error("Room not loaded yet!");
      return;
    }
    dispatch(joinRoom(roomId, navigate));
  };

  if (state.loading) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  if (state.error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{state.error} - redirecting in 3 second</div>;
  }

  if (!state.room) {
    return <div className="flex justify-center items-center h-screen">No room data available.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Room Details</h2>

      <div className="border border-gray-200 rounded p-4 mb-6">
        <p className="text-gray-800 mb-2">
          <span className="font-semibold">Room Name:</span> {state.room.name}
        </p>
        <p className="text-gray-800 mb-2">
          <span className="font-semibold">Room ID:</span> {roomId}
        </p>
        <p className="text-gray-800 mb-2">
          <span className="font-semibold">Host Name:</span> {state.room.host.firstName} {state.room.host.lastName}
        </p>
        <p className="text-gray-800 mb-2">
          <span className="font-semibold">Host ID:</span> {state.room.host?._id}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">Expires At:</span> {new Date(state.room.expiresAt).toLocaleString()}
        </p>
      </div>

      <h3 className="text-lg font-semibold text-indigo-600 mb-2">
        Participants ({state.participants.length})
      </h3>
      {state.participants.length > 0 ? (
        <ul className="list-disc pl-6 mb-6">
          {state.participants.map((p, idx) => (
            <li key={idx} className="text-gray-700">
              {p.firstName || p._id}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mb-6">No participants yet.</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={joinRoomHandler}
          className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
