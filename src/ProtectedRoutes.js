import React, { useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {AccountContext} from './Components/Auth/Account';


const ProtectedRoutes = ({ component: Component, redirectPath, ...rest }) => {
  // Bypass authentication - always allow access
  return <Outlet />;
};

export default ProtectedRoutes;
