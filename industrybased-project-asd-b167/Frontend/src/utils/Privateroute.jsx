import { Navigate,Outlet } from "react-router-dom"

const Privateroute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet/> :<Navigate to="/login"/>;
};

export default Privateroute