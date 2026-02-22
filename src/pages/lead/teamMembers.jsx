import React, { useState, useEffect } from "react";
import { getAllTeamMembersApi, addTeamMemberApi, removeTeamMemberApi } from "../../services/leadApi";
import toast from "react-hot-toast";
import RefreshButton from "../../components/common/refreshButton";
import CreateTeamButton from "../../components/common/createTeambutton";
import { memo, useCallback } from "react";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const memberTeam = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "member",
      status: "active"
    },
    {
      _id: "2",
      name: "Jane Doe",
      email: "jane@example.com",
      role: "member",
      status: "active"
    },
    {
      _id: "3",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "member",
      status: "active"
    }
  ];



  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTeamMembers(memberTeam);
    } catch (error) {
      toast.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  }, []);



  const handleRemoveMember = async (id) => {
    try {
      await removeTeamMemberApi(id);
      toast.success("Team member removed successfully");
      fetchTeamMembers();
    } catch (error) {
      toast.error("Failed to remove team member");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <div className="flex gap-2">
          <CreateTeamButton
            customTrigger={
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                + Add Member
              </button>
            }
          />
          <RefreshButton onRefresh={fetchTeamMembers} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-slate-200 rounded w-24 skeleton"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-slate-200 rounded w-32 skeleton"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-slate-200 rounded w-16 skeleton"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 bg-slate-200 rounded-full w-16 skeleton"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-slate-200 rounded w-12 skeleton"></div>
                  </td>
                </tr>
              ))
            ) : teamMembers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No team members found
                </td>
              </tr>
            ) : (
              teamMembers.map((member) => (
                <tr key={member._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div >
  );
};

export default memo(TeamMembers);
