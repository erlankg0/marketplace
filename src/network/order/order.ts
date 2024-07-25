import {instance} from "@network/network.ts";

export const getAllOrders = async () => {
    try {
        const response = await instance.get('order/get-all-orders');
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getByIdOrder = async (id: number) => {
    try {
        const response = await instance.get(`order/get-by-id/${id}`);
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