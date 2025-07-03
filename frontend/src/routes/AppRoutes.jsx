import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from '../screens/Home'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import OAuthSuccess from '../components/core/OAuth'
import OpenRoute from '../components/core/auth'
import NotFound from '../screens/NotFound'
import Pending from '../screens/Pending'
import RoomDetails from '../components/core/RoomDetails'
import RoomDash from '../components/core/RoomDash'
import RoomDashboard from '../components/core/RoomDashboard'
import Privateroute from '../components/core/Privateroute'
const AppRoutes = () => {
  return (
    <div>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={
                <OpenRoute>
                  <Login/>
                </OpenRoute>
              }/>
              <Route path='/signup' element={                
                <OpenRoute>
                  <Signup/>
                </OpenRoute>}/>
              <Route path="/oauth-success" element={<OAuthSuccess/>} />
              <Route path="/pending" element={< Pending/>} />
              <Route path="/room" element={<Privateroute />}>
                <Route index element={<RoomDash />} />
                <Route path="dashboard" element={<RoomDashboard/>}/>
                <Route path=":roomId" element={<RoomDetails />} />
              </Route>
              <Route path="*" element={< NotFound/>} />
          </Routes>
    </div>
  )
}

export default AppRoutes