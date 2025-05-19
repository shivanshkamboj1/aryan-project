import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './context/userContext'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
      <ToastContainer />
    </UserProvider>
  )
}
export default App;
