import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (Component) => (props) => {
  const authState = useSelector((state) => state.auth.authState);
  useEffect(() => {
    if (!authState.isAuthenticated) {
      window.location.href = "/login";
    }
  }, [authState.isAuthenticated]);

  if(!authState.isAuthenticated) {
    return null
  }
  
  return <Component {...props} />;
};


export default withAuth;