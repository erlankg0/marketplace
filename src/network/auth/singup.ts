import {handleResponseError, instance} from "@network/network.ts";
import {IRegister} from "@network/interfaces/auth/register.ts";
import {AxiosError, AxiosResponse} from "axios";
import {IError} from "@network/interfaces/network/error.ts";

export const signUp = async (data: IRegister): Promise<{ message: string } | IError> => {
    const {email, lastName, firstName, patronymicName, phoneNumber} = data;
    const payload = {
        email,
        surname: lastName,
        name: firstName,
        phoneNumber,
        patronymic: patronymicName
    };

    try {
        const response: AxiosResponse<{ message: string }> = await instance.post('/auth/sign-up', payload);
        if (response.status === 201) {
            return response.data;
        } else {
            const status = response.status;
            return handleResponseError('', status);
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
            console.error('SignUp error:', error);
            return {message: 'Произошла ошибка при попытке регистрации!', status: 500};
        }
    }
};
