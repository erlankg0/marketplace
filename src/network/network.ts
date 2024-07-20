import axios from 'axios';
import {logout} from "@network/auth/auth.ts";
import {useAddDispatch} from "@redux/hooks.ts";
import {logout as logoutRedux} from "@redux/slices/auth.ts"

export const instance = axios.create({
    baseURL: 'https://smarttailor.xyz/api/',
    headers: {
        Accept: '*/*',
    },
});

// Интерспетор для добавления Access токена к каждому запросу
instance.interceptors.request.use((config) => {
    console.log(localStorage.getItem('accessToken'))
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    // Логика для выхода пользователя или обновления токенов
    const dispatch = useAddDispatch();
    dispatch(logoutRedux());
    logout()
    return Promise.reject(error)
});

// Интерсептор для обработки ответа и обновления AccessToken при необходимости
instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const {data} = await instance.post(`auth/refresh-token?refreshToken${refreshToken}`, {token: refreshToken});
                    localStorage.setItem('accessToken', data.accessToken);
                    instance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
                    return instance(originalRequest);
                } catch (err) {
                    console.error('Refresh token is invalid:', err);
                    // Логика для выхода пользователя или обновления токенов
                    const dispatch = useAddDispatch();
                    dispatch(logoutRedux());
                    logout()
                }
            }
        }
        return Promise.reject(error);
    }
);