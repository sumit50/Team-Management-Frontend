import api from "../app/api";
// GET ALL TEAMS
export const getAllTeamsApi = (page = 1, limit = 10) => {
  return api.get(`/team/teams?page=${page}&limit=${limit}`);
};

// CREATE TEAM
export const createTeamApi = (data) => {
  return api.post("/admin/team", data);
};

// GET ALL USERS
export const getAllUsersApi = (page = 1, limit = 10, role = null, search = null) => {
  let url = `/user/users?page=${page}&limit=${limit}`;
  if (role) url += `&role=${role}`;
  if (search) url += `&search=${search}`;
  return api.get(url);
};
// Usually the best approach
export const registerUserApi = (data) => {
  return api.post("/user/register", data);
};



// CREATE TEAM LEADER
export const createTeamLeaderApi = (data) => {
  return api.post("/admin/create-team-leader", data);
};

// GET ALL TEAM LEADERS
export const getAllTeamLeadersApi = (page = 1, limit = 10) => {
  return api.get(`/admin/team-leaders?page=${page}&limit=${limit}`);
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
