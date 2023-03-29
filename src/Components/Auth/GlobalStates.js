import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);

  const login = (token) => {
    console.log("the login token,", token)
    setIsAuthenticated(true);
    setUserToken(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userToken, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;