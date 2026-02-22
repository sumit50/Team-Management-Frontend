import React from "react";
import { Outlet } from "react-router-dom";
import TeamLeaderSidebar from "../sidebar/teamLeaderSidebar";

const TeamLeaderLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <TeamLeaderSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default TeamLeaderLayout;