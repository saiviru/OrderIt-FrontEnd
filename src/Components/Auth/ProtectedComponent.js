import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './GlobalStates';

function ProtectedComponent({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
    console.log("are you authenticated?",isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}

export default ProtectedComponent;