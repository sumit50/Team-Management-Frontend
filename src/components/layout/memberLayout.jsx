import React from "react";
import { Outlet } from "react-router-dom";
import MemberSidebar from "../sidebar/memberSidebar";

const MemberLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <MemberSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MemberLayout;
