// src/api/authApi.js
import createAxiosInstance from "./interceptor.js"
const authBaseUrl = import.meta.env.VITE_AUTH_BASE_URL
const authApi = createAxiosInstance(authBaseUrl);
export default authApi;


