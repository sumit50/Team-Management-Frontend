import React, { useState, useEffect } from "react";
import CreateTeamButton from "../../components/common/createTeambutton.jsx";
import {
  getAllTeamLeadersApi,
  deleteTeamLeaderApi,
} from "../../services/adminApi";
import toast from "react-hot-toast";
import Breadcrumbs from "../../components/common/Breadcrumbs";
import RefreshButton from "../../components/common/refreshButton";
import { DeleteTeamLeaderModal } from "../../components/common/deleteModel";

const Teams = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    fetchTeamLeaders();
  }, []);

  const fetchTeamLeaders = async () => {
    try {
      const response = await getAllTeamLeadersApi(1, 100); // Get all team leaders
      console.log(response.data, "=d");

      // Handle paginated response structure
      const teamLeadersData = response.data.teamLeaders || response.data.data || response.data || [];
      setTeamLeaders(Array.isArray(teamLeadersData) ? teamLeadersData : []);
    } catch (error) {
      console.error("Error fetching team leaders:", error);
      setTeamLeaders([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  console.log(teamLeaders, "==tej");

  const handleDeleteClick = (leader) => {
    setSelectedLeader(leader);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedLeader && !isDeleting) {
      setIsDeleting(true);
      try {
        await deleteTeamLeaderApi(selectedLeader._id);
        toast.success("Team leader deleted successfully!");
        fetchTeamLeaders(); // Refresh the list
        setDeleteModalOpen(false);
        setSelectedLeader(null);
      } catch (error) {
        console.error("Error deleting team leader:", error);
        toast.error("Failed to delete team leader");
      } finally {
        setIsDeleting(false);
      }
    }
  };
  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <Breadcrumbs />


      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Leaders</h1>
        <CreateTeamButton />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Team Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Team Leader
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Members
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              // Skeleton Loading
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-slate-200 rounded w-24 skeleton"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-slate-200 rounded-full mr-3 skeleton"></div>
                      <div>
                        <div className="h-4 bg-slate-200 rounded w-20 mb-1 skeleton"></div>
                        <div className="h-3 bg-slate-200 rounded w-28 skeleton"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-slate-200 rounded w-8 skeleton"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 bg-slate-200 rounded-full w-16 skeleton"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-slate-200 rounded w-12 skeleton"></div>
                  </td>
                </tr>
              ))
            ) : teamLeaders.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No team leaders found
                </td>
              </tr>
            ) : (
              Array.isArray(teamLeaders) && teamLeaders.map((leader) => (
                <tr key={leader._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {leader.team?.name || leader.teamId?.name || leader.teamName || leader.team || "Not Assigned"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {leader.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {leader.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {leader.memberCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteClick(leader)}
                        className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      <DeleteTeamLeaderModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        teamLeader={selectedLeader}
      />
    </div>
  );
};

export default Teams;
