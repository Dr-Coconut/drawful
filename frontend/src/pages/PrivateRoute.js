import React, { useEffect } from "react";
import { Navigate, Route, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authed = sessionStorage.getItem("token"); // isauth() returns true or false based on localStorage
  console.log(children);
  return authed ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
