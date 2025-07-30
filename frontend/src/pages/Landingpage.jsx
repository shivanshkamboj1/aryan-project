import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import About from "./About"
import { TextReveal } from "@/components/magicui/text-reveal";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Video from "../assets/v.mp4"
const LandingPage = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  return (
    <div >
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-5xl font-extrabold text-zinc-800 mb-4 text-center leading-tight tracking-tight ">
          <TypingAnimation>Welcome to Our App 🚀</TypingAnimation>
        </h1>
        <div className="flex flex-row items-center justify-center w-9/12 gap-12">
          <div className=" w-1/2">
            <p className="text-lg text-muted-foreground max-w-xl text-center mb-8">
              Collaborate, learn, and connect with ease. Create your own rooms or join existing ones to start your journey.
            </p>

            <div className="flex gap-4 justify-center">
              {!token ? (
                <>
                  <Button
                    className="bg-zinc-900 text-white hover:bg-zinc-800"
                    onClick={() => navigate("/signup")}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outline"
                    className="border-zinc-900 text-zinc-900 hover:bg-zinc-100"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="border-zinc-900 text-zinc-900 hover:bg-zinc-100"
                  onClick={() => navigate("/room")}
                >
                  Go to Room
                </Button>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <video src={Video} autoPlay muted loop playsInline className=" aspect-video" />
          </div>
        </div>
      </div>
        <TypingAnimation className=" text-center">Welcome to Our App 🚀</TypingAnimation>
        <TextReveal>Project will change the way you watch video.</TextReveal>
        <About/>
    </div>
  )
}

export default LandingPage
