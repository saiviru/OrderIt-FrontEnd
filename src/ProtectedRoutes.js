import React, { useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {AccountContext} from './Components/Auth/Account';


const ProtectedRoutes = ({ component: Component, redirectPath, ...rest }) => {
  const dispatch = useDispatch();
  const {getSession} = useContext(AccountContext);

  const location = useLocation();
  const navigate = useNavigate();
  let session = getSession();
  console.log("the user serrion:",localStorage.getItem("token"))
  const token = localStorage.getItem("token");
  try{
    if(token){
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      session = JSON.parse(window.atob(base64));
      console.log("the session:",session,localStorage.getItem("token"));
    }
  }
  catch(e){
    console.log(e)
  }
//   if(session){
//     return session.exp > Date.now() / 1000
//     ? <Outlet />
//     : <Navigate to="/login" replace />
//   }
//   else{
//     return <Navigate to="/login" replace />
//   }

if (session && session.exp > Date.now() / 1000) {
    console.log("who is who? true",session)
    return <Outlet />;
  } else {
    console.log("who is who?",redirectPath);
    const currentPath = location.pathname;
    return <Navigate to={redirectPath} replace  state= { currentPath }/>;
  }
  
};

export default ProtectedRoutes;
