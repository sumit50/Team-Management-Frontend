import React, {useState, useEffect} from "react";
import CreateTeamButton from "../../components/common/createTeamButton";
import {
  getAllTeamLeadersApi,
  deleteTeamLeaderApi,
} from "../../services/adminApi";
import toast from "react-hot-toast";

const Teams = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamLeaders();
  }, []);

  const fetchTeamLeaders = async () => {
    try {
      const response = await getAllTeamLeadersApi();
      console.log(response.data.teamLeaders, "=d");

      setTeamLeaders(response.data.teamLeaders);
    } catch (error) {
      console.error("Error fetching team leaders:", error);
      setTeamLeaders([]);
    } finally {
      setLoading(false);
    }
  };

  console.log(teamLeaders, "==tej");

  const handleDelete = async (leaderId) => {
    if (window.confirm("Are you sure you want to delete this team leader?")) {
      try {
        await deleteTeamLeaderApi(leaderId);
        toast.success("Team leader deleted successfully!");
        fetchTeamLeaders(); // Refresh the list
      } catch (error) {
        console.error("Error deleting team leader:", error);
        toast.error("Failed to delete team leader");
      }
    }
  };
  return (
    <div>
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
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : teamLeaders.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No team leaders found
                </td>
              </tr>
            ) : (
              teamLeaders.map((leader) => (
                <tr key={leader._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {leader.teamName || "Not Assigned"}
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
                        onClick={() => handleDelete(leader._id)}
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
    </div>
  );
};

export default Teams;
