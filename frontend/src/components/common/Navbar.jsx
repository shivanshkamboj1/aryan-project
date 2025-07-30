import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { NavbarLinks } from "../../data/navlinks";
import { logout } from "../../operations/apiLogic";
import { MenubarDemo } from "./Menudemo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

function ListItem({ title, children, href, ...props }) {
return (
  <li {...props}>
    <NavigationMenuLink asChild>
      <Link to={href}>
        <div className="text-sm leading-none font-medium">{title}</div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
)
}

function Navbar() {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch  = useDispatch()

  return (

    <nav className="flex w-9/12  justify-between mx-auto">
      
      {/* Logo */}
      <Link
        to="/"
        className= "text-2xl font-bold "
      >MyLogo
      </Link>

        <NavigationMenu viewport={false}>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/" className=" text-3xl">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {user&&<NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link to="/room">Room</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
}
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>List</NavigationMenuTrigger>
            <NavigationMenuContent >
              <ul className="grid w-[300px] gap-4 ">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#">
                      <div className="font-medium">Components</div>
                      <div className="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="#">
                      <div className="font-medium">Documentation</div>
                      <div className="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

          <NavigationMenuItem>
            <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/menu">Components</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="#">Documentation</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="#">Blocks</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {user?
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <img src={user.photoUrl} width={"20px"} height={"20px"} style={{ padding: "px" }}/>
              {user.firstName}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="#" className="flex-row items-center gap-2">
                      <CircleHelpIcon />
                      Edit Profile
                    </Link>
                  </NavigationMenuLink>
                  {/* <NavigationMenuLink asChild>
                    <Link to="#" className="flex-row items-center gap-2">
                      <CircleIcon />
                      To Do
                    </Link>
                  </NavigationMenuLink> */}
                  <NavigationMenuLink asChild>
                    <Link className="flex-row items-center gap-2" onClick={()=>dispatch(logout())}>
                      <CircleCheckIcon />
                      LOGOUT
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>:
          <NavigationMenuItem>
            <NavigationMenuTrigger>Login/Signup</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link to="/login" className="flex-row items-center gap-2">
                      <CircleHelpIcon />
                      Login
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/signup" className="flex-row items-center gap-2">
                      <CircleIcon />
                      Signup
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          }
        </NavigationMenuList>
      </NavigationMenu>

    </nav>
  )
}

export default Navbar
