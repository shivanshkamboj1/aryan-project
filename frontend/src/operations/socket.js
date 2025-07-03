import { io } from "socket.io-client";

export const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  autoConnect: false,         // Recommended for manual control
  reconnection: true
});
