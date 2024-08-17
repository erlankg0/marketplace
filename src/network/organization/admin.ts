import {instance} from "@network/network.ts";
import axios, {AxiosResponse} from "axios";
import {IError} from "@network/interfaces/network/error.ts";
import {IOrganizationData, IOrganizationOrders} from "@network/interfaces/organization/organization.tsx";

export const createOrganization = async (formData: FormData): Promise<number | IError> => {
    try {
        const response: AxiosResponse<string> = await instance.post('organization/create-organization', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.status === 201) {
            return response.status;
        } else {
            // Handle unexpected status codes if needed
            return {message: 'Unexpected status code', status: response.status};
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // AxiosError with a response from the server
                return {
                    message: error.response.data.message || error.message,
                    status: error.response.status
                };
            } else {
                // AxiosError with no response (e.g., network error)
                return {
                    message: 'No response received from the server',
                    status: 0
                };
            }
        } else {
            // Non-Axios error (could be a different type of error)
            return {
                message: 'Unexpected error occurred',
                status: 0
            };
        }
    }
};

export const getOrganization = async (): Promise<IOrganizationData | IError> => {
    try {
        const response: AxiosResponse<IOrganizationData> = await instance.get('organization/get-organization-detailed');
        if (response.status == 200) {
            return response.data
        } else {
            const status = response.status;
            switch (status) {
                case 404:
                    return {message: 'Нету организации', status: response.status};
                case 401:
                    return {message: 'Необходимо авториация', status: response.status};
                case 403:
                    return {message: 'Нет прав доступа', status: response.status};
                default:
                    return {message: 'Не известная ошибка!', status: response.status};
            }
        }
    } catch (error) {
        throw `Error: ${error}`
    }
}

export const sendInvitation = async (formData: FormData) => {
    try {
        return await instance.post('organization/send-invitation', formData);
    } catch (error) {
        throw `Error: ${error}`;
    }
}

export const getOrganizationOrdersByStage = async (stage: 'completed' | 'current', pageNo: number = 0, pageSize: number = 4): Promise<IOrganizationOrders | IError> => {
    const response = await instance.get(`order/get-organization-orders-by-stage?pageNumber=${pageNo}&pageSize=${pageSize}&stage=${stage}`);
    if (response.status == 200) {
        return response.data
    } else {
        const status = response.status;
        switch (status) {
            case 404:
                return {message: 'Нету заказов', status: response.status};
            case 401:
                return {message: 'Необходимо авториация', status: response.status};
            case 403:
                return {message: 'Нет прав доступа', status: response.status};
            default:
                return {message: 'Не известная ошибка!', status: response.status};
        }
    }
}

export const getCompleteOrder = async (id: number | string) => {
    try {
        return await instance.get(`order/complete/${id}`)
    } catch (error) {
        throw `Error: ${error}`
    }
}