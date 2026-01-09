import api from "../app/api";

// GET MY TEAM
export const getMyTeamApi = () => {
  return api.get("/team/my-team");
};

// ADD MEMBER TO TEAM
export const addMemberApi = (data) => {
  return api.post("/team/add-member", data);
};



