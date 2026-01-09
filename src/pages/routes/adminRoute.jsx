import {Navigate} from "react-router-dom";
import {getToken, getUser} from "../utils/auth";

const AdminRoute = ({children}) => {
  const token = getToken();
  const user = getUser();

  if (!token || !user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
