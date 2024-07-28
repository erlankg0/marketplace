import axios from 'axios';

// Create axios instance
export const instance = axios.create({
    baseURL: 'https://smarttailor.xyz/api/',
    headers: {
        Accept: '*/*',
    },
});

// Interceptor to add Access token to every request
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


// Function to refresh token
const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
        throw new Error('No refresh token available');
    }
    try {
        console.log('log')
        const {data} = await instance.post(`auth/refresh-token?refreshToken=${refreshToken}`);
        localStorage.setItem('accessToken', data.accessToken);
        console.log(data.accessToken)
        return data.accessToken;
    } catch (err) {
        console.error('Refresh token is invalid:', err);
        throw err;
    }
};

// Interceptor to handle response and refresh AccessToken if needed
instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log('refresh')
            try {
                const newAccessToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);
