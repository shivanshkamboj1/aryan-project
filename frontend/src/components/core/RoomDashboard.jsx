import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socket } from "../../operations/socket";
import Video from './Video';
import Chat from './Chat';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

const RoomDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  const { room } = useSelector((state) => state.room);
  const navigate = useNavigate();

  const roomId = room?.roomId;
  const userId = user?._id;
  const userName = `${user?.firstName} ${user?.lastName}`;

  const [videoLink, setVideoLink] = useState("");
  const [playing, setPlaying] = useState(false);

  const playerRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);

  function changeHandler(e) {
    setVideoLink(e.target.value);
  }
  function getValidYoutubeUrl(link) {
  if (!link) return "";
  try {
    const url = new URL(link);
    if (url.hostname.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
      }
    }
    if (url.hostname.includes("youtu.be")) {
      const videoId = url.pathname.slice(1);
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return link;
  } catch (e) {
    return link;
  }
}

return (
  <div className="min-h-screen bg-gray-50 p-2 grid grid-cols-11 grid-rows-[auto_1fr_auto] gap-2">
    {/* Header / Title Row */}
    <header className="bg-indigo-600 col-span-11 flex items-center justify-between px-4 h-[12vh] text-white shadow">
      <h2 className="text-xl font-bold">
        Room Dashboard <span className="font-mono">{roomId}</span>
      </h2>
      <input
        className="w-[50%] max-w-lg border border-gray-300 rounded px-2 py-1 text-black focus:outline-none focus:ring-2 focus:ring-indigo-300"
        type="text"
        placeholder="Enter YouTube link"
        onChange={changeHandler}
        value={videoLink}
      />
    </header>

    {/* Video Content */}
    <div className="col-span-7 bg-white rounded-lg shadow p-2 aspect-video flex items-center justify-center">
      {videoLink ? (
        <ReactPlayer
          ref={playerRef}
          src={getValidYoutubeUrl(videoLink)}
          playing={playing}
          controls
          width="100%"
          height="100%"
          onProgress={({ playedSeconds }) => setPlayed(playedSeconds)}
          onDuration={(d) => setDuration(d)}
        />
      ) : (
        <div className="text-gray-400">No video link provided</div>
      )}
    </div>

    {/* Chat Panel (spans 2 rows) */}
    <div className="col-span-2 row-span-2 bg-white rounded-lg shadow p-2 overflow-y-auto flex flex-col">
      <h3 className="text-lg font-semibold mb-2 text-indigo-600 text-center">Chat</h3>
      <Chat roomId={roomId} userId={userId} userName={userName} />
    </div>

    {/* Bottom Boxes */}
      <div className="col-span-2">
        <Video roomId={roomId} userId={userId} />
      </div>

  </div>
);

};

export default RoomDashboard;
