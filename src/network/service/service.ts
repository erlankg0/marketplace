import {instance} from "@network/network.ts";

export const postService = async (data: FormData) => {
    try {
        const response = await instance.post('service/add', data, {
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

export const getAllServices = async () => {
    try {
        const response = await instance.get('service');
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getServiceById = async (id: number) => {
    try {
        const response = await instance.get(`service/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const deleteService = async (id: number) => {
    try {
        const response = await instance.delete(`service/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error
    }
}