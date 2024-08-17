import {instance} from "@network/network.ts";
import axios, {AxiosResponse} from "axios";
import {ICards} from "@network/interfaces/basic.ts";
import {IError} from "@network/interfaces/network/error.ts";

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

export const getEquipmentById = async (id: number | string) => {
    try {
        const response = await instance.get(`equipment/get-equipment-detailed/${id}`)
        return response.data
    } catch (error) {
        console.error(error);
        throw error
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

export const buyEquipment = async (id: number) => {
    try {
        const response: AxiosResponse<{ message: string }> = await instance.get(`equipment/buy-equipment/${id}`);

        // If the request is successful (status 2xx), return the response data
        return response.data;
    } catch (error) {
        // Axios wraps the error in a response object when the request fails
        if (axios.isAxiosError(error) && error.response) {
            const {status} = error.response;
            switch (status) {
                case 401:
                    return {message: 'Требуется авторизация!', status};
                case 403:
                    return {message: 'Нет доступа!', status};
                case 404:
                    return {message: 'Нет оборудования...', status};
                case 409:
                    return {message: 'Пользовать не в организации...', status};
                default:
                    return {message: 'Не известная ошибка!', status};
            }
        } else {
            // Handle errors that are not related to HTTP responses
            console.error('Error making the request:', error);
            return {message: 'An error occurred while making the request.', status: 500};
        }
    }
}


// post, delete, hide,
export const postEquipment = async (data: FormData) => {
    try {
        const response = await instance.post('equipment/add-equipment', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const deleteEquipment = async (id: number) => {
    try {
        return await instance.delete(`equipment/delete-equipment/${id}`)
    } catch (error) {
        throw `Error: ${error}`
    }
}

export const hideEquipment = async (id: number) => {
    try {
        return await instance.get(`equipment/hide/${id}`);
    } catch (error) {
        throw `Error: ${error}`;
    }
}