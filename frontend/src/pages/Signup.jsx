import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSignupData } from '../../../frontend/src/slices/authSlice'
import { signUp } from '../operations/apiLogic'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(setSignupData(data))
    dispatch(signUp(data.firstName, data.lastName, data.emailId, data.password, navigate))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg py-2">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            Fill in the details below to get started.
          </CardDescription>
        </CardHeader>

        <form onSubmit={submitHandler} className=' py-0'>
          <CardContent className="flex flex-col gap-3">
            {/* First and Last Name side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="emailId">Email</Label>
              <Input
                id="emailId"
                name="emailId"
                type="email"
                value={data.emailId}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>


          <CardFooter className="flex-col gap-2 mt-2">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <Button variant="outline" className="w-full">
              Sign Up with Google
            </Button>
            <Button variant="link" onClick={() => navigate('/login')}>
              Already have an account? Log in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default Signup
