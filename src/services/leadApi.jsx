import api from "../app/api";

// GET ALL TEAM MEMBERS
export const getAllTeamMembersApi = () => {
  return api.get("/lead/team-members");
};

// GET TEAM MEMBER BY ID
export const getTeamMemberByIdApi = (id) => {
  return api.get(`/lead/team-member/${id}`);
};

// ADD NEW TEAM MEMBER
export const addTeamMemberApi = (data) => {
  return api.post("/lead/add-member", data);
};

// UPDATE TEAM MEMBER
export const updateTeamMemberApi = (id, data) => {
  return api.put(`/lead/update-member/${id}`, data);
};

// REMOVE TEAM MEMBER
export const removeTeamMemberApi = (id) => {
  return api.delete(`/lead/remove-member/${id}`);
};

// GET TEAM PERFORMANCE STATS
export const getTeamPerformanceApi = () => {
  return api.get("/lead/team-performance");
};

// ASSIGN TASK TO TEAM MEMBER
export const assignTaskApi = (data) => {
  return api.post("/lead/assign-task", data);
};

// GET ALL TASKS FOR TEAM
export const getTeamTasksApi = () => {
  return api.get("/lead/team-tasks");
};

// UPDATE TASK STATUS
export const updateTaskStatusApi = (taskId, status) => {
  return api.put(`/lead/update-task/${taskId}`, { status });
};

// GET TEAM LEADER DASHBOARD DATA
export const getDashboardDataApi = () => {
  return api.get("/lead/dashboard");
};
