import { Routes, Route, Navigate } from "react-router-dom";

// auth
import { LoginPage } from "../login.jsx/login";
// route guards
import AdminRoute from "./adminRoute";
import ProtectedRoute from "./protectedRoutes";

// layout
import AdminLayout from "../../components/layout/adminLayout";
import TeamLeaderLayout from "../../components/layout/teamLeaderlayout";

// admin pages
import Dashboard from "../admin/dashboard";
import Users from "../admin/users";
import Teams from "../admin/teams";
import TeamDetails from "../admin/teamDetails";
import { AssignTeamLeader } from "../admin/assignTeam";

// lead pages
import MyTeam from "../lead/my-Team";
import TeamMembers from "../lead/teamMembers";
import { TeamLeaderPasswordReset } from "../login.jsx/teamLeaderPasswordReset";

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

      {/* TEAM LEADER ROUTES */}
      <Route
        path="/lead"
        element={
          <ProtectedRoute>
            <TeamLeaderLayout />
          </ProtectedRoute>
        }>
        <Route index element={<Navigate to="/lead/my-team" replace />} />
        <Route path="my-team" element={<MyTeam />} />
        <Route path="team-members" element={<TeamMembers />} />
        <Route path="tasks" element={<div className="p-6"><h1 className="text-2xl font-bold">Tasks Page - Coming Soon</h1></div>} />
        <Route path="change-password" element={<TeamLeaderPasswordReset />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl font-bold">Page Not Found</h1></div>} />
    </Routes>
  );
};

export default AppRoutes;
