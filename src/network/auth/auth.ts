import {handleResponseError, instance} from "@network/network.ts";
import {IError} from "@network/interfaces/network/error.ts";
import {AxiosError, AxiosResponse} from "axios";


export const signIn = async (email: string): Promise<{ message: string } | IError> => {
    try {
        const response: AxiosResponse<{ message: string }> = await instance.post(`auth/login?email=${email}`);

        if (response.status === 200) {
            return response.data;
        } else {
            // This block may never be reached as Axios throws on non-2xx responses
            const status = response.status;
            return handleResponseError(response.data.message, status);
        }
    } catch (error) {
        // Handle network errors or unexpected errors
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            // Axios response error handling
            const status = axiosError.response.status;
            return handleResponseError(axiosError.message, status);
        } else {
            // Handle other types of errors (e.g., network errors)
            console.error('SignIn error:', error);
            return {message: 'Произошла ошибка при попытке входа!', status: 500};
        }
    }
};

export const logout = async (): Promise<void> => {
    try {
        await instance.post('auth/log-out');
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};
