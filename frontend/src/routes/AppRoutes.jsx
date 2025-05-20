import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from '../screens/Home'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import OAuthSuccess from '../components/OAuth'


const AppRoutes = () => {
  useEffect(()=>{

  },[])
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path="/oauth-success" element={<OAuthSuccess/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes