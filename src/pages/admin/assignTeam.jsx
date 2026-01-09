import React from "react";
import {getAllTeamLeadersApi, getAllTeamsApi} from "../../services/adminApi";
import {useState, useEffect} from "react";
import {assignTeamLeaderApi} from "../../services/adminApi";
import toast from "react-hot-toast";

export const AssignTeamLeader = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamAssignments, setTeamAssignments] = useState({});

  useEffect(() => {
    fetchTeamLeaders();
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await getAllTeamsApi();
      console.log("Teams API response:", response);
      console.log("Teams data:", response.data);

      // Handle different possible response structures
      const teamsData = response.data.teams || response.data || [];
      setTeams(teamsData);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const fetchTeamLeaders = async () => {
    try {
      const response = await getAllTeamLeadersApi();
      console.log(response.data.teamLeaders, "==assign");
      setTeamLeaders(response.data.teamLeaders);
    } catch (error) {
      console.error("Error fetching team leaders:", error);
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
      console.log("Team assigned successfully:", response.data.team);
    } catch (error) {
      console.error("Error assigning team:", error);
    }
  };

  console.log(teamLeaders, "==assignTej");
  console.log(teams, "==teams in state");

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Assign Team Leader</h1>
        <p>This is the Assign Team Leader page.</p>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              {" "}
              Team leader
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Team Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {teamLeaders.map((leader) => (
            <tr key={leader._id}>
              <td className="px-6 py-4 whitespace-nowrap">{leader.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={teamAssignments[leader._id] || ""}
                  onChange={(e) => handleTeamSelect(leader._id, e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm">
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleAssign(leader._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm">
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
