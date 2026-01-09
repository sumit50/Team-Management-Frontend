import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import CreateTeamModal from "../../components/common/confirmModel";
import {createTeamLeaderApi} from "../../services/adminApi";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTeam = async (teamData) => {
    try {
      console.log("Creating team leader:", teamData);
      const response = await createTeamLeaderApi(teamData);
      console.log("Team leader created:", response.data);
      toast.success("Team leader created successfully!");
    } catch (error) {
      console.error("Error creating team leader:", error);
      toast.error(
        error.response?.data?.message || "Failed to create team leader"
      );
    }
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Teams</p>
          <h2 className="text-3xl font-bold">5</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Team Leads</p>
          <h2 className="text-3xl font-bold">3</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Members</p>
          <h2 className="text-3xl font-bold">18</h2>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Admin Actions</h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-gray-800">
            Create Team Leader
          </button>
          <button
            onClick={() => navigate("/admin/assign-team-leader")}
            className="bg-violet-600 text-white px-5 py-2 rounded-lg hover:bg-gray-800">
            Assign Leader to Team
          </button>
          <button
            onClick={() => navigate("/admin/teams")}
            className="bg-fuchsia-600 text-white px-5 py-2 rounded-lg hover:bg-gray-800">
            Team Leaders
          </button>
          <button className="bg-pink-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800">
            Manage Users
          </button>
        </div>
      </div>

      <CreateTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTeam}
      />
    </div>
  );
};

export default Dashboard;
