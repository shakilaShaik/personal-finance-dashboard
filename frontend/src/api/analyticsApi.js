import createAxiosInstance from "./interceptor.js"
const analyticsBaseUrl = import.meta.env.VITE_ANALYTICS_BASE_URL
const analyticsApi = createAxiosInstance(analyticsBaseUrl)
export default analyticsApi

