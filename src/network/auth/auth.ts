import {instance} from "@network/network.ts";

export const signIn = async (email: string) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        const response = await instance.post('/accounts/auth/login', formData);
        console.log('Login successful', response.data);
        return response.data; // Возвращаем данные, если нужно использовать их в компоненте
    } catch (error) {
        console.error('Login error', error);
        throw error; // Ловим ошибку для дальнейшей обработки
    }
};
