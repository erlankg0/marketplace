import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://142.93.104.229:8808',
    headers: {
        Accept: '*/*',
        "Content-Type": 'application/json'
    }
})

// Интерспетор для добавления Access тоена к каждому запросу
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error)
})

// Интерсептор дляо обработки ответа и обновления AccessToken при необхоидмости
instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const { data } = await instance.post(`/auth/refresh?refreshToken=${refreshToken}`, { token: refreshToken });
                    localStorage.setItem('accessToken', data.accessToken);
                    instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                    return instance(originalRequest);
                } catch (err) {
                    console.error('Refresh token is invalid:', err);
                    // Логика для выхода пользователя или обновления токенов
                }
            }
        }
        return Promise.reject(error);
    }
);