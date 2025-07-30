// src/common/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8002"; // Change as needed

// Create Axios instance
export const api = axios.create({
    baseURL: BASE_URL,
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

        // If unauthorized and not already retried
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/login")
        ) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                await axios.post(`${BASE_URL}/refresh-token`, null, {
                    withCredentials: true,
                });

                // Retry original request with new token
                const newToken = localStorage.getItem("access_token");
                if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }
                return api(originalRequest);
            } catch {
                // Refresh failed, redirect to login
                window.location.href = "/signin";
            }
        }

        return Promise.reject(error);
    }
);
