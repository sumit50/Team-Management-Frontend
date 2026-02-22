import React from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import RefreshButton from "../../components/common/refreshButton";

const MemberTeam = () => {
  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Team Member Dashboard</h1>
        <p className="text-slate-600">Welcome to your team member portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">My Tasks</p>
              <h2 className="text-3xl font-bold text-slate-800">12</h2>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012 2m2 2h2a2 2 0 002-2M9 5a2 2 0 012 2m2 2h2a2 2 0 002-2m0 0h-2a2 2 0 00-2 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">Completed</p>
              <h2 className="text-3xl font-bold text-slate-800">8</h2>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium mb-1">Pending</p>
              <h2 className="text-3xl font-bold text-slate-800">4</h2>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberTeam;
