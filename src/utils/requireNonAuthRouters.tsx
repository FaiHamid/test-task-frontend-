import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUsersContext } from "../controllers/useUsersContext.js";

interface Props {
  children?: React.ReactNode;
}

export const RequireNonAuth: React.FC<Props> = ({ children }) => {
  const { currentUser } = useUsersContext();
  const { state } = useLocation();

  if (currentUser) {
    
    return <Navigate to={state ? state.pathname : "/companies"} replace />;
  }

  return children || <Outlet />;
};
