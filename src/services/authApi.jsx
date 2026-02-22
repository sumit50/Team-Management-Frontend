import api from "../app/api";

export const loginApi = (data) => {
  const fullUrl = api.defaults.baseURL + "/user/login";
  console.log(" Making request to:", fullUrl);
  console.log(" Data:", data);
  console.log(" Headers:", api.defaults.headers);
  
  return api.post("/user/login", data).catch(error => {
    console.error(" Login Error:", error.response?.data);
    console.error(" Status:", error.response?.status);
    console.error(" Full error:", error);
    throw error;
  });
};


export const resetPasswordApi = (data) => {
  const fullUrl = api.defaults.baseURL + "/user/change-password";
  console.log(" Making password change request to:", fullUrl);
  console.log(" Data:", data);
  console.log(" Headers:", api.defaults.headers);
  
  return api.post("/user/change-password", data).catch(error => {
    console.error(" Password Change Error:", error.response?.data);
    console.error(" Status:", error.response?.status);
    console.error(" Full error:", error);
    throw error;
  });
};