import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated } = useAuth();
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Check if user has required role (if roles are specified)
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  // If authenticated and has required role, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;