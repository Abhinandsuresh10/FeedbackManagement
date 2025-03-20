import { useUserStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import React from "react";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useUserStore();

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} />;
  }

  return <>{children}</>;
};

export default PublicRoute;