
import {Link} from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function About() {
  return (
    <div className="flex flex-col items-center justify-between  h-screen dark:bg-gray-800">
      <main className="flex flex-col flex-1 w-full justify-center items-center bg-gray-100 py-12 md:py-24">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">About Us</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                We&apos;re on a mission to help teams build, deploy, and scale the best web experiences.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-3xl items-start gap-4 lg:max-w-5xl lg:grid-cols-2">
            <div className="flex flex-col items-center justify-center space-y-2 text-center lg:items-start lg:space-y-4 lg:text-left">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-3xl/relaxed lg:text-4xl xl:text-5xl">
                  Our Story
                </h2>
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Founded in 2020, our company started as a small team of developers with a big idea: to make the web
                  more accessible and enjoyable for everyone. Over the years, we&apos;ve grown into a global platform
                  that powers millions of websites, apps, and e-commerce experiences.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center lg:items-start lg:space-y-4 lg:text-left">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-3xl/relaxed lg:text-4xl xl:text-5xl">
                  Our Mission
                </h2>
                <p className="max-w-prose text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We believe in the power of the web to connect, inspire, and transform. Our mission is to empower
                  innovation by providing the tools and technologies that enable developers to build the future of the
                  internet.
                </p>
              </div>
            </div>
          </div>

          <div className="grid max-w-sm gap-4 mx-auto items-start sm:max-w-4xl sm:grid-cols-2 md:gap-8 lg:max-w-5xl lg:grid-cols-3">
            <div className="flex flex-col items-start space-y-2">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <address className="text-sm not-italic">225 Bush St, San Francisco, CA 94104</address>
              <a
                href="#"
                className="text-sm underline underline-offset-2 underline-thickness-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                +1 (415) 555-2671
              </a>
              <div className="flex items-center space-x-2 text-sm">
                <Link
                  href="#"
                  className="underline underline-offset-2 underline-thickness-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  prefetch={false}
                >
                  info@example.com
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-100 dark:border-gray-800">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Company. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}