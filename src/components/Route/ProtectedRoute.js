import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading) {
    // Render loading indicator if authentication status is being determined
    return null;
  }

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Element />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default ProtectedRoute;
