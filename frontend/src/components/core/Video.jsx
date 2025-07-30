import React, { useEffect, useRef, useState } from 'react';
import { socket } from '../../operations/socket';
import Peer from '../../operations/rtcp';
import { Button } from "@/components/ui/button"


const Video = ({ roomId, userId }) => {
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

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

  useEffect(() => {
    getStream();
  }, []);

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

    const sendOfferToNewUser = async (toUserId) => {
      if (!myStream) return;
      const offer = await Peer.getOffer();
      socket.emit('outgoing-call', { roomId, fromOffer: offer, fromUserId: userId, toUserId });
    };

    Peer.peer.ontrack = (event) => {
      const [stream] = event.streams;
      setRemoteStream(stream);
    };

    socket.on('incoming-call', async ({ from, offer }) => {
      const answer = await Peer.getAnswer(offer);
      socket.emit('call-accepted', { roomId, answer, toUserId: from, fromUserId: userId });
    });

    socket.on('call-answered', async ({ from, answer }) => {
      await Peer.setAnswer(answer);
    });

    socket.on('new-user-joined', ({ newUserId }) => {
      sendOfferToNewUser(newUserId);
    });

    socket.on('user-left', ({ userId: leftUserId }) => {
      setRemoteStream(null);
    });

    return () => {
      socket.off('incoming-call');
      socket.off('call-answered');
      socket.off('user-left');
    };
  }, [roomId, userId, myStream]);

  // ✅ Toggle Mic
  const toggleMic = () => {
    if (!myStream) return;
    myStream.getAudioTracks().forEach(track => {
      track.enabled = !micEnabled;
    });
    setMicEnabled(prev => !prev);
  };

  // ✅ Toggle Camera
  const toggleCamera = () => {
    if (!myStream) return;
    myStream.getVideoTracks().forEach(track => {
      track.enabled = !cameraEnabled;
    });
    setCameraEnabled(prev => !prev);
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      {/* Your Video */}
      <div className="h-[20vh] bg-blue-500 rounded-lg shadow flex items-center justify-center overflow-hidden">
        {myStream ? (
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-white">Your Video</span>
        )}
      </div>

      {/* Remote Video */}
      <div className="h-[20vh] bg-blue-500 rounded-lg shadow flex items-center justify-center overflow-hidden">
        {remoteStream ? (
          <video
            ref={remoteVideoRef}
            autoPlay
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-white">Remote Video</span>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-2">
        <Button
          variant="otuline"
          onClick={toggleMic}
          className=" bg-green-300"        >
          {micEnabled ? 'Mic off' : 'On Mic'}
        </Button>
        <Button
          variant="otuline"
          onClick={toggleCamera}
          className=" bg-green-300"
        >
          {cameraEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
        </Button>
      </div>
    </div>
  );
};

export default Video;
