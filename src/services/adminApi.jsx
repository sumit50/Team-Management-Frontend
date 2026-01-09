import api from "../app/api";
// GET ALL TEAMS
export const getAllTeamsApi = () => {
  return api.get("/admin/teams");
};

// CREATE TEAM
export const createTeamApi = (data) => {
  return api.post("/admin/team", data);
};

// GET ALL USERS
export const getAllUsersApi = () => {
  return api.get("/admin/users");
};

// CREATE TEAM LEADER
export const createTeamLeaderApi = (data) => {
  return api.post("/admin/create-team-leader", data);
};

// GET ALL TEAM LEADERS
export const getAllTeamLeadersApi = () => {
  return api.get("/admin/team-leaders");
};

// UPDATE TEAM LEADER
export const updateTeamLeaderApi = (id, data) => {
  return api.put(`/admin/team-leader/${id}`, data);
};

// DELETE TEAM LEADER
export const deleteTeamLeaderApi = (id) => {
  return api.delete(`/admin/delete-team-leader/${id}`);
};

// ASSIGN TEAM LEADER
export const assignTeamLeaderApi = (data) => {
  return api.post("/admin/assign-team-leader", data);
};
