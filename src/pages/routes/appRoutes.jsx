import {Routes, Route, Navigate} from "react-router-dom";

// auth
import {LoginPage} from "../login.jsx/login";
// route guards
import AdminRoute from "./adminRoute";
import ProtectedRoute from "./protectedRoutes";

// layout
import AdminLayout from "../../components/layout/adminLayout";

// admin pages
import Dashboard from "../admin/dashboard";
import Users from "../admin/users";
import Teams from "../admin/teams";
import TeamDetails from "../admin/teamDetails";
import {AssignTeamLeader} from "../admin/assignTeam";

// lead pages
import MyTeam from "../lead/myTeam";

const AppRoutes = () => {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* LOGIN */}
      <Route path="/login" element={<LoginPage />} />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:id" element={<TeamDetails />} />
        <Route path="assign-team-leader" element={<AssignTeamLeader />} />
      </Route>

      {/* LEAD */}
      <Route
        path="/lead/my-team"
        element={
          <ProtectedRoute>
            <MyTeam />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
