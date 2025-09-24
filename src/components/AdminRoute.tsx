import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { state } = useAuth();
  
  // If we are still determining the user state, you might want to show a loader
  // For now, we check directly.
  
  // First, check if there is a user logged in at all
  if (!state.user) {
    // Redirect them to the login page, but save the current location they were
    // trying to go to. This allows us to send them back after login.
    return <Navigate to="/login" />;
  }

  // Then, check if the logged-in user has the 'admin' role
  if (state.user.role !== 'admin') {
    // If not an admin, redirect them to the home page.
    return <Navigate to="/" />;
  }

  // If the user is logged in AND is an admin, show the protected page
  return <>{children}</>;
};

export default AdminRoute;