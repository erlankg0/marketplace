import {instance} from "@network/network.ts";

export const getAllEquipment = () => {
    return instance.get('equipment/get-all-equipments');
}

export const getEquipmentById = async (id: number) => {
    try {
        const response = await instance.get(`equipment/get-by-id/${id}`)
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const searchEquipment = async (query: string) => {
    try {
        const response = await instance.get(`equipment/search-equipment?query=${query}`);
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const buyEquipment = async (id: number) => {
    try {
        const response = await instance.get(`equipment/buy-equipment/${id}`);
        return response.data
    } catch (error) {
        console.error(error);
        throw error
    }
}
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
