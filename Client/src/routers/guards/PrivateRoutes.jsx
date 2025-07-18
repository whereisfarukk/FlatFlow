import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    return isAuthenticated ? children : <Navigate to="/login" />;
};
