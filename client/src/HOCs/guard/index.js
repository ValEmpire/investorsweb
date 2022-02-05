import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const guardedRoute = (OriginalComponent) => {
  const GuardedComponent = (props) => {
    const isAuthenticated = Cookies.get("isAuthenticated");

    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, navigate]);

    return <OriginalComponent {...props} />;
  };

  return GuardedComponent;
};

export default guardedRoute;
