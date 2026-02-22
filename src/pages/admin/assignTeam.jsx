import React from "react";
import {getAllTeamLeadersApi, getAllTeamsApi} from "../../services/adminApi";
import {useState, useEffect} from "react";
import {assignTeamLeaderApi} from "../../services/adminApi";
import toast from "react-hot-toast";
import Breadcrumbs from "../../components/common/Breadcrumbs";

export const AssignTeamLeader = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamAssignments, setTeamAssignments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamLeaders();
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await getAllTeamsApi(1, 100); // Get all teams
      console.log("Teams API response:", response);
      console.log("Teams data:", response.data);

      // Handle paginated response structure
      const teamsData = response.data.teams || response.data.data || response.data || [];
      setTeams(Array.isArray(teamsData) ? teamsData : []);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeams([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamLeaders = async () => {
    try {
      const response = await getAllTeamLeadersApi(1, 100); // Get all team leaders
      console.log(response.data, "==assign");
      
      // Handle paginated response structure
      const teamLeadersData = response.data.teamLeaders || response.data.data || response.data || [];
      setTeamLeaders(Array.isArray(teamLeadersData) ? teamLeadersData : []);
    } catch (error) {
      console.error("Error fetching team leaders:", error);
      setTeamLeaders([]); // Set empty array on error
    }
  };

  const handleTeamSelect = (leaderId, teamValue) => {
    setTeamAssignments((prev) => ({
      ...prev,
      [leaderId]: teamValue,
    }));
  };

  const handleAssign = async (leaderId) => {
    const teamId = teamAssignments[leaderId];
    if (!teamId) return;

    try {
      const response = await assignTeamLeaderApi({
        leaderId: leaderId,
        teamId: teamId,
      });
      toast.success("Team assigned successfully!");
      console.log("Team assigned successfully:", response.data.team);
    } catch (error) {
      console.error("Error assigning team:", error);
      toast.error("Failed to assign team");
    }
  };

  console.log(teamLeaders, "==assignTej");
  console.log(teams, "==teams in state");

  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Assign Team Leader</h1>
        <p className="text-slate-600">Assign team leaders to their respective teams</p>
      </div>

      <div className="card rounded-lg overflow-hidden">
        <div className="table-header px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Team Assignments</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="table-header">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Team Leader
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Team Selection
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                // Skeleton Loading
                [...Array(5)].map((_, index) => (
                  <tr key={index} className="table-row">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-200 rounded-full mr-3 skeleton"></div>
                        <div>
                          <div className="h-4 bg-slate-200 rounded w-24 mb-2 skeleton"></div>
                          <div className="h-3 bg-slate-200 rounded w-32 skeleton"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-8 bg-slate-200 rounded w-full skeleton"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-8 bg-slate-200 rounded w-20 skeleton"></div>
                    </td>
                  </tr>
                ))
              ) : teamLeaders.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-slate-500">
                    No team leaders found
                  </td>
                </tr>
              ) : (
                teamLeaders.map((leader) => (
                  <tr key={leader._id} className="table-row">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-semibold mr-3">
                          {leader.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{leader.name}</div>
                          <div className="text-sm text-slate-500">{leader.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={teamAssignments[leader._id] || ""}
                        onChange={(e) => handleTeamSelect(leader._id, e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-slate-900">
                        <option value="">Select Team</option>
                        {Array.isArray(teams) && teams.map((team) => (
                          <option key={team._id || team.name} value={team._id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleAssign(leader._id)}
                        disabled={!teamAssignments[leader._id]}
                        className="btn-primary text-white px-4 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                        Assign
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
