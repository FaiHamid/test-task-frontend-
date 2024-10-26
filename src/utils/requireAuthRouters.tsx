import React from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUsersContext } from '../controllers/useUsersContext';

export const RequireAuth: React.FC = () => {
  const { currentUser } = useUsersContext();
  const { pathname } = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ pathname }}/>;
  }

  return <Outlet />;
};