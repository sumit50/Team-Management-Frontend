import api from "../app/api";

export const loginApi = (data) => {
  const fullUrl = api.defaults.baseURL + "/user/login";
  console.log("🔗 Making request to:", fullUrl);
  console.log("📤 Data:", data);
  
  return api.post("/user/login", data);
};