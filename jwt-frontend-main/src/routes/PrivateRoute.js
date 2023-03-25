import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
const PrivateRoute = () => {
  const { user } = useContext(UserContext);
  // useEffect(() => {
  //   // let seesion = sessionStorage.getItem("account");
  //   // if (!seesion)
  // }, []);
  if (user.isAuthenticated) {
    return <Outlet></Outlet>;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
};

export default PrivateRoute;
