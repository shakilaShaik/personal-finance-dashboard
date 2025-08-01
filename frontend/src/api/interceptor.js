import axios from "axios";

export const api = axios.create({
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Only handle 401 errors for non-login requests
        if (error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/login")) {
            originalRequest._retry = true;

            try {
                // Refresh token request
                const refreshResponse = await axios.post(
                    "http://localhost:8002/auth/refresh-token",
                    {},
                    { withCredentials: true }
                );

                // Store new access token
                const newAccessToken = refreshResponse.data.access_token;
                localStorage.setItem("access_token", newAccessToken);

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // Clear tokens and redirect to login if refresh fails
                localStorage.removeItem("access_token");
                window.location.href = "/signin";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);