import {instance} from "@network/network.ts";
import axios, {AxiosResponse} from "axios";
import {ICards} from "@network/interfaces/basic.ts";
import {IError} from "@network/interfaces/network/error.ts";

export const getAllOrders = async (pageNo: number = 0, pageSize: number = 18): Promise<ICards | IError> => {
    const response: AxiosResponse<ICards> = await instance.get(`order/get-all-orders?pageNumber=${pageNo}&pageSize=${pageSize}`);
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

export const getByIdOrder = async (id: number | string, author?: boolean) => {
    try {
        if (author) {
            const response = await instance.get(`order/get-order-detailed-for-author/${id}`)
            return response.data
        }
        const response = await instance.get(`order/get-order-detailed/${id}`);
        return response.data
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export const getMyOrders = async (pageNumber: number = 0, pageSize: number = 18) => {
    try {
        const response = await instance.get(`order/my-orders?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteOrderById = async (id: number) => {
    try {
        const response = await instance.delete(`order/delete-order/${id}`)
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const hideOrder = async (id: number) => {
    try {
        return await instance.get(`order/hide/${id}`)
    } catch (error) {
        throw `Error: ${error}`
    }
}

export const postOrder = async (formData: FormData) => {
    const response = await instance.post('order/add-order', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}
export const requestToExecuteOrderById = async (id: number): Promise<{ message: string } | IError> => {
    try {
        const response: AxiosResponse<{
            message: string
        }> = await instance.post(`order/send-request-to-execute-order/${id}`);

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
};
export const getOrganizationOrders = async () => {
    try {
        return await instance.get('order/organization-orders')
    } catch (error) {
        throw `Error: ${error}`;
    }
}

export const postAssignOrganizationToOrder = async (id: number | string, organizationName: string) => {
    try {
        return await instance.post(`order/assign-organization-to-order/${id}?organizationName=${organizationName}`)
    } catch (error) {
        throw `Error: ${error}`
    }
}
