import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../../operations/socket';
import Peer from '../../operations/rtcp';

const Video = ({ roomId, userId }) => {
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const getStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setMyStream(stream);

      stream.getTracks().forEach(track => {
        Peer.peer.addTrack(track, stream);
      });

      const fromOffer = await Peer.getOffer();
      socket.emit("outgoing-call", { roomId, fromOffer, fromUserId: userId });

    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };
  useEffect(()=>{
    getStream()
  },[])
  useEffect(() => {
    if (localVideoRef.current && myStream) {
      localVideoRef.current.srcObject = myStream;
    }
  }, [myStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    if (!Peer.peer) return;

    Peer.peer.ontrack = (event) => {
      console.log("✅ Received remote track:", event);
      const [stream] = event.streams;
      setRemoteStream(stream);
    };

    socket.on('incoming-call', async ({ from, offer }) => {
      console.log('📞 Incoming offer from:', from);
      const answer = await Peer.getAnswer(offer);
      socket.emit('call-accepted', { roomId, answer, toUserId: from, fromUserId: userId });
    });

    socket.on('call-answered', async ({ from, answer }) => {
      console.log('✅ Received answer from:', from);
      await Peer.setAnswer(answer);
    });
    socket.on('user-left', ({ userId: leftUserId }) => {
      console.log('🚪 user left:', leftUserId);
      setRemoteStream(null);
    });
    return () => {
      socket.off('incoming-call');
      socket.off('call-answered');
      socket.off('user-left');
    };
  }, [roomId, userId]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold text-indigo-600 text-center mb-4">Video Chat</h3>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Your Video</p>
          {myStream ? (
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="rounded-lg border-4 border-indigo-600 w-72 h-72 object-cover shadow"
            />
          ) : (
            <div className="w-72 h-72 rounded-lg border-4 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
              Not Started
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Remote Video</p>
          {remoteStream ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              className="rounded-lg border-4 border-green-600 w-72 h-72 object-cover shadow"
            />
          ) : (
            <div className="w-72 h-72 rounded-lg border-4 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
              Waiting for Peer
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={getStream}
          className="px-6 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Start Camera & Call
        </button>
      </div>
    </div>
  );
};

export default Video;
