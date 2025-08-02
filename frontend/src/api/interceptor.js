import axios from "axios";

// Main Axios instance
const authAxios = axios.create({
    baseURL: "http://localhost:8002",
    withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

// Call all subscribers once new token is available
const onRefreshed = (newToken) => {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
};

// Add Authorization header to each request using token from localStorage
authAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Handle 401/403 and trigger refresh logic
authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Prevent infinite retry loops
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
                    const res = await axios.post(
                        "http://localhost:8002/auth/refresh-token",
                        {},
                        { withCredentials: true }
                    );

                    const newToken = res.data.access_token;
                    console.log("✅ Token refreshed:", newToken);

                    // Save new token to localStorage
                    localStorage.setItem("access_token", newToken);

                    onRefreshed(newToken);
                } catch (err) {
                    console.error("❌ Token refresh failed:", err);
                    isRefreshing = false;
                    return Promise.reject(err);
                }
                isRefreshing = false;
            }

            // Queue other requests while refresh is in progress
            return new Promise((resolve) => {
                refreshSubscribers.push((newToken) => {
                    originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                    resolve(authAxios(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default authAxios;
