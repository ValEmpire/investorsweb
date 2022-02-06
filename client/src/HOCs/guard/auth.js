// this higher order component will redirect to homepage
// no user can go to this page if he is already logged in
// example register page and login page

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const authRoute = (OriginalComponent) => {
  const LoginRegisterComponent = (props) => {
    const isAuthenticated = Cookies.get("isAuthenticated");

    const navigate = useNavigate();

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

    return <OriginalComponent {...props} />;
  };

  return LoginRegisterComponent;
};

export default authRoute;
