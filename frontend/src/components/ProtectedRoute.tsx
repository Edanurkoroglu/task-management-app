import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store';
import type { AuthState } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth as AuthState);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
