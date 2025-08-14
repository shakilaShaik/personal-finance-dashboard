// src/utils/createAxiosInstance.js
import axios from "axios";

let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = (newToken) => {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
};
const BASE_URL = import.meta.env.VITE_AUTH_BASE_URL

const createAxiosInstance = (baseURL) => {
    const instance = axios.create({
        baseURL,
        withCredentials: true,
    });

    instance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (
                error.response &&
                (error.response.status === 401 || error.response.status === 403) &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                console.log("🔁 Interceptor: Detected expired token. Refreshing...");

                if (!isRefreshing) {
                    isRefreshing = true;
                    try {
                        // Always use AUTH service for refreshing token
                        const res = await axios.post(
                            "BASE_URL/auth/refresh-token",
                            {},
                            { withCredentials: true }
                        );

                        const newToken = res.data.access_token;
                        console.log("✅ Token refreshed:", newToken);
                        localStorage.setItem("access_token", newToken);

                        onRefreshed(newToken);
                    } catch (err) {
                        console.error("❌ Token refresh failed:", err);
                        isRefreshing = false;
                        return Promise.reject(err);
                    }
                    isRefreshing = false;
                }

                return new Promise((resolve) => {
                    refreshSubscribers.push((newToken) => {
                        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                        resolve(instance(originalRequest));
                    });
                });
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export default createAxiosInstance;
