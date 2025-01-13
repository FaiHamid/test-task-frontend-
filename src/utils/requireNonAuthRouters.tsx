import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { currentUserQuery } from "../reactQuery/userQuery";
import { CustomLoader } from "../components/customLoader";

interface Props {
  children?: React.ReactNode;
}

export const RequireNonAuth: React.FC<Props> = ({ children }) => {
  const { state } = useLocation();
  const { data: currentUser, isLoading } = useQuery(currentUserQuery);

  if (isLoading) {
    <CustomLoader loaderSize={30} paddingY={50}/>
  }

  if (currentUser) {
    return <Navigate to={state ? state.pathname : "/companies"} replace />;
  }

  return children || <Outlet />;
};
