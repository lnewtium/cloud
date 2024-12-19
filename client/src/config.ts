export const DEV_MODE = !import.meta.env.PROD;
export const API_URL = DEV_MODE
  ? "http://localhost:5000/api"
  : "https://lnewtium.com/cloud/api/";
