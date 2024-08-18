import {handleResponseError, instance} from "@network/network.ts";
import axios, {AxiosResponse} from "axios";
import {ICards} from "@network/interfaces/basic.ts";
import {IError} from "@network/interfaces/network/error.ts";
import {AxiosError} from "axios";
import {IData} from "@network/interfaces/response/service.ts";

export const getAllEquipment = async (pageNo: number = 0, pageSize: number = 18): Promise<ICards | IError> => {
    const response: AxiosResponse<ICards> = await instance.get(`equipment/get-all-equipments?pageNumber=${pageNo}&pageSize=${pageSize}`)
    if (response.status == 200) {
        return response.data
    } else {
        const status = response.status;
        switch (status) {
            case 401:
                return {message: 'Требуется авторизация!', status};
            case 403:
                return {message: 'Нет доступа!', status};
            default:
                return {message: 'Не известная ошибка!', status};
        }
    }
}

export const getEquipmentById = async (id: number | string): Promise<IData | IError> => {
    try {
        const response: AxiosResponse<IData> = await instance.get(`equipment/get-equipment-detailed/${id}`)
        if (response.status == 200) {
            return response.data;
        } else {
            return handleResponseError(response.statusText, response.status);
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        return handleResponseError(axiosError.message, axiosError.response?.status);
    }
}

export const getMyEquipments = async (pageNo: number = 0, pageSize: number = 18): Promise<ICards | IError> => {
    const response: AxiosResponse<ICards> = await instance.get(`equipment/my-equipments?pageNumber=${pageNo}&pageSize=${pageSize}`);
    if (response.status == 200) {
        return response.data
    } else {
        const status = response.status;
        switch (status) {
            case 401:
                return {message: 'Требуется авторизация!', status};
            case 403:
                return {message: 'Нет доступа!', status};
            case 404:
                return {message: 'Нет оборудования...', status};
            default:
                return {message: 'Не известная ошибка!', status};
        }
    }

}

export const searchEquipment = async (query: string, pageNo: number = 0, pageSize: number = 18): Promise<ICards | IError> => {
    const response: AxiosResponse<ICards> = await instance.get(`equipment/search-equipment?query=${query}&pageNumber=${pageNo}&pageSize=${pageSize}`);
    if (response.status == 200) {
        return response.data
    } else {
        const status = response.status;
        switch (status) {
            case 401:
                return {message: 'Требуется авторизация!', status};
            case 403:
                return {message: 'Нет доступа!', status};
            case 404:
                return {message: 'Нет оборудования...', status};
            default:
                return {message: 'Не известная ошибка!', status};
        }
    }

}

export const buyEquipment = async (id: number): Promise<{ message: string } | IError> => {
    try {
        const response: AxiosResponse<{ message: string }> = await instance.get(`equipment/buy-equipment/${id}`);

        if (response.status === 200) {
            return { message: response.data.message };
        } else {
            return handleResponseError('Неизвестная ошибка', response.status) as IError;
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { status } = error.response;
            switch (status) {
                case 401:
                    return { message: 'Требуется авторизация!', status } as IError;
                case 403:
                    return { message: 'Нет доступа!', status } as IError;
                case 404:
                    return { message: 'Нет оборудования...', status } as IError;
                case 409:
                    return { message: 'Пользователь не в организации...', status } as IError;
                default:
                    return { message: 'Не известная ошибка!', status } as IError;
            }
        } else {
            // Handle other errors (e.g., network issues)
            console.error('Error making the request:', error);
            return { message: 'An error occurred while making the request.', status: 500 } as IError;
        }
    }
};


// post, delete, hide,
export const postEquipment = async (data: FormData) => {
    const response: AxiosResponse<string> = await instance.post('equipment/add-equipment', data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    if (response.status === 201) {
        return response.data;
    } else {
        const status = response.status;
        switch (status) {
            case 401:
                return {message: 'Требуется авторизация!', status};
            case 403:
                return {message: 'Нет доступа!', status};
            case 413:
                return {message: 'Максимум 10 мб фотографии...', status};
            default:
                return {message: 'Не известная ошибка!', status};
        }
    }

}

export const deleteEquipment = async (id: number) => {

    const response: AxiosResponse<string> = await instance.delete(`equipment/delete-equipment/${id}`);
    if (response.status === 200) {
        return response.data
    } else {
        const status = response.status;
        switch (status) {
            case 401:
                return {message: 'Требуется авторизация!', status};
            case 403:
                return {message: 'Нет доступа!', status};
            case 404:
                return {message: 'Не найдено обородувания...', status};
            default:
                return {message: 'Не известная ошибка!', status};
        }
    }

}

export const hideEquipment = async (id: number) => {

    const response: AxiosResponse<string> = await instance.get(`equipment/hide/${id}`);
    if (response.status == 200) {
        return response.data
    } else {
        const status = response.status;
        switch (status) {
            case 401:
                return {message: 'Требуется авторизация!', status};
            case 403:
                return {message: 'Нет доступа!', status};
            case 404:
                return {message: 'Не найдено обородувания...', status};
            default:
                return {message: 'Не известная ошибка!', status};
        }
    }

}