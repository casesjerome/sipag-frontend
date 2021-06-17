import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userDetails, setUserDetails] = useState({});
  const login = useCallback((tkn, userId, username, expirationDate) => {   
    setToken(tkn);
    setUserDetails({ _id: userId, username: username });
    const tokenExpiration =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 1440);      
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: tkn,
        userId: userId,
        username: username,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);    
    localStorage.removeItem("userData");       
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {        
      const remainingTime = tokenExpirationDate.getTime() - new Date();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.token,
        storedData.userId,
        storedData.username,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userDetails };
};
