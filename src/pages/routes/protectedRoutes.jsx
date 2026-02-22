import { Navigate } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const user = getUser();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If no user data, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
