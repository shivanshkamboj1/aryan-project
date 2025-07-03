import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import './App.css'
import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { socket } from "./operations/socket";
const App = () => {

  useEffect(() => {
    console.log("[App] Connecting socket...");
    socket.connect();

    return () => {
      console.log("[App] Disconnecting socket...");
      socket.disconnect();
    };
  }, []);
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-center" />
      <ToastContainer />
    </BrowserRouter>
  )
}
export default App;
