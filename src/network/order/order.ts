import {instance} from "@network/network.ts";

export const getAllOrders = async (pageNumber: number = 0, pageSize: number = 18) => {
    try {
        const response = await instance.get(`order/get-all-orders?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getByIdOrder = async (id: number) => {
    try {
        const response = await instance.get(`order/get-order-detailed/${id}`);
        return response.data
    } catch (error) {
        console.error(error)
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
export const postOrder = async (formData: FormData) => {
    const response = await instance.post('order/add-order', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}
export const requestToExecuteOrderById = async (id: number) => {
    try {
        const response = await instance.post(`order/send-request-to-execute-order/${id}`);
        return response.data;
    } catch (error) {
        throw `Error: ${error}`;
    }
}

export const getOrganizationOrders = async () => {
    try {
        return await instance.get('order/organization-orders')
    } catch (error) {
        throw `Error: ${error}`;
    }
}