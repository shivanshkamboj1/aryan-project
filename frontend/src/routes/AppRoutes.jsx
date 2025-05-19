import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from '../screens/Home'
import Login from '../screens/Login'
import Signup from '../screens/Signup'


const AppRoutes = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default AppRoutes