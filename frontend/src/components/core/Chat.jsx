import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../operations/socket";

const Chat = ({ roomId, userId, userName }) => {
  const [connected, setConnected] = useState(socket.connected);
  const [controls, setControls] = useState({ mic: true, camera: true });
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const chatEndRef = useRef(null);

  // ✅ Only once when component mounts
  useEffect(() => {
    console.log("[Chat] Mounting, joining room:", roomId);

    // Join the room
    socket.emit("joinRoom", { roomId, userId });

    // Handle connect / disconnect
    const handleConnect = () => {
      console.log("🟢 Connected:",userName, socket.id);
      setConnected(true);
    };

    const handleDisconnect = () => {
      console.log("🔴 Disconnected");
      setConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    // Listen for new messages
    const handleNewMessage = (msg) => {

      console.log("💬 New message:", msg);
      setChatMessages((prev) => [...prev, msg]);
      scrollToBottom();
    };
    socket.on("newMessage", handleNewMessage);

    // Listen for new users
    const handleUserJoined = ({ userId }) => {
      console.log(`👤 User joined: ${userId}`);
    };
    socket.on("userJoined", handleUserJoined);

    // Optional: handle user controls if you use that
    // socket.on("yourControls", setControls);

    // Cleanup on unmount
    return () => {
      console.log("[Chat] Cleaning up listeners");
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newMessage", handleNewMessage);
      socket.off("userJoined", handleUserJoined);
      // socket.off("yourControls");

      // Optionally tell server we've left
      socket.emit("leaveRoom", { roomId, userId });
    };
  }, [roomId, userId]);

  // ✅ Send chat message
  const sendMessage = () => {
    if (!messageInput.trim()) return;
    const messageObj = {
      senderId: userId,
      senderName: userName,
      message: messageInput.trim(),
      isAI: false
    };

    socket.emit("sendMessage", { roomId, message: messageObj });
    setMessageInput("");
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Room: {roomId}</h2>
      <p>Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</p>

      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "scroll" }}>
        {chatMessages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "8px" }}>
            <strong>{msg.senderName}:</strong> {msg.message}
            <br />
            <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Type your message"
        style={{ width: "70%", marginRight: "5px" }}
      />
      <button onClick={sendMessage}>Send</button>

      <hr />

      <h4>Your Controls</h4>
      <p>Mic: {controls.mic ? "✅ On" : "❌ Off"}</p>
      <p>Camera: {controls.camera ? "✅ On" : "❌ Off"}</p>
    </div>
  );
};

export default Chat;
