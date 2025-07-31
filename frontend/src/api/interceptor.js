// src/common/api.js
import axios from "axios";

// Create Axios instance without a fixed baseURL
export const api = axios.create({
    withCredentials: true,
});

// Add access token to headers automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle expired token and retry request
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/login")
        ) {
            originalRequest._retry = true;

            try {
                // Important: Use the refresh endpoint on the auth service
                await axios.post("http://localhost:8002/auth/refresh-token", null, {
                    withCredentials: true,
                });

                const newToken = localStorage.getItem("access_token");
                if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }

                return api(originalRequest);
            } catch (err) {
                window.location.href = "/signin";
            }
        }

        return Promise.reject(error);
    }
);
