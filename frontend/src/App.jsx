import React, { useEffect, useState } from 'react';
import './App.css'
import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { socket } from "./operations/socket";
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OAuthSuccess from './components/core/OAuth'
import OpenRoute from './components/core/auth'
import NotFound from './pages/NotFound'
import Pending from './pages/Pending'
import RoomDetails from './components/core/RoomDetails'
import RoomDash from './components/core/RoomDash'
import RoomDashboard from './components/core/RoomDashboard'
import Privateroute from './components/core/Privateroute'
import Video from './components/core/Video'
import About from './pages/About';
import LandingPage from './pages/Landingpage';

const App = () => {

  useEffect(() => {
    console.log("Connecting socket...");
    socket.connect();

    return () => {
      console.log("Disconnecting socket...");
      socket.disconnect();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/video'element={<Video/> }></Route>
          <Route path='/' element={<Home/>}>
              <Route index element={<LandingPage />} />
              <Route path='login' element={
                <OpenRoute>
                  <Login/>
                </OpenRoute>
                }/>
              <Route path='signup' element={                
                <OpenRoute>
                  <Signup/>
                </OpenRoute>}/>
              <Route path='/about' element={<About/>}/>
          </Route>
          <Route path="/oauth-success" element={<OAuthSuccess/>} />
          <Route path="/pending" element={< Pending/>} />
          <Route path="/room" element={<Privateroute />}>
            <Route index element={<RoomDash />} />
            <Route path="dashboard" element={<RoomDashboard/>}/>
            <Route path=":roomId" element={<RoomDetails />} />
          </Route>
          <Route path="*" element={< NotFound/>} />
      </Routes>
      <Toaster position="top-center" />
      <ToastContainer />
    </BrowserRouter>
  )
}
export default App;
