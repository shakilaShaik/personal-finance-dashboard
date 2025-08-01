import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8002',
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Only handle 401 errors for specific endpoints
        if (error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/login') &&
            !originalRequest.url.includes('/auth/refresh-token')) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                const refreshResponse = await axios.get(
                    `${baseUrl_auth}/auth/refresh-token`,
                    { withCredentials: true }
                );

                // Store new token
                const newToken = refreshResponse.data.access_token;
                localStorage.setItem('access_token', newToken);

                // Retry original request
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // Redirect to login if refresh fails
                localStorage.removeItem('access_token');
                window.location.href = '/signin';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;