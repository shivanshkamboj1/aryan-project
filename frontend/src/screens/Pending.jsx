import React from 'react'
import { useNavigate } from 'react-router-dom'

const Pending = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>pending</h2>
      <button className='border border-black' onClick={()=>navigate('/')}>go to home</button>

    </div>
  )
}

export default Pending