// src/routes/RoleBasedRoute.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (user && allowedRoles.includes(role)) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default RoleBasedRoute;
