import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Privateroute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
    // console.log("rerenderesd")
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  if (!token) return null;

  return children ? children : <Outlet />;
};

export default Privateroute;
