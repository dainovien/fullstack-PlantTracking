import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(accessToken);
    const isExpired = decoded.exp * 1000 < Date.now();
    
    if (isExpired) {
      return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
  } catch (error) {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;