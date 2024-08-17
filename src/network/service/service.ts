import {instance} from "@network/network.ts";
import {AxiosResponse} from "axios";
import {ICards} from "@network/interfaces/basic.ts";
import {IError} from "@network/interfaces/network/error.ts";

export const postService = async (data: FormData) => {
    try {
        const response = await instance.post('service/add-service', data, {
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

export const getAllServices = async (pageNo: number = 0, pageSize: number = 18): Promise<ICards | IError> => {
    const response: AxiosResponse<ICards> = await instance.get(`service/get-all-services?pageNumber=${pageNo}&pageSize=${pageSize}`);
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

export const getServiceById = async (id: number | string) => {
    try {
        const response = await instance.get(`service/get-service-detailed/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getMyServices = async (pageNo: number = 0, pageSize: number = 18) => {
    try {
        return await instance.get(`service/my-services?pageNumber=${pageNo}&pageSize=${pageSize}`)
    } catch (error) {
        throw `Error: ${error}`
    }
}

export const deleteService = async (id: number) => {
    try {
        const response = await instance.delete(`service/delete-service/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const hideService = async (id: number) => {
    try {
        return await instance.get(`service/hide/${id}`)
    } catch (error) {
        throw `Error: ${error}`;
    }
}