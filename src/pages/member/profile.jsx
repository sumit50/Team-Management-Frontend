import React from "react";
import Breadcrumbs from "../../components/common/Breadcrumbs";

const MemberProfile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">My Profile</h1>
        <p className="text-slate-600">Manage your personal information</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{user?.name}</h2>
            <p className="text-slate-600">Team Member</p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <input
              type="text"
              value="Team Member"
              readOnly
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <input
              type="text"
              value="Development"
              readOnly
              className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-slate-600">Active</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Edit Profile
          </button>
          <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
