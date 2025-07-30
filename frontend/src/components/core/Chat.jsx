import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../operations/socket";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button"
const Chat = ({ roomId, userId, userName }) => {
  // const [connected, setConnected] = useState(socket.connected);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  console.log(chatMessages)
  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.emit("joinRoom", { roomId, userId });

    const handleConnect = () => {
      console.log("🟢 Connected:", userName, socket.id);
      // setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("🔴 Disconnected");
      // setConnected(false); 
    };

    const handleNewMessage = (msg) => {
      setChatMessages((prev) => [...prev, msg]);
      // scrollToBottom();
    };

    const handleUserJoined = ({ userId }) => {
      console.log(`👤 User joined: ${userId}`);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newMessage", handleNewMessage);
    socket.on("userJoined", handleUserJoined);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newMessage", handleNewMessage);
      socket.off("userJoined", handleUserJoined);
      socket.emit("leaveRoom", { roomId, userId });
    };
  }, [roomId, userId]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const isAI = messageInput.startsWith("@ai");
    const messageObj = {
      senderId: userId,
      senderName: userName,
      message: messageInput.trim(),
      isAI,
      createdAt: new Date().toISOString()
    };

    socket.emit("sendMessage", { roomId, message: messageObj });
    setMessageInput("");
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  return (
    <div className="flex flex-col h-full bg-white justify-between">
      {/* Chat Messages */}
      <div className="flex flex-col overflow-y-auto gap-2" style={{ maxHeight: "70vh" }}>

        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[80%]  px-3 py-2 rounded ${
              msg.senderId === userId
                ? "ml-auto bg-indigo-100"
                : "mr-auto bg-gray-100"
            }`}
          >
            <div className="text-xs font-medium text-gray-700 mb-0.5">
              {msg.senderName}
            </div>
            <div className="text-sm text-gray-800">
              <ReactMarkdown>{msg.message}</ReactMarkdown>
            </div>
            <div className="text-[10px] text-gray-500 mt-1">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center h-[40px] w-full">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 border h-full  border-gray-300 w-[90%] rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <Button
            onClick={sendMessage}
          >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
