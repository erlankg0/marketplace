import axios from 'axios';

// Create axios instance
export const instance = axios.create({
    baseURL: 'https://smarttailor.xyz/api/',
    headers: {
        Accept: '*/*',
    },
});

// Interceptor to add Access token to every request
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to refresh token
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }
    try {
        const response = await axios.post(`https://smarttailor.xyz/api/auth/refresh-token?refreshToken=${refreshToken}`);
        localStorage.setItem('accessToken', response.data.accessToken);
        return response.data.accessToken;
    } catch (err) {
        console.error('Refresh token is invalid:', err);
        throw err;
    }
};

// Interceptor to handle response and refresh AccessToken if needed
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } catch (err) {
                // Optionally handle refresh token expiration here, e.g., redirect to login
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);