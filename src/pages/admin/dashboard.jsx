import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateTeamButton from "../../components/common/createTeambutton";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import RefreshButton from "../../components/common/refreshButton";

import Quote from "../../components/common/Quote";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleCardNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-600">
            Welcome to the Team Management System
          </p>
        </div>
        <div className="flex gap-2">
          <RefreshButton />
          <Quote />
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {loading ? (
          // Skeleton Loading for Stats
          [...Array(3)].map((_, index) => (
            <div key={index} className="card p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-slate-200 rounded w-20 mb-2 skeleton"></div>
                  <div className="h-8 bg-slate-200 rounded w-12 skeleton"></div>
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-lg skeleton"></div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="card p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">
                    Total Teams
                  </p>
                  <h2 className="text-3xl font-bold text-slate-800">5</h2>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Original Cards - Added Back */}

            <div className="card p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">
                    Team Leads
                  </p>
                  <h2 className="text-3xl font-bold text-slate-800">3</h2>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium mb-1">
                    Members
                  </p>
                  <h2 className="text-3xl font-bold text-slate-800">18</h2>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="card p-6 rounded-lg">
        {loading ? (
          // Skeleton Loading for Actions
          <>
            <div className="h-6 bg-slate-200 rounded w-32 mb-6 skeleton"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="h-12 bg-slate-200 rounded-lg skeleton"></div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <CreateTeamButton
                customTrigger={
                  <button
                    className="btn-primary text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Create Team Leader/User</span>
                  </button>
                }
              />




              <button
                onClick={() => navigate("/admin/assign-team-leader")}
                className="btn-secondary text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span>Assign Leader</span>
              </button>
              <button
                onClick={() => navigate("/admin/teams")}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Team Leaders</span>
              </button>
              <button
                onClick={() => navigate("/admin/users")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Manage Users</span>
              </button>
            </div>
            {/* Original Cards - Added Back */}
          </>
        )}
      </div>


    </div>
  );
};

export default Dashboard;
