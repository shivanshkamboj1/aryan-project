import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Google from './Google'
import { apiConnector } from '../Apis/apiconnector'
import { useDispatch } from 'react-redux'
import { login } from '../operations/apiLogic'

const Login = () => {
    const dispath  = useDispatch()
    const navigate = useNavigate()
    const [form,setForm]=useState({
        emailId:'a@gmail.com',
        password:'12345678'
    })
    const changehandler=(event)=>{
        const {name,value}=event.target
        setForm((prev)=>({
            ...prev,[name]:value
        }))
    }
    const submithandler = (event)=>{
        event.preventDefault()
        dispath(login(form.emailId,form.password,navigate))
    }
    return (
        <div >
            <form onSubmit={submithandler}>
                <label htmlFor='emailId'>email id</label>
                <input id='emailId 'name='emailId' value={form.emailId} onChange={changehandler}/>
                <label htmlFor='password'>password</label>
                <input id='password'name='password' value={form.password} onChange={changehandler}/>
                <button type='submit'>submit</button>
            </form>
            
        </div>
    )
}

export default Login