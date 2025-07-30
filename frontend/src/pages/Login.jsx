import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../operations/apiLogic'

import { Button } from "@/components/ui/button"
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

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    emailId: 'a@gmail.com',
    password: '12345678'
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(form.emailId, form.password, navigate))
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm py-2">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="emailId">Email</Label>
              <Input
                id="emailId"
                name="emailId"
                type="email"
                placeholder="you@example.com"
                value={form.emailId}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={changeHandler}
                required
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={submitHandler}>
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
            <Button variant="link" onClick={() => navigate('/signup')}>
              Dont have account? Sign Up
            </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
