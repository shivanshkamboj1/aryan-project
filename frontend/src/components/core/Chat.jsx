import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../operations/socket";
import ReactMarkdown from "react-markdown";

const Chat = ({ roomId, userId, userName }) => {
  const [connected, setConnected] = useState(socket.connected);
  const [controls, setControls] = useState({ mic: true, camera: true });
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const handleConnect = () => {
      console.log("🟢 Connected:", userName, socket.id);
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("🔴 Disconnected");
      setConnected(false);
    };

    const handleNewMessage = (msg) => {
      console.log("💬 New message:", msg);
      setChatMessages((prev) => [...prev, msg]);
      scrollToBottom();
    };

    const handleUserJoined = ({ userId }) => {
      console.log(`👤 User joined: ${userId}`);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newMessage", handleNewMessage);
    socket.on("userJoined", handleUserJoined);

    return () => {
      console.log("[Chat] Cleaning up listeners");
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newMessage", handleNewMessage);
      socket.off("userJoined", handleUserJoined);
      socket.emit("leaveRoom", { roomId, userId });
    };
  }, [roomId, userId]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const check = messageInput.startsWith("@ai");
    const messageObj = {
      senderId: userId,
      senderName: userName,
      message: messageInput.trim(),
      isAI: check,
      createdAt: new Date().toISOString()
    };

    socket.emit("sendMessage", { roomId, message: messageObj });
    setMessageInput("");
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col bg-white border border-gray-300 rounded shadow p-4 h-[500px]">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-indigo-600">Room: {roomId}</h2>
        <span className="text-sm">
          {connected ? "🟢 Connected" : "🔴 Disconnected"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-3 p-2 border border-gray-200 rounded">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%] ${
              msg.senderId === userId
                ? "self-end bg-indigo-100"
                : "self-start bg-gray-100"
            } rounded px-3 py-2`}
          >
            <div className="text-sm font-medium text-gray-800 mb-1">
              {msg.senderName}
            </div>
            <div className="text-gray-700 text-sm">
              <ReactMarkdown>{msg.message}</ReactMarkdown>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Mic: {controls.mic ? "✅ On" : "❌ Off"} | Camera:{" "}
        {controls.camera ? "✅ On" : "❌ Off"}
      </div>
    </div>
  );
};

export default Chat;
