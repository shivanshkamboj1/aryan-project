import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { NavbarLinks } from "../../data/navlinks";
import { logout } from "../../operations/apiLogic";

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch  = useDispatch()
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800">
        MyLogo
      </Link>
      
      {/* Links */}
      <div className="hidden md:flex gap-6">
        {NavbarLinks.map((nav, index) => (
          <Link
            key={index}
            to={nav.path}
            className={`text-gray-700 hover:text-indigo-600 transition-colors duration-200 ${
              location.pathname === nav.path ? 'font-semibold text-indigo-600' : ''
            }`}
          >
            {nav.title}
          </Link>
        ))}
      </div>

      {/* Auth Buttons / Dropdown */}
      <div className="flex items-center gap-4">
        {token ? (
          <button
            onClick={() => dispatch(logout(navigate))}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
