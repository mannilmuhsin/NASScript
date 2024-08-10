// src/routes/protect.js

import React from "react";
import { Navigate } from "react-router-dom";

const Protect = ({ children }) => {
    console.log("protect");
  const isAuthenticated = !!localStorage.getItem("token2"); // Check if token exists

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Protect;
